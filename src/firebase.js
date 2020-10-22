import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBrG4AlAttWJRy0W48F16Mrmyy5gFnvL6o",
  authDomain: "discord-clone-e68b5.firebaseapp.com",
  databaseURL: "https://discord-clone-e68b5.firebaseio.com",
  projectId: "discord-clone-e68b5",
  storageBucket: "discord-clone-e68b5.appspot.com",
  messagingSenderId: "767402109895",
  appId: "1:767402109895:web:9a34b8e1a82f982e2d07e2",
  measurementId: "G-B8MLPSKJF5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
