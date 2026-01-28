import { useEffect, useState } from "react";
import { Edit, Trash2, Calendar, Plus } from "lucide-react";
import { eventsAPI } from "../../services/api";
import type { Event } from "../../types";

const Events = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadEvents();
	}, []);

	const loadEvents = async () => {
		try {
			setLoading(true);
			const res = await eventsAPI.getAll();
			setEvents(res.data);
		} catch (error) {
			console.error("Erreur lors du chargement des événements:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleToggleActive = async (id: number) => {
		try {
			await eventsAPI.toggleActive(id);
			loadEvents();
		} catch (error) {
			console.error("Erreur toggle événement:", error);
			alert("Erreur lors de la modification du statut");
		}
	};

	const handleDeleteEvent = async (id: number) => {
		if (window.confirm("Supprimer cet événement ?")) {
			try {
				await eventsAPI.delete(id);
				loadEvents();
			} catch (error) {
				console.error("Erreur suppression événement:", error);
				alert("Erreur lors de la suppression");
			}
		}
	};

	const formatDate = (dateStr: string, short: boolean = false) => {
		const date = new Date(dateStr);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		const shortYear = String(year).slice(-2);
		return short
			? `${day}/${month}/${shortYear}`
			: `${day}/${month}/${year}`;
	};

	if (loading) {
		return (
			<div className="flex justify-center py-20">
				<div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full" />
			</div>
		);
	}

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-2xl font-bold">
						Gestion des Événements
					</h2>
					<p className="text-gray-500 mt-1">
						{events.length} événements
					</p>
				</div>
				<button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
					<Plus size={18} /> Ajouter un événement
				</button>
			</div>

			<div className="bg-white rounded-xl shadow overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50 border-b">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Titre
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Date début
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Date fin
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Lieu
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Type
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Statut
							</th>
							<th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{events.map((event) => (
							<tr key={event.id} className="hover:bg-gray-50">
								<td className="px-6 py-4 font-medium">
									{event.title}
								</td>
								<td className="px-6 py-4 text-sm text-gray-600">
									<span className="hidden sm:inline">
										{formatDate(event.start_date)}
									</span>
									<span className="inline sm:hidden">
										{formatDate(event.start_date, true)}
									</span>
								</td>
								<td className="px-6 py-4 text-sm text-gray-600">
									<span className="hidden sm:inline">
										{formatDate(event.end_date)}
									</span>
									<span className="inline sm:hidden">
										{formatDate(event.end_date, true)}
									</span>
								</td>
								<td className="px-6 py-4 text-sm text-gray-600">
									{event.location}
								</td>
								<td className="px-6 py-4 text-sm text-gray-600">
									<span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs">
										{event.type}
									</span>
								</td>
								<td className="px-6 py-4">
									<button
										onClick={() =>
											handleToggleActive(event.id)
										}
										className={`flex items-center gap-1 text-sm font-semibold ${
											event.is_active
												? "text-green-600"
												: "text-red-600"
										}`}>
										{event.is_active
											? "✓ Actif"
											: "✗ Inactif"}
									</button>
								</td>
								<td className="px-6 py-4 text-right">
									<button className="p-2 hover:bg-indigo-50 rounded text-indigo-600">
										<Edit size={16} />
									</button>
									<button
										onClick={() =>
											handleDeleteEvent(event.id)
										}
										className="p-2 hover:bg-red-50 rounded text-red-600 ml-2">
										<Trash2 size={16} />
									</button>
								</td>
							</tr>
						))}
						{events.length === 0 && (
							<tr>
								<td
									colSpan={7}
									className="text-center py-10 text-gray-500">
									<Calendar className="inline mr-2" /> Aucun
									événement pour le moment.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Events;
