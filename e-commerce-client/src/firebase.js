import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyDLDEN-zJMd9vLg9j_De20PORMTCO-oOaM",
    authDomain: "shop-34a12.firebaseapp.com",
    projectId: "shop-34a12",
    storageBucket: "shop-34a12.appspot.com",
    messagingSenderId: "119043198812",
    appId: "1:119043198812:web:72fd48e8796ae60776fb99"
};

const app = initializeApp(firebaseConfig);

export default app