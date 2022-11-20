import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDzwcMI8_o_VDr1zhJsR5udAtWKZ9T_rgA',
  authDomain: 'todo-app-285fb.firebaseapp.com',
  projectId: 'todo-app-285fb',
  storageBucket: 'todo-app-285fb.appspot.com',
  messagingSenderId: '534633839620',
  appId: '1:534633839620:web:50cfb747e8e1c2d0cc8951',
  measurementId: 'G-935E5BSX58',
});

const db = firebaseApp.firestore();

export default db;
