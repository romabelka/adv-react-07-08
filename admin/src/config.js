import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'advreact-08-07'

const firebaseConfig = {
  apiKey: 'AIzaSyDNIbySBWf_3OSgFG_--aTR_5vsGSCbFXU',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: `${appName}`,
  storageBucket: '',
  messagingSenderId: '704376755167',
  appId: '1:704376755167:web:3a9fa5875df17947'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
