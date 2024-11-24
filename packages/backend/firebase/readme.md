# Firebase package

## Usage

- Create the environment variables in the app project

```
FIREBASE_API_KEY=""
FIREBASE_AUTH_DOMAIN=""
FIREBASE_DATABASE_URL="
FIREBASE_PROJECT_ID= ""
FIREBASE_STORAGE_BUCKET=""
FIREBASE_MESSAGING_SENDER_ID=""
FIREBASE_APP_ID=""
```

- Add the firebaseConfig in the project

```
import { initializeFirebase } from "@repo/firebase/initializeFirebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? "",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? "",
  databaseURL: process.env.FIREBASE_DATABASE_URL ?? "",
  projectId: process.env.FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.FIREBASE_APP_ID ?? "",
};

export const { app, database } = initializeFirebase(firebaseConfig);

```

Use the rest of the lib passing the database variable

## Tips

- For security reason, use only in Server Side, in Next JS just the environment variables don't have the PUBLIC as prefix will handle with that (but it will "break" the code if you try to use on Client Side)
