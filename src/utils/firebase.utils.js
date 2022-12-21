import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAmS_A6QVAJIsd44Cz6b6YDUrRttPlMzA4",
    authDomain: "crwn-db-pro.firebaseapp.com",
    projectId: "crwn-db-pro",
    storageBucket: "crwn-db-pro.appspot.com",
    messagingSenderId: "135148231619",
    appId: "1:135148231619:web:6da4095d26086f660f3b76"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserFromAuth = async (userAuth) => {
    const userDoc = doc(db, 'users', userAuth.user.uid);

    const user = await getDoc(userDoc);

    if (!user.exists()) {
        const { displayName, email } = userAuth.user;
        const createAt = new Date();

        try {
            await setDoc(userDoc, {
                displayName,
                email,
                createAt
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userDoc;
}

