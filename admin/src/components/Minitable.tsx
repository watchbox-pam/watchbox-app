import React from "react";

type Column = { header: string; key: string };

type MiniTableProps = {
	title: string;
	columns: Column[];
	data: any[];
	actions?: (row: any) => React.ReactNode;
};

export const MiniTable = ({
	title,
	columns,
	data,
	actions
}: MiniTableProps) => {
	return (
		<div className="bg-white shadow rounded-lg overflow-x-auto mb-6">
			<div className="px-4 py-3 border-b flex justify-between items-center">
				<h3 className="text-lg font-bold">{title}</h3>
			</div>
			<table className="min-w-full">
				<thead className="bg-gray-50 border-b">
					<tr>
						{columns.map((col) => (
							<th
								key={col.key}
								className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
								{col.header}
							</th>
						))}
						{actions && (
							<th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase">
								Actions
							</th>
						)}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{data.map((row) => (
						<tr key={row.id} className="hover:bg-gray-50">
							{columns.map((col) => (
								<td
									key={col.key}
									className="px-4 py-2 text-sm text-gray-700">
									{row[col.key]}
								</td>
							))}
							{actions && (
								<td className="px-4 py-2 text-right">
									{actions(row)}
								</td>
							)}
						</tr>
					))}
					{data.length === 0 && (
						<tr>
							<td
								colSpan={columns.length + (actions ? 1 : 0)}
								className="text-center py-6 text-gray-500">
								Aucun élément à afficher.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
