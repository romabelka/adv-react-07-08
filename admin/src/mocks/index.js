import conferences from './conferences'
import firebase from 'firebase/app'
import 'firebase/firestore'

export function saveEventsToFB() {
  const eventsRef = firebase.firestore().collection('events')
  conferences.forEach((conference) => eventsRef.add(conference))
}

export function savePersonToFB(person) {
  const peopleRef = firebase.firestore().collection('people')
  peopleRef.add(person)
}

export async function getPersonsFromFB() {
  const peopleRef = firebase.firestore().collection('people')
  const people = await peopleRef.get()
  return people.docs
}

window.saveEventsToFB = saveEventsToFB
window.loadPersonsFromFB = getPersonsFromFB
