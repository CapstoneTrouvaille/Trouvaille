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

export const fetchMemories = (tripId) => {
  return async (dispatch) => {
    try {
      console.log("TRIPID", tripId)
      const docRef = doc(db, "trips", tripId)
      const tripInfo = await getDoc(docRef)
      const tripMemories = tripInfo.data().tripMemories
      dispatch(_getMemories(tripMemories))
    } catch (error) {
      console.log(error);
    }
  };
};

export const addMemories = (newMemories, tripId) => {
  return async (dispatch) => {
    try {
      console.log(tripId)
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
      return action.memories;
    case ADD_MEMORIES:
      return [...state, action.newMemories];
    default:
      return state;
  }
}
