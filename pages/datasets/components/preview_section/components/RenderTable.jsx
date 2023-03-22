import React from "react";

export default function RenderTable({ tableData, id }) {
    return (
        <div className="max-w-[998px] overflow-x-scroll">
            <table id={id} className=" border-solid w-full  ">
                <thead className="">
                    <tr className="">
                        <th key={0} className="w-1/5  bg-fuchsia-800   "></th>
                        {tableData.columns.map((col, idx) => (
                            <td
                                key={idx + 1}
                                className=" w-1/5  bg-fuchsia-800 text-white text-center "
                            >
                                {col}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody className=" w-1/5  bg-slate-300 ">
                    {tableData.rows.map((row, idx) => (
                        <tr
                            key={idx}
                            className="border-2 bg-white text-center hover:bg-slate-300"
                        >
                            <td key={0} className=" ">
                                {row}
                            </td>
                            {tableData.columns.map((col, idx) => (
                                <td key={idx + 1} className="">
                                    {tableData.data[row][col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
