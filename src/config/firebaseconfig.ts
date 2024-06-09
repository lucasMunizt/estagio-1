import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, query, orderBy, limit } from "firebase/firestore";

 const firebaseConfig = {
   
  apiKey: "AIzaSyCTBauWlUBFtLSELzm_rFtfrDAbjsq28aM",
  authDomain: "a-fuga-b06c7.firebaseapp.com",
  databaseURL: "https://a-fuga-b06c7-default-rtdb.firebaseio.com",
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

export async function saveScore(score:number,name:string) {
    try {
        await addDoc(collection(db, "scores"), 
        {pontuacao: score,
         nome: name  
        
        });
        return true;
    } catch (e) {
         return false;
    }
}   

export async function getScores() {
    const scoresCollection = collection(db, 'scores');
    const scoresQuery = query(scoresCollection, orderBy('pontuacao', 'desc'), limit(10));
    const scoresSnapshot = await getDocs(scoresQuery);
    const scoresList = scoresSnapshot.docs.map(doc => doc.data());
    return scoresList;
}

