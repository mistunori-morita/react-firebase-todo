import * as firebase from 'firebase';

const config = {
  apiKey: "xxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxx.com",
  databaseURL: "xxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxx"
  };

export const firebaseApp = firebase.initializeApp(config);
