import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCzXctsGfRmhuG-ZD-g6ks2ZKpigoo1Oyo",
    authDomain: "react-firebase-auth-c2d35.firebaseapp.com",
    databaseURL: "https://react-firebase-auth-c2d35.firebaseio.com",
    projectId: "react-firebase-auth-c2d35",
    storageBucket: "react-firebase-auth-c2d35.appspot.com",
    messagingSenderId: "354412618127"
  };

export const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref('goals');
