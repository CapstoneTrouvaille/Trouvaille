import {
  arrayUnion,
  arrayRemove,
  doc,
  query,
  updateDoc,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../firebase";

//ACTION TYPES
const SINGLE_TRIP = "SINGLE_TRIP";
const GET_TRIPMEMBERS = "GET_TRIPMEMBERS";

//ACTION CREATOR
export const getSingleTrip = (trip) => ({
  type: SINGLE_TRIP,
  trip,
});
export const getTripMembers = (tripMembers) => ({
  type: GET_TRIPMEMBERS,
  tripMembers,
});

//THUNK
export const fetchSingleTrip = (tripId) => {
  return async (dispatch) => {
    try {
      const tripRef = db.collection("trips").doc(tripId);

      const doc = await tripRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        const data = doc.data();
        dispatch(getSingleTrip(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTripMembers = (tripMemberArr) => {
  return async (dispatch) => {
    try {
      const member = [];
      for (let i = 0; i < tripMemberArr.length; i++) {
        const UID = tripMemberArr[i];
        const allUserRef = db.collection("user");
        const userRec = await allUserRef.where("UID", "==", UID).get();
        const data = userRec.docs[0].data();
        const memberName = data.name;

        member.push(memberName);
      }
      dispatch(getTripMembers(member));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
export default function trip(state = {}, action) {
  switch (action.type) {
    case SINGLE_TRIP:
      return action.trip;
    case GET_TRIPMEMBERS:
      return { ...state, tripMembers: action.tripMembers };
    default:
      return state;
  }
}
