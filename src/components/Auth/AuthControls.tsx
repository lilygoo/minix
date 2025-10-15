import type { FormEvent } from 'react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthControls() {
	const { user, loginWithEmail, registerWithEmail, loginWithGoogle, logout, loading } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState<'login' | 'register'>('login');
	const [error, setError] = useState<string | null>(null);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		setError(null);
		try {
			if (mode === 'login') {
				await loginWithEmail(email, password);
			} else {
				await registerWithEmail(email, password);
			}
			setEmail('');
			setPassword('');
		} catch (err: any) {
			setError(err?.message ?? 'Auth error');
		}
	}

	if (loading) return <div className="text-sm text-gray-500">Loading...</div>;

	// Only show user info in header when logged in
	if (!user) return null;

	return (
		<div className="flex items-center gap-3">
			<span className="text-sm text-gray-600">{user.email}</span>
			<button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium" onClick={() => logout()}>Logout</button>
		</div>
	);
}
