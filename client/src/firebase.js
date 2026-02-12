import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyDJimRTqvPKvuwCVFF50SEQ1YbQvbc58Zo",
  authDomain: "my-chat-app-b2808.firebaseapp.com",
  projectId: "my-chat-app-b2808",
  storageBucket: "my-chat-app-b2808.firebasestorage.app",
  messagingSenderId: "955002200888",
  appId: "1:955002200888:web:559b281464c21d778b97cd" 
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
