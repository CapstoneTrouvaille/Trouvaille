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
const GET_TRIPS = "GET_TRIPS";
const ADD_TRIP_REQUEST = "ADD_TRIP_REQUEST";
const ADD_TRIP_SUCCESS = "ADD_TRIP_SUCCESS";
const ADD_TRIP_FAIL = "ADD_TRIP_FAIL";
const SINGLE_TRIP = "SINGLE_TRIP";


//ACTION CREATOR
export const _getTrips = (trips) => ({
  type: GET_TRIPS,
  trips,
});

export const _addTripRequest = () => ({
  type: ADD_TRIP_REQUEST,
  loadingAdd: true,
});

export const _addTripSuccess = (newTrip) => ({
  type: ADD_TRIP_SUCCESS,
  loadingAdd: false,
  newTrip,
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

//THUNK
export const fetchSingleTrip = (tripId) => {
  return async (dispatch) => {
    try {
      console.log(`UUID from fetchTrips:`, auth.currentUser.uid);
      const tripRef = db.collection("trips").doc(tripId);
      const doc = await tripRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        const data = doc.data();
        console.log("Document data:", data);
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
      console.log(`FetchTrips: This is the users trips:`, userTrips.docs);
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
      // console.log(`this is userRecord.docs[0].id:`, userRecord.docs[0].id);
      const userReference = doc(db, "user", userRecord.docs[0].id);

      await updateDoc(userReference, {
        trip: arrayUnion(addedTrip.id),
      });
      dispatch(_addTripSuccess(addedTrip));
    } catch (error) {
      dispatch(_addTripFail(error));
      console.error("Error adding trip: ", error);
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
      return { ...state, loadingAdd: false, trips: action.newTrip };
    case ADD_TRIP_FAIL:
      return { ...state, loadingAdd: false, errorAdd: action.errorAdd };
    case SINGLE_TRIP:
      return action.trip;
    default:
      return state;
  }
}
