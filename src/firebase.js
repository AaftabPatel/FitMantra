// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEKLcnA5n0x8nrApv8trFE8iGycnX6zwU",
  authDomain: "fitmantradb.firebaseapp.com",
  projectId: "fitmantradb",
  storageBucket: "fitmantradb.firebasestorage.app",
  messagingSenderId: "209992318615",
  appId: "1:209992318615:web:2b0cbcc0baed175ff533d2",
  measurementId: "G-1Q392J3BM9"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
