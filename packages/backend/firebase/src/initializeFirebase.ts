import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

let firebaseApp: FirebaseApp | undefined; // Singleton instance of Firebase app
let firebaseDatabase: Database | undefined; // Singleton instance of Firebase database

export function initializeFirebase(firebaseConfig: FirebaseConfig): {
  app: FirebaseApp;
  database: Database;
} {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseDatabase = getDatabase(firebaseApp);
  }

  if (!firebaseApp || !firebaseDatabase) {
    throw new Error("Failed to initialize Firebase.");
  }

  return { app: firebaseApp, database: firebaseDatabase };
}
