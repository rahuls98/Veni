import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyADYdFAQVGGEywnaB7eiBH7C6_hmAjbWOI",
    authDomain: "veni-avem.firebaseapp.com",
    databaseURL: "https://veni-avem.firebaseio.com",
    projectId: "veni-avem",
    storageBucket: "veni-avem.appspot.com",
    messagingSenderId: "54168033703",
    appId: "1:54168033703:web:43f972bc24b12f7b617e82"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const avemStorage = firebase.storage();
const avemFirestore = firebase.firestore();
const uploadTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export { avemStorage, avemFirestore, uploadTimestamp };