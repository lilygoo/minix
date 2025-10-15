import AuthControls from '../components/Auth/AuthControls';
import LoginForm from '../components/Auth/LoginForm';
import PostForm from '../components/Post/PostForm';
import PostList from '../components/Post/PostList';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
	const { user } = useAuth();
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
			<div className="max-w-4xl mx-auto p-6 space-y-8">
				{/* Header */}
				<header className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
								Mini Social X
							</h1>
							<p className="text-gray-600 mt-2 text-lg">Share your thoughts, connect with the world</p>
						</div>
						<div className="ml-4">
							<AuthControls />
						</div>
					</div>
				</header>

				{/* Post Form or Login Form */}
				{user ? (
					<PostForm />
				) : (
					<LoginForm />
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
