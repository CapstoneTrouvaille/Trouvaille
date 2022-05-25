import { async } from "@firebase/util";
import { doc, getDoc, updateDoc, FieldValue } from "firebase/firestore";
import { db, firebase } from "../../firebase";

//ACTION TYPES
const GET_ITINERARY = "GET_ITINERARY";
const ADD_ITINERARY_DAY = "ADD_ITINERARY_DAY";
const DELETE_ITINERARY = "DELETE_ITINERARY";

//ACTION CREATOR
export const _getItinerary = (itinerary) => ({
  type: GET_ITINERARY,
  itinerary,
});

export const _addItineraryDay = (newDay) => ({
  type: ADD_ITINERARY_DAY,
  newDay,
});

export const _deleteItinerary = (newDay) => ({
  type: DELETE_ITINERARY,
  newDay,
});

//THUNK
export const getItinerary = (tripId) => {
  return async (dispatch) => {
    try {
      const tripDocRef = doc(db, "trips", tripId);
      const tripInfo = await getDoc(tripDocRef);
      const tripItinerary = tripInfo.data().Itinerary;
      dispatch(_getItinerary(tripItinerary));
    } catch (error) {
      console.log("Unable to get itinerary:", error);
    }
  };
};

export const addItineraryDay = (tripId, day, plans) => {
  return async (dispatch) => {
    try {
      const tripDocRef = doc(db, "trips", tripId);
      const tripInfo = await getDoc(tripDocRef);
      const tripItinerary = tripInfo.data().Itinerary;
      let index = tripItinerary.findIndex((e) => {
        return e[day];
      });
      const updatedItinerary = tripItinerary;
      updatedItinerary[index][day].push(plans);
      await updateDoc(tripDocRef, {
        Itinerary: updatedItinerary,
      });
      dispatch(_getItinerary(updatedItinerary));
    } catch (error) {
      console.log("Unable to add itinerary day", error);
    }
  };
};

export const addFromExplore = (tripId, dayName, explorePlans) => {
  return async (dispatch) => {
    try {
      const tripDocRef = doc(db, "trips", tripId);
      const tripInfo = await getDoc(tripDocRef);
      const tripItinerary = tripInfo.data().Itinerary;
      let index = tripItinerary.findIndex((e) => {
        return e[dayName];
      });
      const updatedItinerary = tripItinerary;
      updatedItinerary[index]["placesFromExplore"] = explorePlans;
      await updateDoc(tripDocRef, {
        Itinerary: updatedItinerary,
      });
      dispatch(_getItinerary(tripItinerary));
    } catch (error) {
      console.log("unable to add from selected explore list", error);
    }
  };
};

export const deleteItineraryItem = (tripId, day, plan) => {
  return async (dispatch) => {
    try {
      const tripDocRef = doc(db, "trips", tripId);
      const tripInfo = await getDoc(tripDocRef);
      const tripItinerary = tripInfo.data().Itinerary;
      let index = tripItinerary.findIndex((e) => {
        return e[day];
      });
      const updatedItinerary = tripItinerary[index][day];
      console.log("updatedItinerary", updatedItinerary);
      const removeRes = await tripDocRef.update({
        updatedItinerary: firebase.firestore.FieldValue.arrayRemove(plan),
      });
      dispatch(_deleteItinerary(removeRes));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
const itinerary = (state = [], action) => {
  switch (action.type) {
    case GET_ITINERARY:
      return action.itinerary;
    case ADD_ITINERARY_DAY:
      return [...state, action.newDay];
    case DELETE_ITINERARY:
      return [...state, action.newDay];

    default:
      return state;
  }
};

export default itinerary;
