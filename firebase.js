// // Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCB_TW1oRHt6Rv_LzODz_c9GCPGFzViHPA",
//   authDomain: "trouvaille-auth.firebaseapp.com",
//   projectId: "trouvaille-auth",
//   storageBucket: "trouvaille-auth.appspot.com",
//   messagingSenderId: "483169550927",
//   appId: "1:483169550927:web:0e591f82ee170eae51e03a",
// };

// // Initialize Firebase
// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const auth = firebase.auth();

// export { auth };

// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCB_TW1oRHt6Rv_LzODz_c9GCPGFzViHPA",
  authDomain: "trouvaille-auth.firebaseapp.com",
  projectId: "trouvaille-auth",
  storageBucket: "trouvaille-auth.appspot.com",
  messagingSenderId: "483169550927",
  appId: "1:483169550927:web:0e591f82ee170eae51e03a",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth, firebase };
