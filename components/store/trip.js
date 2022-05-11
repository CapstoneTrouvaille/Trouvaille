import {
  arrayUnion,
  doc,
  getDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";

//ACTION TYPES
const GET_TRIPS = "GET_TRIPS";
const ADD_TRIP_REQUEST = "ADD_TRIP_REQUEST";
const ADD_TRIP_SUCCESS = "ADD_TRIP_SUCCESS";
const ADD_TRIP_FAIL = "ADD_TRIP_FAIL";

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

//THUNK
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
      alert("Your trip was successfully created. Invite your friends!");
      console.log(`this is the new tripId:`, addedTrip.id);

      const userObj = await db
        .collection("user")
        .where("UID", "==", auth.currentUser.uid || "")
        .get();
      await updateDoc(userObj, {
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
    default:
      return state;
  }
}
