import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'advreact-08-07-11d10'

const firebaseConfig = {
  apiKey: 'AIzaSyCEy-hskirtYT34keQnwbi_3qLll1a3huk',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: `${appName}`,
  storageBucket: '',
  messagingSenderId: '514027659045',
  appId: '1:514027659045:web:83d3dd90fc94a7e9'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
