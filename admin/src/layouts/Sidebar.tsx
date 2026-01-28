import { NavLink } from "react-router-dom";

const links = [
	{ to: "/", label: "Dashboard" },
	{ to: "/movies", label: "Films" },
	{ to: "/swipe", label: "Swipe" },
	{ to: "/events", label: "Calendrier" },
	{ to: "/users", label: "Utilisateurs" },
	{ to: "/ads", label: "Publicités" }
];

export default function Sidebar() {
	return (
		<aside className="w-64 min-w-[16rem] max-w-[16rem] bg-black text-white p-4 h-screen sticky top-0">
			<h1 className="text-xl font-bold mb-6">BackOffice - WatchBox</h1>
			<nav className="space-y-2">
				{links.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						className={({ isActive }) =>
							`block px-4 py-2 rounded ${isActive ? "bg-gray-800" : "hover:bg-gray-700"}`
						}>
						{link.label}
					</NavLink>
				))}
			</nav>
		</aside>
	);
}
