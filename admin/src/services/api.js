import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from '../config'

class ApiService {
  constructor() {
    this.fb = firebase
    this.fb.initializeApp(firebaseConfig)
  }

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  getDataFromCollection = (collectionName) =>
    this.fb
      .firestore()
      .collection(collectionName)
      .limit(10) // here need pagination because of too many requests to the firestore
      .get()
      .then(function(querySnapshot) {
        return querySnapshot.docs.map((doc) => doc.data())
      })
}

export default new ApiService()
