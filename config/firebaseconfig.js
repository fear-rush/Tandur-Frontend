import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD59XAL5O1xsI2cAr4Ss3FyqR5QzOD90Tc',
  authDomain: 'capstone-tandur.firebaseapp.com',
  projectId: 'capstone-tandur',
  storageBucket: 'capstone-tandur.appspot.com',
  messagingSenderId: '235405298804',
  appId: '1:235405298804:web:7d13d3c76f27f0bb6d9521',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
