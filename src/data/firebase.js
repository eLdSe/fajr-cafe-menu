// src/data/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Конфиг твой
const firebaseConfig = {
  apiKey: "AIzaSyDdkayMqsoq7f7Hr1oWOY_SaKfYGwFuAEM",
  authDomain: "cafe-order-app-d2618.firebaseapp.com",
  projectId: "cafe-order-app-d2618",
  storageBucket: "cafe-order-app-d2618.firebasestorage.app",
  messagingSenderId: "910040587510",
  appId: "1:910040587510:web:79719c71305d923fa0a0d7",
  measurementId: "G-79N99QE99E"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Экспортируем Firestore, а не Analytics
export const db = getFirestore(app);