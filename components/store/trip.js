import {
  arrayUnion,
  arrayRemove,
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
const ADD_USER_TO_TRIP_REQUEST = "ADD_USER_TO_TRIP_REQUEST";
const ADD_USER_TO_TRIP_SUCCESS = "ADD_USER_TO_TRIP_SUCCESS";
const ADD_USER_TO_TRIP_FAIL = "ADD_USER_TO_TRIP_FAIL";
const DECLINE_TRIP_REQUEST = "DECLINE_TRIP_REQUEST";
const DECLINE_TRIP_SUCCESS = "DECLINE_TRIP_SUCCESS";
const DECLINE_TRIP_FAIL = "DECLINE_TRIP_FAIL";
const GET_TRIPMEMBER = "GET_TRIPMEMBER";
const GET_PENDING_TRIP_MEMBERS = "GET_PENDING_TRIP_MEMBERS";
const GET_CURRENT_TRIP_MEMBERS = "GET_CURRENT_TRIP_MEMBERS";
const GET_DECLINED_TRIP_MEMBERS = "GET_DECLINED_TRIP_MEMBERS";

//ACTION CREATOR
// export const _getTrips = (trips) => ({
//   type: GET_TRIPS,
//   trips,
// });

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

export const _addUserToTripSuccess = () => ({
  type: ADD_USER_TO_TRIP_SUCCESS,
});

export const _addUserToTripFail = (error) => ({
  type: ADD_USER_TO_TRIP_FAIL,
  errorAddUser: error,
});

export const _declineTripRequest = () => ({
  type: DECLINE_TRIP_REQUEST,
});

export const _declineTripSuccess = () => ({
  type: DECLINE_TRIP_SUCCESS,
});

export const _declineTripFail = (error) => ({
  type: DECLINE_TRIP_FAIL,
  errorDecline: error,
});

export const getTripMember = (tripMembers) => ({
  type: GET_TRIPMEMBER,
  tripMembers,
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

//THUNK
export const fetchSingleTrip = (tripId) => {
  return async (dispatch) => {
    try {
      const tripRef = db.collection("trips").doc(tripId);

      const doc = await tripRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        const data = doc.data();
        dispatch(getSingleTrip(data));
      }
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

      const q = query(
        collection(db, "user"),
        where("UID", "==", auth.currentUser.uid)
      );
      const userRecord = await getDocs(q);
      const userReference = doc(db, "user", userRecord.docs[0].id);

      await updateDoc(userReference, {
        trip: arrayUnion(addedTrip.id),
      });
      dispatch(_addTripSuccess(addedTrip.id, auth.currentUser.uid));
      alert("Your trip was successfully created");
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
      const tripReference = await doc(db, "trips", tripId);

      const allUserRef = db.collection("user");
      const userRec = await allUserRef.where("UID", "==", userUID).get();
      const userRef = userRec.docs[0].data();
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

      dispatch(_addUserToTripSuccess());
    } catch (error) {
      dispatch(_addUserToTripFail(error));
      console.error("Error adding user to trip: ", error);
    }
  };
};
export const declineInviteToTrip = (tripId, userUID) => {
  return async (dispatch) => {
    try {
      dispatch(_declineTripRequest());
      const tripReference = await doc(db, "trips", tripId);
      const allUserRef = db.collection("user");
      const userRec = await allUserRef.where("UID", "==", userUID).get();
      const userRef = userRec.docs[0].data();
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
      dispatch(_declineTripFail(error));
      console.error("Error adding user to trip: ", error);
    }
  };
};

export const fetchTripMember = (tripMemberArr) => {
  return async (dispatch) => {
    try {
      const member = [];
      for (let i = 0; i < tripMemberArr.length; i++) {
        const UID = tripMemberArr[i];
        const allUserRef = db.collection("user");
        const userRec = await allUserRef.where("UID", "==", UID).get();
        const data = userRec.docs[0].data();
        const memberName = data.name;

        member.push(memberName);
      }

      dispatch(getTripMember(member));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTripMembers = (current, pending, declined) => {
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

//REDUCER
export default function trip(state = {}, action) {
  switch (action.type) {
    // case GET_TRIPS:
    //   return { ...state, trips: action.trips };
    case ADD_TRIP_REQUEST:
      return { ...state, loadingAdd: true };
    case ADD_TRIP_SUCCESS:
      return { ...state, loadingAdd: false, successAdd: true };
    case ADD_TRIP_FAIL:
      return { ...state, loadingAdd: false, errorAdd: action.errorAdd };
    case SINGLE_TRIP:
      return action.trip;
    case ADD_USER_TO_TRIP_REQUEST:
      return { ...state, loadingAddUser: true };
    case ADD_USER_TO_TRIP_SUCCESS:
      return { ...state, loadingAddUser: false, successAddUser: true };
    case ADD_USER_TO_TRIP_FAIL:
      return {
        ...state,
        loadingAddUser: false,
        errorAddUser: action.errorAddUser,
      };
    case DECLINE_TRIP_REQUEST:
      return { ...state, loadingDecline: true };
    case DECLINE_TRIP_SUCCESS:
      return { ...state, loadingDecline: false, successDecline: true };
    case DECLINE_TRIP_FAIL:
      return {
        ...state,
        loadingDecline: false,
        errorDecline: action.errorDeclineAdd,
      };
    case GET_TRIPMEMBER:
      return { ...state, tripMembers: action.tripMembers };
    case GET_PENDING_TRIP_MEMBERS:
      return { ...state, pUsers: action.pUsers };
    case GET_CURRENT_TRIP_MEMBERS:
      return { ...state, cUsers: action.cUsers };
    case GET_DECLINED_TRIP_MEMBERS:
      return { ...state, dUsers: action.dUsers };

    default:
      return state;
  }
}
