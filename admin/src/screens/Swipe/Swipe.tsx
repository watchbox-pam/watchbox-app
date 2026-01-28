import { useEffect, useState } from "react";
import { AlertTriangle, ThumbsUp, ThumbsDown, Clock } from "lucide-react";
import { swipeAPI } from "../../services/api";
import type { SwipeStats, ProblematicMovie, SwipeRule } from "../../types";

export default function Swipe() {
	const [stats, setStats] = useState<SwipeStats | null>(null);
	const [problematicMovies, setProblematicMovies] = useState<
		ProblematicMovie[]
	>([]);
	const [rules, setRules] = useState<SwipeRule[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadSwipeData();
	}, []);

	const loadSwipeData = async () => {
		try {
			setLoading(true);
			const [statsRes, moviesRes, rulesRes] = await Promise.all([
				swipeAPI.getStats().catch(() => ({ data: null })),
				swipeAPI.getProblematicMovies().catch(() => ({ data: [] })),
				swipeAPI.getRules().catch(() => ({ data: [] }))
			]);

			setStats(statsRes.data);
			setProblematicMovies(moviesRes.data);
			setRules(rulesRes.data);
		} catch (error) {
			console.error(
				"Erreur lors du chargement des données swipe:",
				error
			);
		} finally {
			setLoading(false);
		}
	};

	const handleRuleToggle = async (ruleId: string, currentValue: boolean) => {
		try {
			await swipeAPI.updateRule(ruleId, !currentValue);
			loadSwipeData();
		} catch (error) {
			console.error("Erreur lors de la mise à jour de la règle:", error);
			alert("Erreur lors de la mise à jour de la règle");
		}
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
			<h2 className="text-2xl font-bold mb-6">
				Swipe – Monitoring & Contrôle
			</h2>

			{/* Global stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				<StatCard
					icon={<ThumbsUp />}
					label="Likes"
					value={
						stats ? `${stats.like_percentage.toFixed(1)} %` : "0 %"
					}
				/>
				<StatCard
					icon={<ThumbsDown />}
					label="Dislikes"
					value={
						stats
							? `${stats.dislike_percentage.toFixed(1)} %`
							: "0 %"
					}
				/>
				<StatCard
					icon={<Clock />}
					label="Temps moyen"
					value={stats ? `${stats.average_time.toFixed(1)} s` : "0 s"}
				/>
				<StatCard
					icon={<AlertTriangle />}
					label="Films à risque"
					value={stats ? stats.problematic_count : 0}
				/>
			</div>

			{/* Problematic movies */}
			<div className="bg-white rounded-xl shadow mb-8">
				<div className="p-4 border-b">
					<h3 className="font-semibold">
						Films détectés comme problématiques
					</h3>
					<p className="text-sm text-gray-500">
						Films avec un taux de rejet ou d'acceptation anormal
					</p>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50 border-b">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
									Film
								</th>
								<th className="text-left text-xs font-semibold text-gray-600">
									Like %
								</th>
								<th className="text-left text-xs font-semibold text-gray-600">
									Dislike %
								</th>
								<th className="text-left text-xs font-semibold text-gray-600">
									Statut
								</th>
								<th className="px-6 text-right text-xs font-semibold text-gray-600">
									Action
								</th>
							</tr>
						</thead>
						<tbody className="divide-y">
							{problematicMovies.map((movie) => (
								<tr key={movie.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 font-medium">
										{movie.title}
									</td>
									<td className="text-green-600">
										{movie.like_percentage.toFixed(1)} %
									</td>
									<td className="text-red-600">
										{movie.dislike_percentage.toFixed(1)} %
									</td>
									<td>
										<span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
											{movie.status}
										</span>
									</td>
									<td className="px-6 text-right">
										<button className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200">
											Exclure du swipe
										</button>
									</td>
								</tr>
							))}
							{problematicMovies.length === 0 && (
								<tr>
									<td
										colSpan={5}
										className="text-center py-10 text-gray-500">
										Aucun film problématique détecté
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Global rules */}
			<div className="bg-white rounded-xl shadow p-6">
				<h3 className="font-semibold mb-4">Règles globales du swipe</h3>
				<div className="space-y-4">
					{rules.length > 0 ? (
						rules.map((rule) => (
							<RuleToggle
								key={rule.id}
								label={rule.label}
								checked={rule.enabled}
								onChange={() =>
									handleRuleToggle(rule.id, rule.enabled)
								}
							/>
						))
					) : (
						<>
							<RuleToggle
								label="Exclure les films déjà vus"
								checked={false}
								onChange={() => {}}
							/>
							<RuleToggle
								label="Exclure les films déjà notés"
								checked={false}
								onChange={() => {}}
							/>
							<RuleToggle
								label="Respect strict du filtre adulte"
								checked={true}
								onChange={() => {}}
							/>
							<RuleToggle
								label="Délai minimum avant swipe (anti-random)"
								checked={true}
								onChange={() => {}}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

function StatCard({
	icon,
	label,
	value
}: {
	icon: any;
	label: string;
	value: number | string;
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

function RuleToggle({
	label,
	checked,
	onChange
}: {
	label: string;
	checked: boolean;
	onChange: () => void;
}) {
	return (
		<div className="flex items-center justify-between">
			<span className="text-sm text-gray-700">{label}</span>
			<input
				type="checkbox"
				className="h-5 w-5 cursor-pointer"
				checked={checked}
				onChange={onChange}
			/>
		</div>
	);
}
