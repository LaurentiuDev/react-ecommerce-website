import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCXjd9G9pf6WA__-LmS2T0e2l79TOU7TNg",
  authDomain: "ionic-angular-course-6b3ff.firebaseapp.com",
  databaseURL: "https://ionic-angular-course-6b3ff.firebaseio.com",
  projectId: "ionic-angular-course-6b3ff",
  storageBucket: "ionic-angular-course-6b3ff.appspot.com",
  messagingSenderId: "955232772671",
  appId: "1:955232772671:web:a30b44cd8a7beff6bdce8a",
  measurementId: "G-4T28WJ9BSH"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();

export {
  storage, firebase as default
}