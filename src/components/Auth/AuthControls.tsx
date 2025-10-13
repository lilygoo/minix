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

	return (
		<div className="flex items-center gap-3">
			{user ? (
				<>
					<span className="text-sm text-gray-600">{user.email}</span>
					<button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" onClick={() => logout()}>Logout</button>
				</>
			) : (
				<form onSubmit={onSubmit} className="flex items-center gap-2">
					<input className="px-2 py-1 border rounded" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input className="px-2 py-1 border rounded" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
					<button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
						{mode === 'login' ? 'Need account?' : 'Have account?'}
					</button>
					<button className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600" type="button" onClick={() => loginWithGoogle()}>Google</button>
					{error && <span className="text-sm text-red-600">{error}</span>}
				</form>
			)}
		</div>
	);
}
