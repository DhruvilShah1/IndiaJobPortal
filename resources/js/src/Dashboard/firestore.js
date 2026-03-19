const firebaseConfig = {
  apiKey: "AIzaSyC40myf8akyCU6KSpmKrGVRub9nhFazj_k",
  authDomain: "ambulancne.firebaseapp.com",
  projectId: "ambulancne",
  storageBucket: "ambulancne.firebasestorage.app",
  messagingSenderId: "331280987601",
  appId: "1:331280987601:web:4e67e6ae939c9b45c3dcf0",
  measurementId: "G-XWPGPF35WN"
};

firebase.initializeApp(firebaseConfig);

 export const db = firebase.firestore();

