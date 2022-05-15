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

//ACTION TYPES
const GET_TRIPS = "GET_TRIPS";
const ADD_TRIP_REQUEST = "ADD_TRIP_REQUEST";
const ADD_TRIP_SUCCESS = "ADD_TRIP_SUCCESS";
const ADD_TRIP_FAIL = "ADD_TRIP_FAIL";
const SINGLE_TRIP = "SINGLE_TRIP";
const INVITE_TRIP_MEMBER = "INVITE_TRIP_MEMBER"
const ADD_USER_TO_TRIP_REQUEST = "ADD_USER_TO_TRIP_REQUEST";
const ADD_USER_TO_TRIP_SUCCESS = "ADD_USER_TO_TRIP_SUCCESS";
const ADD_USER_TO_TRIP_FAIL = "ADD_USER_TO_TRIP_FAIL";

//ACTION CREATOR
export const _getTrips = (trips) => ({
  type: GET_TRIPS,
  trips,
});

export const _addTripRequest = () => ({
  type: ADD_TRIP_REQUEST,
});

export const _addTripSuccess = (newTrip) => ({
  type: ADD_TRIP_SUCCESS,
});

export const _addTripFail = (error) => ({
  type: ADD_TRIP_FAIL,
  errorAdd: error,
});

export const _set_active_trip = (tripId) => ({
  type: SET_ACTIVE_TRIP,
  tripId,
});
export const getSingleTrip = (trip) => ({
  type: SINGLE_TRIP,
  trip,
});

export const _addUserToTripRequest = () => ({
  type: ADD_USER_TO_TRIP_REQUEST,
});

export const _addUserToTripSuccess = (tripID, userUID) => ({
  type: ADD_USER_TO_TRIP_SUCCESS,
});

export const _addUserToTripFail = (error) => ({
  type: ADD_USER_TO_TRIP_FAIL,
  errorAdd: error,
});

//THUNK
export const fetchSingleTrip = (tripId) => {
  return async (dispatch) => {
    try {
      // console.log(`UUID from fetchTrips:`, auth.currentUser.uid);
      const tripRef = db.collection("trips").doc(tripId);

      const doc = await tripRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        const data = doc.data();
        // console.log("Document data:", data);
        dispatch(getSingleTrip(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTrips = () => {
  return async (dispatch) => {
    try {
      console.log(`UUID from fetchTrips:`, auth.currentUser.uid);
      const userTrips = await db
        .collection("trips")
        .where("users", "array-contains", auth.currentUser.uid)
        .get();
      //console.log(`FetchTrips: This is the users trips:`, userTrips.docs);
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

export const addTrip = (newTripInfo) => {
  return async (dispatch) => {
    try {
      // Add data to the store
      dispatch(_addTripRequest());
      const addedTrip = await db.collection("trips").add(newTripInfo);
      alert("Your trip was successfully created");

      const q = query(
        collection(db, "user"),
        where("UID", "==", auth.currentUser.uid)
      );
      const userRecord = await getDocs(q);
      const userReference = doc(db, "user", userRecord.docs[0].id);

      await updateDoc(userReference, {
        trip: arrayUnion(addedTrip.id),
      });
      dispatch(_addTripSuccess(tripID, userUID));
    } catch (error) {
      dispatch(_addTripFail(error));
      console.error("Error adding trip: ", error);
    }
  };
};

export const addUserToTrip = (tripId, userUID) => {
  return async (dispatch) => {
    try {
      dispatch(_addUserToTripRequest());
      const tripReference = doc(db, "trips", tripId);
      await updateDoc(tripReference, {
        users: arrayUnion(userUID),
      });
      dispatch(_addUserToTripSuccess(tripId, userUID));
      console.error("Successfully added user to trip!");
    } catch (error) {
      dispatch(_addUserToTripFail(error));
      console.error("Error adding user to trip: ", error);
    }
  };
};

//REDUCER
export default function trip(state = {}, action) {
  switch (action.type) {
    case GET_TRIPS:
      return { ...state, trips: action.trips };
    case ADD_TRIP_REQUEST:
      return { ...state, loadingAdd: true };
    case ADD_TRIP_SUCCESS:
      return { ...state, loadingAdd: false, successAdd: true };
    case ADD_TRIP_FAIL:
      return { ...state, loadingAdd: false, errorAdd: action.errorAdd };
    case SINGLE_TRIP:
      return action.trip;
    case ADD_USER_TO_TRIP_REQUEST:
      return { ...state, loadingAdd: true };
    case ADD_USER_TO_TRIP_SUCCESS:
      return { ...state, loadingAdd: false, successAdd: true };
    case ADD_USER_TO_TRIP_FAIL:
      return { ...state, loadingAdd: false, errorAdd: action.errorAdd };
    default:
      return state;
  }
}
