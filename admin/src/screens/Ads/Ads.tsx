import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ToggleRight, BarChart2, Trash2, Info } from "lucide-react";
import { adsAPI } from "../../services/api";
import type { Ad } from "../../types";

const Ads = () => {
	const [ads, setAds] = useState<Ad[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadAds();
	}, []);

	const loadAds = async () => {
		try {
			setLoading(true);
			const response = await adsAPI.getAll();
			setAds(response.data);
		} catch (error) {
			console.error("Erreur lors du chargement des pubs:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleToggleActive = async (id: number) => {
		try {
			await adsAPI.toggleActive(id);
			loadAds();
		} catch (error) {
			console.error("Erreur lors du toggle de la pub:", error);
			alert("Erreur lors de la modification du statut");
		}
	};

	const handleDeleteAd = async (id: number) => {
		if (window.confirm("Supprimer cette pub ?")) {
			try {
				await adsAPI.delete(id);
				loadAds();
			} catch (error) {
				console.error("Erreur suppression pub:", error);
				alert("Erreur lors de la suppression");
			}
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center py-20">
				<div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full" />
			</div>
		);
	}

	// Calcul du CTR moyen
	const averageCTR =
		ads.length > 0
			? ads.reduce((sum, a) => {
					const impressions = a.impressions ?? 0;
					const clicks = a.clicks ?? 0;
					const ctr = impressions > 0 ? clicks / impressions : 0;
					return sum + ctr;
				}, 0) / ads.length
			: 0;

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h2 className="text-2xl font-bold">
						Gestion des Publicités
					</h2>
					<p className="text-gray-500 mt-1">
						{ads.length} publicités
					</p>
				</div>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<StatCard
					label="Total pubs"
					value={ads.length}
					icon={<BarChart2 />}
				/>
				<StatCard
					label="Pubs actives"
					value={ads.filter((a) => a.is_active).length}
					icon={<ToggleRight />}
				/>
				<StatCard
					label="CTR moyen"
					value={`${(averageCTR * 100).toFixed(1)} %`}
					icon={<BarChart2 />}
				/>
			</div>

			{/* Ads Table */}
			<div className="bg-white rounded-xl shadow overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50 border-b">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Titre
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Type
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Plateforme
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Statut
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Impressions
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								Clics
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
								CTR
							</th>
							<th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{ads.map((ad) => {
							const impressions = ad.impressions ?? 0;
							const clicks = ad.clicks ?? 0;
							const ctr =
								impressions > 0
									? ((clicks / impressions) * 100).toFixed(1)
									: "0";

							return (
								<tr key={ad.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 font-medium">
										{ad.title}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600 capitalize">
										{ad.type}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{ad.platform}
									</td>
									<td className="px-6 py-4">
										<button
											onClick={() =>
												handleToggleActive(ad.id)
											}
											className={`flex items-center gap-1 text-sm font-semibold ${
												ad.is_active
													? "text-green-600"
													: "text-red-600"
											}`}>
											{ad.is_active
												? "✓ Actif"
												: "✗ Inactif"}
										</button>
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{impressions.toLocaleString()}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{clicks.toLocaleString()}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{ctr} %
									</td>
									<td className="px-6 py-4 text-right">
										<button
											onClick={() =>
												handleDeleteAd(ad.id)
											}
											className="p-2 hover:bg-red-50 rounded text-red-600">
											<Trash2 size={16} />
										</button>
									</td>
								</tr>
							);
						})}
						{ads.length === 0 && (
							<tr>
								<td
									colSpan={8}
									className="text-center py-10 text-gray-500">
									<Info className="inline mr-2" /> Aucune
									publicité pour le moment.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

function StatCard({
	label,
	value,
	icon
}: {
	label: string;
	value: number | string;
	icon: ReactNode;
}) {
	return (
		<div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
			<div className="text-indigo-600">{icon}</div>
			<div>
				<p className="text-sm text-gray-500">{label}</p>
				<p className="text-2xl font-bold">{value}</p>
			</div>
		</div>
	);
}

export default Ads;
