// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCS8EBgd50Q5ED6jNbHrMt9eLVpTvXP8hM",
    authDomain: "quagga-dubhacks.firebaseapp.com",
    projectId: "quagga-dubhacks",
    storageBucket: "quagga-dubhacks.appspot.com",
    messagingSenderId: "278988715660",
    appId: "1:278988715660:web:a29fa479936352b469ada9",
    measurementId: "G-9BWXVVCJVQ",
    databaseURL: "https://quagga-dubhacks-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
// const analytics = getAnalytics(app);