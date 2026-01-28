import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	LineChart,
	Line
} from "recharts";

type ActiveUsersChartProps = {
	data: { label: string; value: number }[];
	type?: "bar" | "line";
	title?: string;
};

export const ActiveUsersChart = ({
	data,
	type = "bar",
	title = "Utilisateurs actifs"
}: ActiveUsersChartProps) => {
	return (
		<div className="bg-white shadow rounded-lg p-4 mb-6">
			{title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
			<ResponsiveContainer width="100%" height={250}>
				{type === "bar" ? (
					<BarChart
						data={data}
						margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="label" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="value" fill="#6366F1" />
					</BarChart>
				) : (
					<LineChart
						data={data}
						margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="label" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="value"
							stroke="#6366F1"
							strokeWidth={3}
						/>
					</LineChart>
				)}
			</ResponsiveContainer>
		</div>
	);
};
