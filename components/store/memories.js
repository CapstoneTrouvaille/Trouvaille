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
const ADD_MEMORIES = "ADD_MEMORIES";

//ACTION CREATOR
export const _getMemories = (memories) => ({
  type: GET_MEMORIES,
  memories,
});

export const _addMemories = (newMemories) => ({
  type: ADD_MEMORIES,
  newMemories,
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

export const addMemories = (newMemories, tripId) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, "trips", tripId);
      await updateDoc(docRef, {
        tripMemories: arrayUnion(newMemories),
      });
      dispatch(_addMemories(newMemories));
    } catch (error) {
      console.error("Error adding Memories: ", error);
    }
  };
};

//REDUCER
export default function memories(state = [], action) {
  switch (action.type) {
    case GET_MEMORIES:
      return [...state, action.memories];

    case ADD_MEMORIES:
      return [...state, action.newMemories];

    default:
      return state;
  }
}
