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

  fetchAllEvents = () =>
    this.fb
      .firestore()
      .collection('events')
      .get()
      .then(resToEntities)

  loadAllPeople = () =>
    this.fb
      .firestore()
      .collection('people')
      .get()
      .then(resToEntities)

  subscribeForPeople = (callback) =>
    this.fb
      .firestore()
      .collection('people')
      .onSnapshot((snapshot) => callback(resToEntities(snapshot)))

  addPerson = (person) =>
    this.fb
      .firestore()
      .collection('people')
      .add(person)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

function resToEntities(res) {
  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export default new ApiService()
