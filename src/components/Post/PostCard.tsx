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
		<div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
			{/* Header with Title and Time */}
			<div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
				<div className="flex items-start justify-between gap-4">
					<h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-200 flex-1">{post.title}</h3>
					<span className="text-sm text-gray-500 font-medium whitespace-nowrap">
						{post.createdAt?.toDate ? post.createdAt.toDate().toLocaleString() : ''}
					</span>
				</div>
			</div>

			{/* Author Section */}
			<div className="px-6 py-3 bg-gray-50/50">
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium text-gray-600">Author:</span>
					<Link 
						className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200" 
						to={`/author/${post.authorId}`}
					>
						{post.authorId}
					</Link>
				</div>
			</div>

			{/* Content Section */}
			<div className="px-6 py-4">
				{editing ? (
					<PostForm postId={post.id} initialTitle={post.title} initialContent={post.content} onSaved={() => setEditing(false)} />
				) : (
					<p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">{post.content}</p>
				)}
			</div>

			{/* Action Buttons */}
			{isOwner && !editing && (
				<div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100">
					<div className="flex items-center gap-3">
						<button 
							className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition-all duration-200 hover:scale-105" 
							onClick={() => setEditing(true)}
						>
							编辑
						</button>
						<button 
							className="px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-medium transition-all duration-200 hover:scale-105" 
							onClick={() => deletePost(post.id)}
						>
							删除
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
