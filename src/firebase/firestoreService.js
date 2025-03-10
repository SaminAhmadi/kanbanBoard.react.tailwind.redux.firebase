// firebase/firestoreService.js
import { db } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// Function to add a new board
export const addBoard = async boardName => {
  try {
    const docRef = await addDoc(collection(db, 'boards'), { name: boardName });
    return docRef.id; // Returns the new board ID
  } catch (error) {
    console.error('Error adding board: ', error);
  }
};

// Function to get all boards
export const getBoards = async () => {
  const querySnapshot = await getDocs(collection(db, 'boards'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to add a new task
export const addTask = async (boardId, task) => {
  try {
    await addDoc(collection(db, 'tasks'), { boardId, ...task });
  } catch (error) {
    console.error('Error adding task: ', error);
  }
};

// Function to get tasks for a board
export const getTasks = async boardId => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  return querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(task => task.boardId === boardId);
};

// Function to update task status
export const updateTaskStatus = async (taskId, newStatus) => {
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, { status: newStatus });
};

// Function to delete a task
export const deleteTask = async taskId => {
  await deleteDoc(doc(db, 'tasks', taskId));
};
