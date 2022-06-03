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
import { db, auth } from "../../firebase";
import { fetchUser } from "./user";

//ACTION TYPES
const ADD_USER_TO_TRIP_SUCCESS = "ADD_USER_TO_TRIP_SUCCESS";
const DECLINE_TRIP_SUCCESS = "DECLINE_TRIP_SUCCESS";
const GET_PENDING_TRIP_MEMBERS = "GET_PENDING_TRIP_MEMBERS";
const GET_CURRENT_TRIP_MEMBERS = "GET_CURRENT_TRIP_MEMBERS";
const GET_DECLINED_TRIP_MEMBERS = "GET_DECLINED_TRIP_MEMBERS";
const GET_PENDING_TRIPS = "GET_PENDING_TRIPS";

//ACTION CREATOR
export const _addUserToTripSuccess = () => ({
  type: ADD_USER_TO_TRIP_SUCCESS,
});

export const _declineTripSuccess = () => ({
  type: DECLINE_TRIP_SUCCESS,
});
export const getCurrentTripMembers = (cUsers) => ({
  type: GET_CURRENT_TRIP_MEMBERS,
  cUsers,
});
export const getPendingTripMembers = (pUsers) => ({
  type: GET_PENDING_TRIP_MEMBERS,
  pUsers,
});
export const getDeclinedTripMembers = (dUsers) => ({
  type: GET_DECLINED_TRIP_MEMBERS,
  dUsers,
});
export const getPendingTrips = (pendingTrips) => ({
  type: GET_PENDING_TRIPS,
  pendingTrips,
});

//THUNK
export const addUserToTrip = (tripId, userUID) => {
  return async (dispatch) => {
    try {
      const tripReference = await doc(db, "trips", tripId);
      const allUserRef = db.collection("user");
      const userRec = await allUserRef.where("UID", "==", userUID).get();
      const userReference = doc(db, "user", userRec.docs[0].id);

      await updateDoc(tripReference, {
        users: arrayUnion(userUID),
      });
      await updateDoc(tripReference, {
        pendingUsers: arrayRemove(userUID),
      });
      await updateDoc(userReference, {
        trip: arrayUnion(tripId),
      });
      await updateDoc(userReference, {
        pendingTrips: arrayRemove(tripId),
      });

      dispatch(fetchUser(userUID));
    } catch (error) {
      console.error("Error adding user to trip: ", error);
    }
  };
};

export const declineInviteToTrip = (tripId, userUID) => {
  return async (dispatch) => {
    try {
      const tripReference = await doc(db, "trips", tripId);
      const allUserRef = db.collection("user");
      const userRec = await allUserRef.where("UID", "==", userUID).get();
      const userReference = doc(db, "user", userRec.docs[0].id);
      await updateDoc(tripReference, {
        pendingUsers: arrayRemove(userUID),
      });
      await updateDoc(tripReference, {
        declinedUsers: arrayUnion(userUID),
      });
      await updateDoc(userReference, {
        pendingTrips: arrayRemove(tripId),
      });
      await updateDoc(userReference, {
        declinedTrips: arrayUnion(tripId),
      });
      dispatch(_declineTripSuccess());
    } catch (error) {
      console.error("Error adding user to trip: ", error);
    }
  };
};

export const fetchInvitations = (current, pending, declined) => {
  return async (dispatch) => {
    try {
      const currentUsernames = [];
      const pendingUsernames = [];
      const declinedUsernames = [];

      for (let i = 0; i < current.length; i++) {
        const userId = current[i];
        const allUserRef = db.collection("user");
        const userRec = await allUserRef.where("UID", "==", userId).get();
        const data = userRec.docs[0].data();
        const memberName = data.name;
        currentUsernames.push(memberName);
      }

      for (let i = 0; i < pending.length; i++) {
        const userId = pending[i];
        const allUserRef = db.collection("user");
        const userRec = await allUserRef.where("UID", "==", userId).get();
        const data = userRec.docs[0].data();
        const memberName = data.name;
        pendingUsernames.push(memberName);
      }
      for (let i = 0; i < declined.length; i++) {
        const userId = declined[i];
        const allUserRef = db.collection("user");
        const userRec = await allUserRef.where("UID", "==", userId).get();
        const data = userRec.docs[0].data();
        const memberName = data.name;
        declinedUsernames.push(memberName);
      }
      dispatch(getCurrentTripMembers(currentUsernames));
      dispatch(getPendingTripMembers(pendingUsernames));
      dispatch(getDeclinedTripMembers(declinedUsernames));
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
        pendingTripArr.push(data.tripName);
      }

      dispatch(getPendingTrips(pendingTripArr));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
export default function invitations(state = {}, action) {
  switch (action.type) {
    case ADD_USER_TO_TRIP_SUCCESS:
      return { ...state, loadingAddUser: false, successAddUser: true };
    case DECLINE_TRIP_SUCCESS:
      return { ...state, loadingDecline: false, successDecline: true };
    case GET_CURRENT_TRIP_MEMBERS:
      return { ...state, cUsers: action.cUsers };
    case GET_PENDING_TRIP_MEMBERS:
      return { ...state, pUsers: action.pUsers };
    case GET_DECLINED_TRIP_MEMBERS:
      return { ...state, dUsers: action.dUsers };
    case GET_PENDING_TRIPS:
      return { ...state, pendingTrips: action.pendingTrips };
    default:
      return state;
  }
}
