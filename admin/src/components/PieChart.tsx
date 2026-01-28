import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	Legend
} from "recharts";

type PieChartProps = {
	data: { name: string; value: number }[];
	colors?: string[];
	title?: string;
	width?: number | string;
	height?: number | string;
};

const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		const total = payload[0].payload.percent || 0;
		return (
			<div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-700">
				<p className="font-semibold text-sm mb-1">{payload[0].name}</p>
				<p className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
					{payload[0].value}
				</p>
				<p className="text-xs text-gray-400 mt-1">
					{(total * 100).toFixed(1)}%
				</p>
			</div>
		);
	}
	return null;
};

const CustomLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent
}: any) => {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	if (percent < 0.05) return null; // Ne pas afficher les petits pourcentages

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
			className="font-bold text-sm drop-shadow-lg">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const CustomLegend = ({ payload }: any) => {
	return (
		<div className="flex flex-wrap justify-center gap-3 mt-4">
			{payload.map((entry: any, index: number) => (
				<div
					key={`legend-${index}`}
					className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
					<div
						className="w-3 h-3 rounded-full shadow-md"
						style={{ backgroundColor: entry.color }}
					/>
					<span className="text-sm font-medium text-gray-700">
						{entry.value}
					</span>
				</div>
			))}
		</div>
	);
};

export const PieChartComponent = ({
	data,
	colors,
	title,
	width = "100%",
	height = 300
}: PieChartProps) => {
	const defaultColors = [
		"#6366F1", // Indigo
		"#8B5CF6", // Violet
		"#EC4899", // Pink
		"#10B981", // Green
		"#F59E0B", // Amber
		"#3B82F6" // Blue
	];
	const chartColors = colors || defaultColors;

	// Calculer les pourcentages
	const total = data.reduce((sum, entry) => sum + entry.value, 0);
	const dataWithPercent = data.map((entry) => ({
		...entry,
		percent: entry.value / total
	}));

	return (
		<div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-6 mb-6 border border-gray-100">
			{title && (
				<div className="mb-4">
					<h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
						{title}
					</h3>
					<div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-2" />
				</div>
			)}
			<ResponsiveContainer width={width} height={height}>
				<PieChart>
					<defs>
						{chartColors.map((color, index) => (
							<linearGradient
								key={`gradient-${index}`}
								id={`gradient-${index}`}
								x1="0"
								y1="0"
								x2="0"
								y2="1">
								<stop
									offset="0%"
									stopColor={color}
									stopOpacity={1}
								/>
								<stop
									offset="100%"
									stopColor={color}
									stopOpacity={0.8}
								/>
							</linearGradient>
						))}
					</defs>
					<Pie
						data={dataWithPercent}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={100}
						paddingAngle={2}
						label={CustomLabel}
						animationBegin={0}
						animationDuration={1000}>
						{dataWithPercent.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={`url(#gradient-${index % chartColors.length})`}
								stroke="#fff"
								strokeWidth={2}
								style={{
									filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
									cursor: "pointer"
								}}
							/>
						))}
					</Pie>
					<Tooltip content={<CustomTooltip />} />
					<Legend content={<CustomLegend />} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};
