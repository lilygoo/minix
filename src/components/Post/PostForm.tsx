import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { createPost, updatePost } from '../../services/posts';
import { useAuth } from '../../contexts/AuthContext';

export default function PostForm({
	postId,
	initialTitle = '',
	initialContent = '',
	onSaved,
}: {
	postId?: string;
	initialTitle?: string;
	initialContent?: string;
	onSaved?: () => void;
}) {
	const { user } = useAuth();
	const [title, setTitle] = useState(initialTitle);
	const [content, setContent] = useState(initialContent);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setTitle(initialTitle);
		setContent(initialContent);
	}, [initialTitle, initialContent]);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (!user) {
			setError('Login required');
			return;
		}
		setError(null);
		try {
			if (postId) {
				await updatePost(postId, { title, content });
			} else {
				await createPost({ title, content, authorId: user.uid });
			}
			setTitle('');
			setContent('');
			onSaved?.();
		} catch (err: any) {
			setError(err?.message ?? 'Failed to save');
		}
	}

	return (
		<form onSubmit={onSubmit} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
			{/* Header */}
			<div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
				<h3 className="text-lg font-semibold text-gray-900">{postId ? 'Edit Post' : 'Create New Post'}</h3>
			</div>
			
			{/* Form Fields */}
			<div className="p-6 space-y-4">
				<div>
					<input 
						className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base" 
						placeholder="标题" 
						value={title} 
						onChange={(e) => setTitle(e.target.value)} 
					/>
				</div>
				<div>
					<textarea 
						className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base resize-none" 
						placeholder="Share your thoughts..." 
						rows={4} 
						value={content} 
						onChange={(e) => setContent(e.target.value)} 
					/>
				</div>
				
				{/* Action Buttons */}
				<div className="flex items-center justify-between pt-2">
					<div className="flex items-center gap-3">
						<button 
							className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg" 
							type="submit"
						>
							{postId ? 'Update' : 'Create'}
						</button>
						{postId && (
							<button 
								className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all duration-200" 
								type="button"
								onClick={() => onSaved?.()}
							>
								取消
							</button>
						)}
					</div>
					{error && (
						<div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
							{error}
						</div>
					)}
				</div>
			</div>
		</form>
	);
}
