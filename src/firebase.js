import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyAse5L-dGNgHIHbXvA21jANJLXwiEm5UsI",
  authDomain: "watsapp-clone-2e78a.firebaseapp.com",
  databaseURL: "https://watsapp-clone-2e78a.firebaseio.com",
  projectId: "watsapp-clone-2e78a",
  storageBucket: "watsapp-clone-2e78a.appspot.com",
  messagingSenderId: "356322029949",
  appId: "1:356322029949:web:e7eef8a2f9e08cac709c14"
};
 const firebaseApp= firebase.initializeApp(firebaseConfig);
 const db=firebaseApp.firestore();
 const auth=firebase.auth();
 const provider=new firebase.auth.GoogleAuthProvider();

 export{auth,provider};
 export default db;