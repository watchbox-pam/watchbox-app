import { useEffect, useState } from "react";
import { DashboardCard } from "../components/DashboardCards";
import { MiniTable } from "../components/Minitable";
import { PieChartComponent } from "../components/PieChart";
import { ActiveUsersChart } from "../components/Graph";
import {
	statsAPI,
	usersAPI,
	adsAPI,
	eventsAPI,
	analyticsAPI
} from "../services/api";
import type { User, Stats, Ad, Event } from "../types";

const Dashboard = () => {
	const [stats, setStats] = useState<Stats | null>(null);
	const [users, setUsers] = useState<User[]>([]);
	const [ads, setAds] = useState<Ad[]>([]);
	const [events, setEvents] = useState<Event[]>([]);
	const [userGrowthData, setUserGrowthData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadDashboardData();
	}, []);

	const loadDashboardData = async () => {
		try {
			setLoading(true);

			// Charger toutes les données en parallèle
			const [statsRes, usersRes, adsRes, eventsRes, growthRes] =
				await Promise.all([
					statsAPI.getStats().catch(() => ({ data: null })),
					usersAPI.getAll().catch(() => ({ data: [] })),
					adsAPI.getAll().catch(() => ({ data: [] })),
					eventsAPI.getAll().catch(() => ({ data: [] })),
					analyticsAPI.getUserGrowth().catch(() => ({ data: [] }))
				]);

			setStats(statsRes.data);
			setUsers(usersRes.data);
			setAds(adsRes.data);
			setEvents(eventsRes.data);

			// Formater les données de croissance pour le graphique
			if (growthRes.data && growthRes.data.length > 0) {
				const formattedData = growthRes.data.map((item: any) => ({
					label: item.month || item.label,
					value: item.count || item.value || 0
				}));
				setUserGrowthData(formattedData);
			}
		} catch (error) {
			console.error("Erreur lors du chargement du dashboard:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin h-12 w-12 border-b-2 border-indigo-600 rounded-full" />
			</div>
		);
	}

	// Calculs pour les pie charts
	const usersPieData = [
		{
			name: "Admins",
			value: users.filter((u) => u.role === "admin").length
		},
		{
			name: "Users",
			value: users.filter((u) => u.role !== "admin").length
		}
	];

	const adsPieData = [
		{ name: "Actives", value: ads.filter((a) => a.is_active).length },
		{ name: "Inactives", value: ads.filter((a) => !a.is_active).length }
	];

	// Calcul du CTR moyen
	const averageCTR =
		ads.length > 0
			? ads.reduce((sum, a) => {
					const ctr =
						a.impressions > 0
							? (a.clicks / a.impressions) * 100
							: 0;
					return sum + ctr;
				}, 0) / ads.length
			: 0;

	return (
		<div className="p-6 space-y-8">
			{/* Graphique de croissance */}
			{userGrowthData.length > 0 && (
				<div className="w-full">
					<ActiveUsersChart
						data={userGrowthData}
						type="line"
						title="Utilisateurs actifs par mois"
					/>
				</div>
			)}

			{/* Statistiques globales */}
			<div className="flex flex-wrap gap-4 overflow-x-auto">
				<DashboardCard
					title="Utilisateurs actifs"
					value={
						stats?.active_users ||
						users.filter((u) => u.is_active).length
					}
					color="bg-green-50"
					icon="users"
				/>
				<DashboardCard
					title="Nouveaux ce mois"
					value={stats?.new_users_this_month || 0}
					color="bg-blue-50"
					icon="userPlus"
				/>
				<DashboardCard
					title="Admins"
					value={users.filter((u) => u.role === "admin").length}
					color="bg-purple-50"
					icon="shield"
				/>
				<DashboardCard
					title="Total utilisateurs"
					value={stats?.total_users || users.length}
					color="bg-gray-50"
					icon="database"
				/>
				<DashboardCard
					title="Publicités actives"
					value={ads.filter((a) => a.is_active).length}
					color="bg-purple-50"
					icon="trendingUp"
				/>
				<DashboardCard
					title="Impressions totales"
					value={
						stats?.total_impressions ||
						ads.reduce((sum, a) => sum + a.impressions, 0)
					}
					color="bg-indigo-50"
					icon="eye"
				/>
				<DashboardCard
					title="Clics totaux"
					value={
						stats?.total_clicks ||
						ads.reduce((sum, a) => sum + a.clicks, 0)
					}
					color="bg-indigo-100"
					icon="click"
				/>
				<DashboardCard
					title="CTR global (%)"
					value={averageCTR.toFixed(2)}
					color="bg-indigo-200"
					icon="percent"
				/>
				<DashboardCard
					title="Événements à venir"
					value={events.filter((e) => e.is_active).length}
					color="bg-blue-50"
					icon="calendar"
				/>
				<DashboardCard
					title="Total événements"
					value={events.length}
					color="bg-blue-200"
					icon="clock"
				/>
			</div>

			{/* Résumé rapide des Users */}
			<MiniTable
				title="Utilisateurs récents"
				columns={[
					{ header: "Nom", key: "username" },
					{ header: "Email", key: "email" },
					{ header: "Rôle", key: "role" },
					{
						header: "Statut",
						key: "is_active"
					}
				]}
				data={users.slice(0, 5).map((u) => ({
					...u,
					is_active: u.is_active ? "✓ Actif" : "✗ Inactif"
				}))}
				actions={(row) => (
					<div className="flex gap-2">
						<button className="text-indigo-600 hover:underline">
							Voir
						</button>
					</div>
				)}
			/>

			{/* Résumé des Publicités */}
			<MiniTable
				title="Publicités"
				columns={[
					{ header: "Titre", key: "title" },
					{ header: "Impressions", key: "impressions" },
					{ header: "Clics", key: "clicks" },
					{
						header: "CTR (%)",
						key: "ctr"
					},
					{
						header: "Statut",
						key: "is_active"
					}
				]}
				data={ads.slice(0, 5).map((a) => ({
					...a,
					ctr:
						a.impressions > 0
							? ((a.clicks / a.impressions) * 100).toFixed(2) +
								" %"
							: "0 %",
					is_active: a.is_active ? "✓ Active" : "✗ Inactive"
				}))}
				actions={(row) => (
					<button className="text-indigo-600 hover:underline">
						Modifier
					</button>
				)}
			/>

			{/* Résumé des Événements */}
			<MiniTable
				title="Événements"
				columns={[
					{ header: "Titre", key: "title" },
					{ header: "Date début", key: "start_date" },
					{ header: "Date fin", key: "end_date" },
					{ header: "Lieu", key: "location" },
					{
						header: "Statut",
						key: "is_active"
					}
				]}
				data={events.slice(0, 5).map((e) => ({
					...e,
					start_date: new Date(e.start_date).toLocaleDateString(
						"fr-FR"
					),
					end_date: new Date(e.end_date).toLocaleDateString("fr-FR"),
					is_active: e.is_active ? "✓ Actif" : "✗ Inactif"
				}))}
				actions={(row) => (
					<div className="flex gap-2">
						<button className="text-indigo-600 hover:underline">
							Modifier
						</button>
					</div>
				)}
			/>

			{/* Graphiques */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<PieChartComponent
					data={usersPieData}
					title="Répartition des utilisateurs"
				/>
				<PieChartComponent
					data={adsPieData}
					title="Publicités actives vs inactives"
				/>
			</div>
		</div>
	);
};

export default Dashboard;
