import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

//ACTION TYPES
const GET_USER = "GET_USER";
const SIGNUP = "SIGNUP";

//ACTION CREATOR
export const getUser = (user) => ({
  type: GET_USER,
  user,
});

export const signup = (user) => ({
  type: SIGNUP,
  user,
});

//THUNK
export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const userRef = db.collection("user").doc("HverH3BQtzK50kfLORNK");
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        const data = doc.data();
        dispatch(getUser(data));
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
      db.collection("users").doc(res.user.uid).set(user);
      dispatch(signup(res.user));
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
    default:
      return state;
  }
}
