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
		<div className="bg-white hover:bg-gray-50 transition-colors duration-200 group">
			{/* Main Post Content */}
			<div className="px-6 py-4">
				{editing ? (
					<PostForm postId={post.id} initialTitle={post.title} initialContent={post.content} onSaved={() => setEditing(false)} />
				) : (
					<>
						{/* Header with Title, Author, and Time */}
						<div className="flex items-start justify-between gap-4 mb-3">
							<div className="flex-1 min-w-0">
								<h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-1">
									{post.title}
								</h3>
								<div className="flex items-center gap-2 text-sm text-gray-500">
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
								</div>
							</div>
						</div>

						{/* Post Content */}
						<div className="mb-4">
							<p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">
								{post.content}
							</p>
						</div>

						{/* Action Buttons */}
						{isOwner && (
							<div className="flex items-center gap-3 pt-2">
								<button 
									className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition-all duration-200 text-sm" 
									onClick={() => setEditing(true)}
								>
									Edit
								</button>
								<button 
									className="px-3 py-1.5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 font-medium transition-all duration-200 text-sm" 
									onClick={() => deletePost(post.id)}
								>
									Delete
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
