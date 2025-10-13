import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyC5GtP6WdA_gjhJC_1YOR4_iA4BE35ftkQ",
	authDomain: "wk5minix.firebaseapp.com",
	projectId: "wk5minix",
	storageBucket: "wk5minix.firebasestorage.app",
	messagingSenderId: "457001122281",
	appId: "1:457001122281:web:971c8bbd9fb200362af378"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
