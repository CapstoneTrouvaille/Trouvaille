import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

//ACTION TYPES
const GET_USER = "GET_USER";

//ACTION CREATOR
export const getUser = (user) => ({
  type: GET_USER,
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

//REDUCER
export default function user(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
