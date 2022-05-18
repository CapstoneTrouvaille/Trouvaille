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

//ACTION TYPES
const GET_USER = "GET_USER";
const SIGNUP = "SIGNUP";
const SEARCH_TO_INVITE = "SEARCH_TO_INVITE";
const SEARCH_TO_INVITE_FAIL = "SEARCH_TO_INVITE_FAIL";

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

export const searchToInviteFail = (error) => ({
  type: SEARCH_TO_INVITE_FAIL,
  errorAdd: error,
});

//THUNK
export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const userRef = db.collection("user");
      const doc = await userRef.where("UID", "==", userId).get();
      //console.log(`Line 30 - Fetch user userID:`, userId);
      // console.log("doc.empty", doc.docs[0].data());
      if (doc.empty) {
        console.log("Could not fetch user!");
      } else {
        doc.forEach((item) => {
          if (item.data().trip.length >= 0) {
            // console.log("user thunks", item.data());
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
      const userDoc = await allUserRef.where("email", "==", userEmail).get();

      const userReference = userDoc.docs[0].data();

      console.log(`!!!userDoc: `, userReference.UID);

      if (userReference.empty) {
        dispatch(searchToInviteFail(error));
      } else {
        await updateDoc(tripReference, {
          pendingUsers: arrayUnion(userReference.UID),
        });
        await updateDoc(userReference, {
          pendingTrips: arrayUnion(tripId),
        });
        console.log(`User added to trip array!`);
      }
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
    case SEARCH_TO_INVITE_FAIL:
      return { ...state, errorAdd: action.errorAdd };
    default:
      return state;
  }
}
