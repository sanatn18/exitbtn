
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBDWjjcmOPwBGsR7GQH1MsijTyemBXIos8",
  authDomain: "fbintern-e0ef2.firebaseapp.com",
  databaseURL: "https://fbintern-e0ef2-default-rtdb.firebaseio.com",
  projectId: "fbintern-e0ef2",
  storageBucket: "fbintern-e0ef2.appspot.com",
  messagingSenderId: "650477996760",
  appId: "1:650477996760:web:72307a2bdbd8e0f61ae5ad"
};


const app = initializeApp(firebaseConfig);
const db=getDatabase(app);
export default db;