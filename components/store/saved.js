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

const GET_SAVED_ITEMS = "GET_SAVED_ITEMS";
const SAVE_ITEM = "SAVE_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

export const _getSavedItems = (items) => ({
  type: GET_SAVED_ITEMS,
  items,
});

export const _saveItem = (item) => ({
  type: SAVE_ITEM,
  item,
});

export const _removeItem = (item) => ({
  type: REMOVE_ITEM,
  item,
});

export const getSavedItems = () => {
  return async (dispatch) => {
    try {
      //get all user doc ref
      const allUserRef = db.collection("user");
      //get specific user doc that has corresponding uid in field
      const userDoc = await allUserRef
        .where("UID", "==", auth.currentUser.uid)
        .get();
      const fieldData = userDoc.docs[0].data();
      const savedItemsList = fieldData.savedItems;
      dispatch(_getSavedItems(savedItemsList));
    } catch (error) {
      console.log(error);
    }
  };
};
export const saveItem = (item, status) => {
  return async (dispatch) => {
    try {
      //get all user doc ref
      const allUserRef = db.collection("user");
      //get specific user doc that has corresponding uid in field
      const userDoc = await allUserRef
        .where("UID", "==", auth.currentUser.uid)
        .get();
      //get user ref for that user doc
      const userRef = db.collection("user").doc(userDoc.docs[0].id);
      //add or remove the saved items on that user doc
      status
        ? await updateDoc(userRef, {
            savedItems: arrayUnion(item),
          }).then(dispatch(_saveItem(item)))
        : await updateDoc(userRef, {
            savedItems: arrayRemove(item),
          }).then(dispatch(_removeItem(item)));
    } catch (error) {
      console.log("Unable to add/remove an item", error);
    }
  };
};

const savedItems = (state = [], action) => {
  switch (action.type) {
    case GET_SAVED_ITEMS:
      return action.items;
    case SAVE_ITEM:
      return [...state, action.item];
    case REMOVE_ITEM:
      return state.filter((item) => item !== action.item);
    default:
      return state;
  }
};

export default savedItems;
