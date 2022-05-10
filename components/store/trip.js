import { doc, getDoc, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";

//ACTION TYPES
const GET_TRIPS = "GET_TRIPS";
const ADD_TRIP = "ADD_TRIP";

//ACTION CREATOR
export const _getTrips = () => ({
  type: GET_TRIPS,
  trips,
});

export const _addTrip = (newTrip) => ({
  type: ADD_TRIP,
  trip,
});

//THUNK
export const fetchTrips = () => {
  return async (dispatch) => {
    try {
      console.log(auth.currentUser.uid);
      const userTrips = trips
        .where("users", "array-contains", auth.currentUser.uid)
        .get();
      if (!snapshot.exists) {
        console.log("You have no trips!");
      } else {
        console.log(auth.currentUser.uid);
        console.log(`You did it! You found the trips!:`, snapshot.docs);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const fetchTrips = () => {
//   return async (dispatch) => {
//     try {
//       const snapshot = await db
//         .collection("trips")
//         .where("users", "array-contains", auth.currentUser.uid)
//         .orderBy("tripName")
//         .get();
//       if (!snapshot.exists) {
//         console.log("You have no trips!");
//       } else {
//         console.log(`You did it! You found the trips!:`, snapshot.docs);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const addTrip = (newTripInfo) => {
  const inviteFriends = false;
  return async (dispatch) => {
    try {
      // Add data to the store
      db.collection("trips")
        .add(newTripInfo)
        .then((docRef) => {
          alert("Your trip was successfully created. Invite your friends!");
          console.log(`this is docRef:`, docRef.id);
        });
    } catch (error) {
      console.error("Error adding trip: ", error);
    }
  };
};

//REDUCER
export default function trip(state = {}, action) {
  switch (action.type) {
    case GET_TRIPS:
      return action.user;
    case ADD_TRIP:
      return action.user;
    default:
      return state;
  }
}
