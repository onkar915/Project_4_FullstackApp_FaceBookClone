import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrRpVQ6HdJs6aPph7OAovq8UZXZO7-TfY",
  authDomain: "fb-mern-a5043.firebaseapp.com",
  projectId: "fb-mern-a5043",
  storageBucket: "fb-mern-a5043.appspot.com",
  messagingSenderId: "932023419193",
  appId: "1:932023419193:web:3426ef85726c1c9fa3e8e8",
  measurementId: "G-5PE5C5JG6D"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export { auth, provider }
export default db