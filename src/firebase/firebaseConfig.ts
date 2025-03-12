import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyArkZGrvsYe3W8dVbz7FYq6CJOutahI4BU',
  authDomain: 'kanban-redux-firebase.firebaseapp.com',
  projectId: 'kanban-redux-firebase',
  storageBucket: 'kanban-redux-firebase.appspot.com',
  messagingSenderId: '182048836668',
  appId: '1:182048836668:web:e5f6c55e5bed023cc00739',
  measurementId: 'G-8V0MHRCWW4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
