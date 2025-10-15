import { useState } from 'react';
import { deletePost } from '../../services/posts';
import PostForm from './PostForm';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';

export default function PostCard({ post }: { post: any }) {
	const { user } = useAuth();
	const isOwner = user?.uid === post.authorId;
	const [editing, setEditing] = useState(false);

	if (editing) {
		return (
			<Card>
				<CardContent className="pt-6">
					<PostForm postId={post.id} initialTitle={post.title} initialContent={post.content} onSaved={() => setEditing(false)} />
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="group">
			<CardHeader>
				<CardTitle className="group-hover:text-blue-600 transition-colors duration-200">
					{post.title}
				</CardTitle>
				<CardDescription className="flex items-center gap-2">
					<span>Author:</span>
					<Link 
						className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200" 
						to={`/author/${post.authorId}`}
					>
						{post.authorId}
					</Link>
					<span>•</span>
					<span className="whitespace-nowrap">
						{post.createdAt?.toDate ? post.createdAt.toDate().toLocaleString() : ''}
					</span>
				</CardDescription>
			</CardHeader>
			
			<CardContent>
				<p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">
					{post.content}
				</p>
			</CardContent>

			{isOwner && (
				<CardFooter className="gap-3">
					<button 
						className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition-all duration-200 text-sm shadow-sm hover:shadow-md" 
						onClick={() => setEditing(true)}
					>
						Edit
					</button>
					<button 
						className="px-4 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 font-medium transition-all duration-200 text-sm shadow-sm hover:shadow-md" 
						onClick={() => deletePost(post.id)}
					>
						Delete
					</button>
				</CardFooter>
			)}
		</Card>
	);
}
