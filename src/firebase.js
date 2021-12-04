// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDquzDNe-MAo9SmcNuRzts2yROanQlRa_c",
  authDomain: "insta-reels-8fbf8.firebaseapp.com",
  projectId: "insta-reels-8fbf8",
  storageBucket: "insta-reels-8fbf8.appspot.com",
  messagingSenderId: "103197170314",
  appId: "1:103197170314:web:1be7c5608d1ca9729f6b73"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();
const firestore=firebase.firestore();
export const database={
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage=firebase.storage();
