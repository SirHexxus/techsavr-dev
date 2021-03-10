import admin from 'firebase-admin';
const serviceAccount = require('../techsavr-dev-firebase-adminsdk-3ou8l-26450d6d39.json');

if (admin.apps.length < 1) {
  admin.initializeApp({
    credential: admin.credential.cert(
      serviceAccount || {
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY, //.replace(/\\n/g, '\n'),
        project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      }
    ) //,
    // databaseURL: ''
  });
}

const auth = admin.auth();
const db = admin.firestore();
export { auth, db };
