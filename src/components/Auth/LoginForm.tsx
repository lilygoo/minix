import type { FormEvent } from 'react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export default function LoginForm() {
	const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState<'login' | 'register'>('login');
	const [error, setError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);

	async function onSubmitEmail(e: FormEvent) {
		e.preventDefault();
		setError(null);
		if (!email || !password) {
			setError('Please enter email and password');
			return;
		}
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

	return (
		<Card className="max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl">Sign in or create an account</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Email Form */}
				<form onSubmit={onSubmitEmail} className="space-y-3">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
						<input
							type="email"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Enter your email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					{showPassword && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
							<input
								type="password"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					)}

					{showPassword ? (
						<div className="space-y-2">
							<button
								type="submit"
								className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
							>
								{mode === 'login' ? 'Sign in' : 'Create account'}
							</button>
							<button
								type="button"
								onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
								className="w-full text-sm text-blue-600 hover:underline"
							>
								{mode === 'login' ? 'Need to create an account?' : 'Already have an account?'}
							</button>
						</div>
					) : (
						<button
							type="button"
							onClick={() => setShowPassword(true)}
							className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
						>
							Continue with email
						</button>
					)}
				</form>

				{error && (
					<div className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">
						{error}
					</div>
				)}

				{/* Divider */}
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-white text-gray-500">or use one of these options</span>
					</div>
				</div>

				{/* Social Sign In */}
				<div className="flex justify-center">
					<button
						type="button"
						onClick={() => loginWithGoogle()}
						className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
						title="Sign in with Google"
					>
						<svg className="w-6 h-6" viewBox="0 0 24 24">
							<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
					</button>
				</div>
			</CardContent>
		</Card>
	);
}

