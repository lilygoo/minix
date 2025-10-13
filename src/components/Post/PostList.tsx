import { useEffect, useState } from 'react';
import { subscribeToPosts, subscribeToPostsByAuthor } from '../../services/posts';
import PostCard from './PostCard';

export default function PostList({ authorId }: { authorId?: string }) {
	const [posts, setPosts] = useState<any[]>([]);

	useEffect(() => {
		if (authorId) {
			return subscribeToPostsByAuthor(authorId, setPosts);
		}
		return subscribeToPosts(setPosts);
	}, [authorId]);

	return (
		<div className="grid gap-4">
			{posts.map((p) => (
				<PostCard key={p.id} post={p} />
			))}
		</div>
	);
}
