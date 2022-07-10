import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyD_vBAMA42LLTITFfxvAX7bruIRIA-zmxs',
  authDomain: 'fake-store-27969.firebaseapp.com',
  projectId: 'fake-store-27969',
  storageBucket: 'fake-store-27969.appspot.com',
  messagingSenderId: '1046626059336',
  appId: '1:1046626059336:web:ceb8a222e4cae50777847d',
}
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
