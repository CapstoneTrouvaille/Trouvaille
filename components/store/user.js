import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

//ACTION TYPES
const GET_USER = "GET_USER";
const SIGNUP = "SIGNUP";
const SIGNUP_GOOGLE = "SIGNUP_GOOGLE";

//ACTION CREATOR
export const getUser = (user) => ({
  type: GET_USER,
  user,
});

export const signup = (user) => ({
  type: SIGNUP,
  user,
});

export const signupGoogle = (user) => ({
  type: SIGNUP_GOOGLE,
  user,
});

//THUNK
export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const userRef = db.collection("user");
      const doc = await userRef.where("UID", "==", userId || "").get();
      if (!doc.docs[0]) {
        console.log("No such document!");
      } else {
        const data = doc.docs[0].data();
        dispatch(getUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//This is for base login for firestore
export const signupUser = (name, email, password) => {
  return async (dispatch) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      let user;
      if (res.user.uid) {
        user = {
          id: res.user.id,
          name: name,
          email: email,
          password: password,
          trip: [],
        };
      }
      //does this collection have to be named as singular or plural?
      db.collection("user").add(user);
      dispatch(signup(user));
    } catch (error) {
      console.log(error);
    }
  };
};

//This is for firestore for google users
export const signupGoogleUser = (userData) => {
  return async (dispatch) => {
    try {
      await db.collection("user").add(userData);
      console.log("new google user added to firestore", userData);
      dispatch(signupGoogle(userData));
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
    case SIGNUP_GOOGLE:
      return action.user;
    default:
      return state;
  }
}
