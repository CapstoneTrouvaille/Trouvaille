import {
  arrayUnion,
  doc,
  getDoc,
  query,
  updateDoc,
  where,
  onSnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import { useAuthState } from "react-firebase-hooks/auth";

//ACTION TYPES
const GET_MEMORIES = "GET_MEMORIES";
const ADD_MEMORIES_REQUEST = "ADD_MEMORIES_REQUEST";
const ADD_MEMORIES_SUCCESS = "ADD_MEMORIES_SUCCESS";
const ADD_MEMORIES_FAIL = "ADD_MEMORIES_FAIL";

//ACTION CREATOR
export const _getMemories = (memories) => ({
  type: GET_MEMORIES,
  memories,
});

export const _addMemoriesRequest = () => ({
  type: ADD_MEMORIES_REQUEST,
  loadingAdd: true,
});

export const _addMemoriesSuccess = (newMemories) => ({
  type: ADD_MEMORIES_SUCCESS,
  loadingAdd: false,
  newMemories,
});

export const _addMemoriesFail = (error) => ({
  type: ADD_MEMORIES_FAIL,
  errorAdd: error,
});

//THUNKS

export const fetchMemories = () => {
  return async (dispatch) => {
    try {
      console.log(`UUID from fetchTrips:`, auth.currentUser.uid);
      const userTrips = await db
        .collection("trips")
        .where("users", "array-contains", auth.currentUser.uid)
        .get();
      console.log(
        `FetchMemories: This is the users trip memories:`,
        userTrips.docs
      );
      // if (!userTrips.length) {
      //   console.log("You have no trips!");
      // } else {
      //   console.log(`2 FetchTrips: This is the users trips:`, userTrips)
      // }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addMemories = (newMemories) => {
  return async (dispatch) => {
    try {
      // Add data to the store
      dispatch(_addMemoriesRequest());
      const addedTrip = await db.collection("trips").add(newMemories);
      alert("Your trip was successfully created");

      const q = query(
        collection(db, "user"),
        where("UID", "==", auth.currentUser.uid)
      );
      const userRecord = await getDocs(q);
      // console.log(`this is userRecord.docs[0].id:`, userRecord.docs[0].id);
      const userReference = doc(db, "user", userRecord.docs[0].id);

      await updateDoc(userReference, {
        trip: arrayUnion(addedTrip.id),
      });
      dispatch(_addMemoriesSuccess(addedTrip));
    } catch (error) {
      dispatch(_addMemoriesFail(error));
      console.error("Error adding trip: ", error);
    }
  };
};

//REDUCER
export default function memories(state = {}, action) {
  switch (action.type) {
    case GET_MEMORIES:
      return { ...state, trips: action.memories };
    case ADD_MEMORIES_REQUEST:
      return { ...state, loadingAdd: true };
    case ADD_MEMORIES_SUCCESS:
      return { ...state, loadingAdd: false, trips: action.newMemories };
    case ADD_MEMORIES_FAIL:
      return { ...state, loadingAdd: false, errorAdd: action.errorAdd };
    default:
      return state;
  }
}
