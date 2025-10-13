import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';
import { createPost } from '../services/posts';

async function ensureUser(email: string, password: string): Promise<UserCredential> {
	try {
		return await createUserWithEmailAndPassword(auth, email, password);
	} catch (e: any) {
		if (e?.code === 'auth/email-already-in-use') {
			return await signInWithEmailAndPassword(auth, email, password);
		}
		throw e;
	}
}

export async function seedDevData() {
	const originalUser = auth.currentUser;
	const password = 'Passw0rd!test';
	const users = [
		{ email: 'user1@example.com', posts: [
			{ title: 'User1 Post A', content: 'Hello from user1 A' },
			{ title: 'User1 Post B', content: 'Hello from user1 B' },
		]},
		{ email: 'user2@example.com', posts: [
			{ title: 'User2 Post A', content: 'Greetings from user2 A' },
			{ title: 'User2 Post B', content: 'Greetings from user2 B' },
		]},
	];

	for (const u of users) {
		const cred = await ensureUser(u.email, password);
		const uid = cred.user.uid;
		for (const p of u.posts) {
			await createPost({ title: p.title, content: p.content, authorId: uid });
		}
		await signOut(auth);
	}

	// Restore original session if possible (no-op if none)
	if (originalUser?.email) {
		try {
			await signInWithEmailAndPassword(auth, originalUser.email, password);
		} catch {
			// If original user used Google or different password, leave signed out
		}
	}
}
