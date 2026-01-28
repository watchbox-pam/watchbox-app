import { useEffect, useState } from "react";
import {
	Search,
	UserPlus,
	Edit,
	Trash2,
	CheckCircle,
	XCircle,
	Film,
	Star
} from "lucide-react";
import { usersAPI } from "../../services/api";
import type { User } from "../../types";

const Users = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const loadUsers = async () => {
			try {
				const response = await usersAPI.getAll();
				setUsers(response.data);
			} catch (error) {
				console.warn(
					"API non disponible, utilisation des données de démo"
				);
				setUsers(MOCK_USERS);
			} finally {
				setLoading(false);
			}
		};
		loadUsers();
	}, []);

	const activeAdmins = users.filter(
		(u) => u.role === "admin" && u.is_active
	).length;

	const handleToggleActive = async (user: User) => {
		if (user.role === "admin" && activeAdmins <= 1 && user.is_active) {
			alert("Impossible de désactiver le dernier administrateur.");
			return;
		}
		await usersAPI.toggleActive(user.id);
		loadUsers();
	};

	const filteredUsers = users.filter(
		(u) =>
			u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
			u.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (loading) {
		return (
			<div className="flex justify-center py-20">
				<div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full" />
			</div>
		);
	}

	return (
		<div>
			{/* Header */}
			<div className="mb-8 flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Utilisateurs</h1>
					<p className="text-gray-500">{users.length} comptes</p>
				</div>
				<button className="flex gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700">
					<UserPlus size={18} />
					Ajouter
				</button>
			</div>

			{/* Search */}
			<div className="bg-white p-4 rounded-xl shadow mb-6">
				<div className="relative">
					<Search
						className="absolute left-3 top-2.5 text-gray-400"
						size={18}
					/>
					<input
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Nom ou email"
						className="pl-10 w-full border rounded-lg py-2"
					/>
				</div>
			</div>

			{/* Table */}
			<div className="bg-white rounded-xl shadow overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50 border-b">
						<tr>
							<th className="px-6 py-4 text-left">Utilisateur</th>
							<th>Email</th>
							<th>Usage</th>
							<th>Rôle</th>
							<th>Statut</th>
							<th className="text-right px-6">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{filteredUsers.map((u) => (
							<tr key={u.id} className="hover:bg-gray-50">
								<td className="px-6 py-4">
									<div className="font-medium">
										{u.username}
									</div>
									<div className="text-xs text-gray-500">
										ID {u.id}
									</div>
								</td>

								<td className="text-sm">{u.email}</td>

								<td className="text-sm text-gray-600">
									<div className="flex gap-4">
										<span className="flex items-center gap-1">
											<Film size={14} />
											{u.stats?.movies_seen ?? 0}
										</span>
										<span className="flex items-center gap-1">
											<Star size={14} />
											{u.stats?.ratings_count ?? 0}
										</span>
									</div>
								</td>

								<td>
									<span
										className={`px-3 py-1 rounded-full text-xs ${
											u.role === "admin"
												? "bg-purple-100 text-purple-800"
												: "bg-gray-100"
										}`}>
										{u.role}
									</span>
								</td>

								<td>
									<button
										onClick={() => handleToggleActive(u)}
										className="flex items-center gap-1">
										{u.is_active ? (
											<span className="text-green-600 flex items-center gap-1">
												<CheckCircle size={14} /> Actif
											</span>
										) : (
											<span className="text-red-600 flex items-center gap-1">
												<XCircle size={14} /> Inactif
											</span>
										)}
									</button>
								</td>

								<td className="px-6 text-right">
									<button className="p-2 hover:bg-indigo-50 rounded">
										<Edit size={16} />
									</button>
									<button className="p-2 hover:bg-red-50 rounded text-red-600">
										<Trash2 size={16} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{filteredUsers.length === 0 && (
					<div className="text-center py-10 text-gray-500">
						Aucun utilisateur trouvé
					</div>
				)}
			</div>
		</div>
	);
};

export default Users;
