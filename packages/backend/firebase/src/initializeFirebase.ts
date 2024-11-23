import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export function initializeFirebase(firebaseConfig: FirebaseConfig) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  return { app, database };
}
