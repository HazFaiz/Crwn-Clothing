import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {

    apiKey: "AIzaSyA9Lu53JqdIgKrMFmi0TsgcgSMTi_GJSZ4",
  
    authDomain: "crown-db-f9ec3.firebaseapp.com",
  
    projectId: "crown-db-f9ec3",
  
    storageBucket: "crown-db-f9ec3.appspot.com",
  
    messagingSenderId: "629624509022",
  
    appId: "1:629624509022:web:a945e6c8b8d87b0f1f1acf",
  
    measurementId: "G-LP10N444GP"
  
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`)

      const snapShot = await userRef.get();

      if(!snapShot.exists) {
          const {displayName, email} = userAuth;
          const createdAt = new Date()

          try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
          } catch(error) {
            console.log('error creating user', error.message)
          }
      }

      return userRef
  }

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;