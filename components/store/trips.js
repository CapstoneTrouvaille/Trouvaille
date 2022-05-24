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
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase";

//ACTION TYPES
const GET_TRIPS = "GET_TRIPS";
const GET_PENDING_TRIPS = "GET_PENDING_TRIPS";

//ACTION CREATORS
export const getTrips = (trips) => ({
  type: GET_TRIPS,
  trips,
});

export const getPendingTrips = (pendingTrips) => ({
  type: GET_PENDING_TRIPS,
  pendingTrips,
});

//THUNKS
export const fetchUserTrips = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const tripArr = [];
      console.log("state.user", state.user);
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

export const fetchUserPendingTrips = (userPendingTripsArr) => {
  return async (dispatch) => {
    try {
      const pendingTripArr = [];
      for (let i = 0; i < userPendingTripsArr.length; i++) {
        const pendingTripId = userPendingTripsArr[i];
        const answer = db.collection("trips").doc(pendingTripId);
        const doc = await answer.get();

        const data = doc.data();
        console.log(`Data from fethUserPending thunk:`, data);
        pendingTripArr.push(data.tripName);
      }

      dispatch(getPendingTrips(pendingTripArr));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
export default function trips(state = { trips: [], pendingTrips: [] }, action) {
  // console.log("redux", action);
  switch (action.type) {
    case GET_TRIPS:
      return { ...state, trips: action.trips };
    case GET_PENDING_TRIPS:
      return { ...state, pendingTrips: action.pendingTrips };
    default:
      return state;
  }
}
