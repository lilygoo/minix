import AuthControls from '../components/Auth/AuthControls';
import PostForm from '../components/Post/PostForm';
import PostList from '../components/Post/PostList';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
	const { user } = useAuth();
	return (
		<div className="max-w-2xl mx-auto p-4 space-y-4">
			<header className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Mini Social X</h1>
				<AuthControls />
			</header>
			{user ? (
				<PostForm />
			) : (
				<div className="p-4 border rounded bg-yellow-50 text-yellow-800 text-sm">Login to post.</div>
			)}
			<PostList />
		</div>
	);
}
