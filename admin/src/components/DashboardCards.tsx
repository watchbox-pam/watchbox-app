import React from "react";
import {
	Users,
	UserPlus,
	Shield,
	Database,
	TrendingUp,
	Eye,
	MousePointerClick,
	Percent,
	Calendar,
	Clock
} from "lucide-react";

type CardProps = {
	title: string;
	value: string | number;
	color?: string;
	icon?: string;
};

const iconMap: { [key: string]: React.ElementType } = {
	users: Users,
	userPlus: UserPlus,
	shield: Shield,
	database: Database,
	trendingUp: TrendingUp,
	eye: Eye,
	click: MousePointerClick,
	percent: Percent,
	calendar: Calendar,
	clock: Clock
};

const colorVariants: { [key: string]: string } = {
	"bg-green-50": "from-green-500 to-emerald-600",
	"bg-blue-50": "from-blue-500 to-indigo-600",
	"bg-purple-50": "from-purple-500 to-violet-600",
	"bg-gray-50": "from-gray-500 to-slate-600",
	"bg-indigo-50": "from-indigo-500 to-blue-600",
	"bg-indigo-100": "from-indigo-600 to-purple-600",
	"bg-indigo-200": "from-violet-500 to-purple-600",
	"bg-blue-200": "from-cyan-500 to-blue-600"
};

export const DashboardCard = ({
	title,
	value,
	color = "bg-white",
	icon
}: CardProps) => {
	const IconComponent = icon ? iconMap[icon] : TrendingUp;
	const gradient = colorVariants[color] || "from-indigo-500 to-purple-600";

	return (
		<div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
			{/* Gradient background decoratif */}
			<div
				className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}
			/>

			<div className="relative p-6">
				{/* Header avec icône */}
				<div className="flex items-start justify-between mb-4">
					<div
						className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
						<IconComponent className="w-6 h-6 text-white" />
					</div>
					<div
						className={`px-3 py-1 rounded-full bg-gradient-to-r ${gradient} opacity-10`}
					/>
				</div>

				{/* Contenu */}
				<div className="space-y-1">
					<p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
						{title}
					</p>
					<p
						className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
						{value}
					</p>
				</div>

				{/* Barre de décoration en bas */}
				<div
					className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-current to-transparent transition-all duration-500 rounded-full opacity-30"
					style={{
						background: `linear-gradient(to right, transparent, currentColor, transparent)`
					}}
				/>
			</div>

			{/* Effet de brillance au hover */}
			<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000" />
		</div>
	);
};
