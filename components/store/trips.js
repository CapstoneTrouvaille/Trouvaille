import { db, auth } from "../../firebase";
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

//ACTION TYPES
const GET_TRIPS = "GET_TRIPS";
const ADD_TRIP_SUCCESS = "ADD_TRIP_SUCCESS";

//ACTION CREATORS
export const getTrips = (trips) => ({
  type: GET_TRIPS,
  trips,
});

export const _addTripSuccess = (newTripInfo) => ({
  type: ADD_TRIP_SUCCESS,
  newTripInfo,
});

//THUNKS
export const fetchUserTrips = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const tripArr = [];
      const userTripsArr = state.user.trip;
      for (let i = 0; i < userTripsArr.length; i++) {
        const tripId = userTripsArr[i];
        const answer = db.collection("trips").doc(tripId);
        const doc = await answer.get();
        const data = doc.data();
        tripArr.push({ ...data, id: tripId });
      }

      dispatch(getTrips(tripArr));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addTrip = (newTripInfo) => {
  return async (dispatch) => {
    try {
      const addedTrip = await db.collection("trips").add(newTripInfo);
      const q = query(
        collection(db, "user"),
        where("UID", "==", auth.currentUser.uid)
      );
      const userRecord = await getDocs(q);
      const userReference = doc(db, "user", userRecord.docs[0].id);

      await updateDoc(userReference, {
        trip: arrayUnion(addedTrip.id),
      });
      dispatch(_addTripSuccess(newTripInfo));

      alert("Your trip was successfully created");
    } catch (error) {
      console.error("Error adding trip: ", error);
    }
  };
};

//REDUCER
export default function trips(state = [], action) {
  switch (action.type) {
    case GET_TRIPS:
      return action.trips;
    case ADD_TRIP_SUCCESS:
      return [...state, action.newTripInfo];
    default:
      return state;
  }
}
