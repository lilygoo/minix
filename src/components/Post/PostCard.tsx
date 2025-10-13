import { useState } from 'react';
import { deletePost } from '../../services/posts';
import PostForm from './PostForm';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function PostCard({ post }: { post: any }) {
	const { user } = useAuth();
	const isOwner = user?.uid === post.authorId;
	const [editing, setEditing] = useState(false);

	return (
		<div className="border rounded bg-white p-4 flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold text-lg">{post.title}</h3>
				<span className="text-xs text-gray-500">{post.createdAt?.toDate ? post.createdAt.toDate().toLocaleString() : ''}</span>
			</div>
			<div className="text-sm text-gray-600">
				Author: <Link className="text-blue-600 hover:underline" to={`/author/${post.authorId}`}>{post.authorId}</Link>
			</div>
			{editing ? (
				<PostForm postId={post.id} initialTitle={post.title} initialContent={post.content} onSaved={() => setEditing(false)} />
			) : (
				<p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
			)}
			{isOwner && !editing && (
				<div className="flex items-center gap-2">
					<button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" onClick={() => setEditing(true)}>Edit</button>
					<button className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700" onClick={() => deletePost(post.id)}>Delete</button>
				</div>
			)}
		</div>
	);
}
