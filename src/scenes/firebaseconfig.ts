import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, query, orderBy, limit } from "firebase/firestore";

 const firebaseConfig = {
   
  apiKey: "AIzaSyCTBauWlUBFtLSELzm_rFtfrDAbjsq28aM",
  authDomain: "a-fuga-b06c7.firebaseapp.com",
  projectId: "a-fuga-b06c7",
  storageBucket: "a-fuga-b06c7.appspot.com",
  messagingSenderId: "574234616846",
  appId: "1:574234616846:web:eecfb6e3505e2e77cc885f",
  measurementId: "G-3M6FSQN5WS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export async function saveScore(score:number) {
    try {
        await addDoc(collection(db, "scores"), 
        {score: score,
        
        });
        console.log("Documento escrito com ID: ");
        alert("Score salvo com sucesso! ID: ");
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
         alert("Erro ao salvar o score: " + e.message);
         return false;
    }
}


