import { addDoc, collection, serverTimestamp, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { PostDoc } from '../types/post';

const postsCol = collection(db, 'posts');

export const subscribeToPosts = (cb: (posts: PostDoc[]) => void) => {
	const q = query(postsCol, orderBy('createdAt', 'desc'));
	return onSnapshot(q, (snap) => cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as PostDoc))));
};

export const subscribeToPostsByAuthor = (authorId: string, cb: (posts: PostDoc[]) => void) => {
	const q = query(postsCol, where('authorId', '==', authorId), orderBy('createdAt', 'desc'));
	return onSnapshot(q, (snap) => cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as PostDoc))));
};

export const createPost = async (data: { title: string; content: string; authorId: string; }) => {
	return addDoc(postsCol, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
};

export const updatePost = async (id: string, data: { title: string; content: string; }) => {
	return updateDoc(doc(db, 'posts', id), { ...data, updatedAt: serverTimestamp() });
};

export const deletePost = async (id: string) => deleteDoc(doc(db, 'posts', id));
