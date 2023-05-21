// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const imagesRef = ref(
  storage,
  "gs://bachelor-oppgave.appspot.com/images"
);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const signUpUser = async (email: string, password: string): Promise<any> => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUser = async (e: any, email: string, password: string, userFeedBack: (err: string) => void) => {
  if (!auth.currentUser) {
    try {
      const s = async (): Promise<boolean> => {
        let bool = false
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user);
          if(user){
            bool = true
          }
        })
        return bool
      }
      if(await s()){
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      userFeedBack(error as string)
    }

  } else {
    console.log("Hello, " + auth.currentUser?.displayName);
  }
  e.preventDefault();
};

export const signOutUser = async (e: any, auth: any) => {
  if (auth.currentUser) {
    try {
      await signOut(auth)
        .then(() => {
          console.log("Logged out");
          window.location.href = "/login";
        })
        .then(() => {})
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("No user logged in");
  }
  e.preventDefault();
};
