import { useAuth } from '../../contexts/AuthContext';

export default function AuthControls() {
	const { user, logout, loading } = useAuth();

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
