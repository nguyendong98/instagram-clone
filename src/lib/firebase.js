import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from 'seed';
const firebaseConfig = {
    apiKey: "AIzaSyCvIqlbm6kdi_TvWohW7rU4Hoz1do8ibm0",
    authDomain: "instagram-clone-4ad43.firebaseapp.com",
    projectId: "instagram-clone-4ad43",
    storageBucket: "instagram-clone-4ad43.appspot.com",
    messagingSenderId: "886404237122",
    appId: "1:886404237122:web:91fe0b22d5d00cab33eadb"
};

const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firebase.firestore;
// seedDatabase(firebase)

export { firebase, FieldValue };
