// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC3HNkxShpkoOmxwJKBCu_LMHVCr5MO_Qc',
  authDomain: 'crypto-1455a.firebaseapp.com',
  projectId: 'crypto-1455a',
  storageBucket: 'crypto-1455a.appspot.com',
  messagingSenderId: '709315908710',
  appId: '1:709315908710:web:278b43672f0734407749a7',
  measurementId: 'G-33VEZJH2C4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export default app;
