import { useState, useEffect } from "react";
import { MiniTable } from "../../components/Minitable";
import { PieChartComponent } from "../../components/PieChart";
import { moviesAPI } from "../../services/api";
import type { Movie } from "../../types";

const MoviesPage = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(true);
	const [totalMovies, setTotalMovies] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		loadMovies();
	}, [currentPage]);

	const loadMovies = async () => {
		try {
			setLoading(true);
			const response = await moviesAPI.getAll(currentPage, 20);
			setMovies(response.data.movies);
			setTotalMovies(response.data.total);
		} catch (error) {
			console.error("Erreur lors du chargement des films:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteMovie = async (id: number) => {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
			try {
				await moviesAPI.delete(id);
				loadMovies(); // Recharger la liste
			} catch (error) {
				console.error("Erreur lors de la suppression:", error);
				alert("Erreur lors de la suppression du film");
			}
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin h-12 w-12 border-b-2 border-indigo-600 rounded-full" />
			</div>
		);
	}

	// Pie chart des films par genre
	const genrePieData = Object.entries(
		movies.reduce(
			(acc, movie) => {
				const genre = movie.genre || "Inconnu";
				acc[genre] = (acc[genre] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>
		)
	).map(([name, value]) => ({ name, value }));

	// Formater les données pour la table
	const formattedMovies = movies.map((movie) => ({
		id: movie.id,
		title: movie.title,
		genre: movie.genre || "N/A",
		release: movie.release_date
			? new Date(movie.release_date).toLocaleDateString("fr-FR")
			: "N/A",
		rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
		status: movie.adult ? "🔞 Adulte" : "Tout public"
	}));

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-800">
						Gestion des Films
					</h1>
					<p className="text-gray-500 mt-1">
						{totalMovies} films au total
					</p>
				</div>
			</div>

			{/* MiniTable des films */}
			<MiniTable
				title={`Films (Page ${currentPage})`}
				columns={[
					{ header: "Titre", key: "title" },
					{ header: "Genre", key: "genre" },
					{ header: "Sortie", key: "release" },
					{ header: "Note", key: "rating" },
					{ header: "Statut", key: "status" }
				]}
				data={formattedMovies}
				actions={(row) => (
					<div className="flex gap-2">
						<button
							className="text-red-600 hover:underline"
							onClick={() => handleDeleteMovie(row.id)}>
							Supprimer
						</button>
					</div>
				)}
			/>

			{/* Pagination */}
			<div className="flex justify-center gap-2 mt-4">
				<button
					onClick={() =>
						setCurrentPage((prev) => Math.max(1, prev - 1))
					}
					disabled={currentPage === 1}
					className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-300">
					Précédent
				</button>
				<span className="px-4 py-2">
					Page {currentPage} / {Math.ceil(totalMovies / 20)}
				</span>
				<button
					onClick={() => setCurrentPage((prev) => prev + 1)}
					disabled={currentPage >= Math.ceil(totalMovies / 20)}
					className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-300">
					Suivant
				</button>
			</div>

			{/* Pie chart des films par genre */}
			{genrePieData.length > 0 && (
				<PieChartComponent
					data={genrePieData}
					title="Répartition des films par genre"
				/>
			)}
		</div>
	);
};

export default MoviesPage;
