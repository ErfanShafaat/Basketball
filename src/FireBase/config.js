// firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQlRVT7xQHR-2yR62SOW_Od5R-W-C9Z-A",
  authDomain: "basketball-c8810.firebaseapp.com",
  projectId: "basketball-c8810",
  storageBucket: "basketball-c8810.appspot.com",
  messagingSenderId: "997096099120",
  appId: "1:997096099120:web:13a7fb8f94cc2ad6140cf5",
  measurementId: "G-WSS6VH1H37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics };
