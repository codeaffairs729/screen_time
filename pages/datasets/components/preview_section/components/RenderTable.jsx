import React from "react";

export default function RenderTable({ tableData }) {
    return (
        <table className="w-full table-auto overflow-x-auto overflow-y-auto overflow-scroll block whitespace-nowrap">
            <thead className="text-xs bg-gray-200">
                <tr>
                    <th
                        key={0}
                        className="font-normal px-2 py-1 border-[1px]"
                    ></th>
                    {tableData.columns.map((col, idx) => (
                        <th
                            key={idx + 1}
                            className="font-normal px-2 py-1 border-[1px]"
                        >
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="text-xs text-gray-600">
                {tableData.rows.map((row, idx) => (
                    <tr key={idx}>
                        <td
                            key={0}
                            className="text-xs bg-gray-200 px-2 py-1 border-[1px]"
                        >
                            {row}
                        </td>
                        {tableData.columns.map((col, idx) => (
                            <td
                                key={idx + 1}
                                className="px-2 py-1 border-[1px]"
                            >
                                {tableData.data[row][col]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        // <p>He</p>
    );
}
