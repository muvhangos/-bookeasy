import admin from "firebase-admin";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT environment variable is not configured."
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(serviceAccount)
    ),
  });
}

const db = admin.firestore();

export { db };