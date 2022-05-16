
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
import { db, auth } from "../../firebase";


const GET_ITINERARY = "GET_ITINERARY"
const ADD_ITINERARY_DAY = "ADD_ITINERARY_DAY"

export const _getItinerary =(itinerary) => ({
  type: GET_ITINERARY,
  itinerary
})

export const _addItineraryDay = (newDay) => ({
  type:ADD_ITINERARY_DAY,
  newDay
})

export const getItinerary = (tripId) => {
  return async(dispatch) => {
    try {
      const tripDocRef = doc(db, "trips", tripId)
      const tripInfo = await getDoc(tripDocRef)
      const tripItinerary = tripInfo.data().Itinerary
      dispatch(_getItinerary(tripItinerary))
    } catch (error) {
      console.log("Unable to get itinerary:", error)
    }
  }
}

export const addItineraryDay = (tripId,day) => {
  return async(dispatch) => {
    try {
      let newDay = {[day]: []}
      const tripDocRef = doc(db, "trips", tripId)
      await updateDoc(tripDocRef, {
        Itinerary: arrayUnion(newDay)
      })
      dispatch(_addItineraryDay(newDay))
      console.log("Successfully added a day onto itinerary")
    } catch (error) {
      console.log("Unable to add itinerary day", error)
    }
  }
}

const itinerary = (state=[], action) => {
  switch(action.type) {
    case GET_ITINERARY:
      return action.itinerary
    case ADD_ITINERARY_DAY:
      return [...state, action.newDay]
    default:
      return state
  }
}

export default  itinerary
