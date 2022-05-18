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
import { fetchSingleTrip } from "./trip"; //may not work

//ACTION TYPES
const GET_TRIPS = "GET_TRIPS";

//ACTION CREATORS
export const getTrips = (trips) => ({
  type: GET_TRIPS,
  trips,
});

//THUNKS
// export const fetchUserTrips = (userId) => {
//   return async (dispatch) => {
//     try {
//       const userTrips = await db
//         .collection("trips")
//         .where("users", "array-contains", userId)
//         .get();
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const fetchUserTrips = (userTripsArr) => {
  return async (dispatch) => {
    try {
      console.log("userTripsArr", userTripsArr);
      //   const data = userTripsArr.map(async (tripId) => {
      //     await db.collection("trips").doc(tripId).get().data();
      //   });
      //   console.log("this is what we get from fetchUserTrips", data);
      //   dispatch(getTrips(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
export default function trips(state = [], action) {
  switch (action.type) {
    case GET_TRIPS:
      return action.trips;
    default:
      return state;
  }
}
