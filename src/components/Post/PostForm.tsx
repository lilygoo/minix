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
		<form onSubmit={onSubmit} className="flex flex-col gap-2 p-4 border rounded bg-white">
			<input className="px-3 py-2 border rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
			<textarea className="px-3 py-2 border rounded" placeholder="What's happening?" rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
			<div className="flex items-center gap-2">
				<button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" type="submit">{postId ? 'Update' : 'Post'}</button>
				{error && <span className="text-sm text-red-600">{error}</span>}
			</div>
		</form>
	);
}
