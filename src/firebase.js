import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8gtI92zNujfWV-Gi3_5UOXW-xAuV1l90",
  authDomain: "bookeasy-4e196.firebaseapp.com",
  projectId: "bookeasy-4e196",
  storageBucket: "bookeasy-4e196.firebasestorage.app",
  messagingSenderId: "75366258106",
  appId: "1:75366258106:web:4457e88f2bd6333cbd3983",
  measurementId: "G-SMFXKV96RJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;