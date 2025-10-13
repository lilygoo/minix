import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthorFeed from './pages/AuthorFeed';
import Seed from './pages/Seed';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/author/:authorId" element={<AuthorFeed />} />
					<Route path="/dev/seed" element={<Seed />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
