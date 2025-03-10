import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyD6AuqkBiLIkum-EelyzLGvLI0GGf2uc2U',
  authDomain: 'kanban-board-react-redux.firebaseapp.com',
  projectId: 'kanban-board-react-redux',
  storageBucket: 'kanban-board-react-redux.appspot.com',
  messagingSenderId: '950725741247',
  appId: '1:950725741247:web:4b5befe9bd31b86061940a',
  measurementId: 'G-HQSZRP1RCB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
