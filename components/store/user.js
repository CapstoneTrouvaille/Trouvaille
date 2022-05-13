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
export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const userRef = db.collection("user");
      const doc = await userRef.where("UID", "==", userId).get();
      console.log(`Line 24 - Fetch user userID:`, userId);
      if (doc.empty) {
        console.log("Cound not fetch user!");
      } else {
        doc.forEach((item) => {
          if (item.data().trip.length > 0) {
//            console.log(item.data());
            dispatch(getUser(item.data()));
          }
        });
      }
      // if (!doc.docs[0]) {
      //   console.log("Cound not fetch user!");
      // } else {
      //   const data = doc.docs[0].data();
      //   console.log(`Line 29 - Fetch user:`, data);
      //   dispatch(getUser(data));
      // }
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
