import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

var FirebaseConfig = {
    apiKey: "AIzaSyAJDdWdPSXRxTukWUhYqrLh44HqBCXl4F4",
    authDomain: "hardware-web.firebaseapp.com",
    databaseURL: "https://hardware-web.firebaseio.com",
    projectId: "hardware-web",
    storageBucket: "hardware-web.appspot.com",
    messagingSenderId: "762528731852",
    appId: "1:762528731852:web:46def58e7b0c6606136869",
    measurementId: "G-19KQ1NJ1N2",
  };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(FirebaseConfig);
  }

firebase.firestore().settings(settings);

export default firebase;