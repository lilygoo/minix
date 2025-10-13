import { useParams, Link } from 'react-router-dom';
import AuthControls from '../components/Auth/AuthControls';
import PostList from '../components/Post/PostList';

export default function AuthorFeed() {
	const { authorId } = useParams();
	return (
		<div className="max-w-2xl mx-auto p-4 space-y-4">
			<header className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Author: {authorId}</h1>
				<AuthControls />
			</header>
			<div>
				<Link className="text-blue-600 hover:underline" to="/">← Back to Home</Link>
			</div>
			<PostList authorId={authorId} />
		</div>
	);
}
