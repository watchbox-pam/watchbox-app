import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />
			<div className="flex-1 p-6 overflow-auto">
				<Topbar />
				<main className="p-6 overflow-y-auto">{children}</main>
			</div>
		</div>
	);
}
