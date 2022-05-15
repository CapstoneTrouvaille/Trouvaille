import { db, auth } from "../../firebase";

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
      // console.log(`Line 24 - Fetch user userID:`, userId);
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
      const q = query(collection(db, "user"), where("email", "==", userEmail));
      const userRecord = await getDocs(q);
      const userReference = doc(db, "user", userRecord.docs[0].id);
      if (userReference.empty) {
        console.log(
          "There are no registered users with that email address! Tell user to register."
        );
      } else {
        await updateDoc(userReference, {
          pendingTrips: arrayUnion(tripId),
        });
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
