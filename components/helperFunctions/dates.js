import { firebase } from "../../firebase";

export function getNewDate(date) {
  const newDate = firebase.firestore.Timestamp.fromDate(
    new Date(`${date.slice(6)}/${date.slice(0, 2)}/${date.slice(3, 5)}`)
  );
  return newDate;
}

export function convertFiretimeToString(date) {
  const fireBaseTime = new Date(
    date.seconds * 1000 + date.nanoseconds / 1000000
  );
  return fireBaseTime.toDateString();
}
