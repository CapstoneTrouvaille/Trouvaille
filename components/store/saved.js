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

const SAVE_ITEM = "SAVE_ITEM"

export const _saveItem = (item) => ({
  type: SAVE_ITEM,
  item
})

export const saveItem = (item, status) => {
  return async(dispatch) => {
    try {
      console.log("status in thunk", status)
      //get all user doc ref
      const allUserRef = db.collection("user")
      //get specific user doc that has corresponding uid in field
      const userDoc = await allUserRef.where("UID", "==", auth.currentUser.uid).get()
      //get user ref for that user doc
      const userRef = db.collection("user").doc(userDoc.docs[0].id)
      //add or remove the saved items on that user doc
      status ?
      await updateDoc(userRef, {
        savedItems: arrayUnion(item)
      })

      :
      await updateDoc(userRef, {
        savedItems: arrayRemove(item)
      })
      // const fieldData = userDoc.docs[0].data()
      // const userRef = await db.collection("user").where("UID", "==", auth.currentUser.uid).get()
      console.log("Successfully removed an item!")
    } catch (error) {
      console.log(error)
    }
  }
}
