export default function Topbar() {
	return (
		<header className="h-14 bg-white border-b flex items-center justify-between px-6">
			<span className="font-semibold">Administration</span>
			<div className="flex items-center gap-4">
				<span className="text-sm text-gray-600">Admin</span>
				<img src="https://i.pravatar.cc/40" className="rounded-full" />
			</div>
		</header>
	);
}
