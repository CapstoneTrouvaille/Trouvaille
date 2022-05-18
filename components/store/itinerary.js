import { async } from "@firebase/util";
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
import { db, auth, firebase } from "../../firebase";

const GET_ITINERARY = "GET_ITINERARY";
const ADD_ITINERARY_DAY = "ADD_ITINERARY_DAY";

export const _getItinerary = (itinerary) => ({
  type: GET_ITINERARY,
  itinerary,
});

export const _addItineraryDay = (newDay) => ({
  type: ADD_ITINERARY_DAY,
  newDay,
});

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
      console.log("add day called")
      console.log("INTHUNK",tripId, day, plans);
      const tripDocRef = doc(db, "trips", tripId);
      const tripInfo = await getDoc(tripDocRef);
      const tripItinerary = tripInfo.data().Itinerary;
      let index = tripItinerary.findIndex((e) => {
        return e[day];
      });
      const updatedItinerary = tripItinerary;
      updatedItinerary[index][day].push(plans)
      await updateDoc(tripDocRef, {
        Itinerary: updatedItinerary,
      });
      dispatch(_getItinerary(updatedItinerary));
      console.log("Successfully added a day onto itinerary");
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

const itinerary = (state = [], action) => {
  switch (action.type) {
    case GET_ITINERARY:
      return action.itinerary;
    case ADD_ITINERARY_DAY:
      return [...state, action.newDay];
    default:
      return state;
  }
};

export default itinerary;
