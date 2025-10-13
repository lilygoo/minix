import { useState } from 'react';
import { seedDevData } from '../dev/seed';
import { Link } from 'react-router-dom';

export default function Seed() {
	const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
	const [message, setMessage] = useState<string | null>(null);

	async function runSeed() {
		setStatus('running');
		setMessage(null);
		try {
			await seedDevData();
			setStatus('done');
			setMessage('Seed complete. Check Home for posts.');
		} catch (e: any) {
			setStatus('error');
			setMessage(e?.message ?? 'Seed failed');
		}
	}

	return (
		<div className="max-w-xl mx-auto p-4 space-y-4">
			<h1 className="text-xl font-semibold">Development Seeder</h1>
			<p className="text-sm text-gray-600">Creates 2 users and 2 posts each. This will sign you out temporarily.</p>
			<div className="flex items-center gap-2">
				<button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60" disabled={status==='running'} onClick={runSeed}>
					{status === 'running' ? 'Seeding…' : 'Run Seed'}
				</button>
				<Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
			</div>
			{message && <div className="text-sm">{message}</div>}
		</div>
	);
}
