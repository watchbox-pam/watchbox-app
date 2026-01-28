import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./screens/Dashboard";
import Movies from "./screens/Movies/Movies";
import Users from "./screens/Users/Users";
import Swipe from "./screens/Swipe/Swipe";
import Events from "./screens/Events/Events";
import Ads from "./screens/Ads/Ads";

export default function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/users" element={<Users />} />
				<Route path="/swipe" element={<Swipe />} />
				<Route path="/events" element={<Events />} />
				<Route path="/ads" element={<Ads />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Layout>
	);
}
