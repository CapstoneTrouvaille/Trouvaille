import {
  arrayUnion,
  doc,
  updateDoc,
  where,
  collection,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { fetchSingleTrip } from "./trip";

//ACTION TYPES
const GET_USER = "GET_USER";
const SIGNUP = "SIGNUP";
const SEARCH_TO_INVITE = "SEARCH_TO_INVITE";

//ACTION CREATOR
export const getUser = (user) => ({
  type: GET_USER,
  user,
});

export const signup = (user) => ({
  type: SIGNUP,
  user,
});

export const searchToInvite = (user) => ({
  type: SEARCH_TO_INVITE,
  user,
});

//THUNK
export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const userRef = db.collection("user");
      const doc = await userRef.where("UID", "==", userId).get();
      if (doc.empty) {
        console.log("Could not fetch user!");
      } else {
        doc.forEach((item) => {
          if (item.data().trip.length >= 0) {
            dispatch(getUser(item.data()));
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUserToInvite = (userEmail, tripId) => {
  return async (dispatch) => {
    try {
      const tripRecord = db.collection("trips").doc(tripId);
      const tripReference = doc(db, "trips", tripRecord.id);

      const allUserRef = db.collection("user");
      const userRec = await allUserRef.where("email", "==", userEmail).get();

      const userRef = userRec.docs[0].data();
      const userReference = doc(db, "user", userRec.docs[0].id);

      if (userRef.empty) {
        console.log("Email not found in the system");
      } else {
        await updateDoc(tripReference, {
          pendingUsers: arrayUnion(userRef.UID),
        });
        await updateDoc(userReference, {
          pendingTrips: arrayUnion(tripId),
        });
      }
      dispatch(fetchSingleTrip(tripId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signupUser = (name, email, password) => {
  return async (dispatch) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const userData = {
        UID: res.user.uid,
        name: name,
        email: email,
        trip: [],
        savedItems: [],
        pendingTrips: [],
        declinedTrips: [],
        photoURL: "",
      };
      await db.collection("user").add(userData);
      dispatch(signup(userData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(getUser({}));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
export default function user(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case SIGNUP:
      return action.user;
    case SEARCH_TO_INVITE:
      return action.user;
    default:
      return state;
  }
}
