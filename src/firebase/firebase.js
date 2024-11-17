import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAl_S9_9iWEncsof0sQGaM2hszaLhaC-NU",
  authDomain: "battery-management-dc.firebaseapp.com",
  projectId: "battery-management-dc",
  storageBucket: "battery-management-dc.firebasestorage.app",
  messagingSenderId: "629770033274",
  appId: "1:629770033274:web:7749571212edf5a35d83c3",
  measurementId: "G-72MYW59TKY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export{ app, auth};



