import AuthControls from '../components/Auth/AuthControls';
import PostForm from '../components/Post/PostForm';
import PostList from '../components/Post/PostList';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
	const { user } = useAuth();
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
			<div className="max-w-4xl mx-auto p-6 space-y-8">
				{/* Header */}
				<header className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
								Mini Social X
							</h1>
							<p className="text-gray-600 mt-1">Share your thoughts, connect with the world</p>
						</div>
						<AuthControls />
					</div>
				</header>

				{/* Post Form or Login Prompt */}
				{user ? (
					<PostForm />
				) : (
					<div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 text-center">
						<div className="text-yellow-800">
							<p className="text-lg font-medium">Please login to start sharing your thoughts</p>
							<p className="text-sm text-yellow-700 mt-1">After login, you can start sharing your thoughts</p>
						</div>
					</div>
				)}

				{/* Posts Section */}
				<div className="space-y-6">
					<h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
					<PostList />
				</div>
			</div>
		</div>
	);
}
