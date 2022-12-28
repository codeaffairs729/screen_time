import Dataset from "models/dataset.model";
import clsx from "clsx";

const Table = ({
    tableHeaders,
    tableData,
    headerClass,
    tableClass,
    cellPadding,
    tableRow,
}: any) => {
    return (
        <div className="my-4">
            <table
                className={clsx("bg-dtech-light-grey text-left", tableClass)}
                cellPadding={cellPadding}
            >
                <thead>
                    <tr className="border border-dtech-middle-grey p-3">
                        {tableHeaders.map((header: any, index: number) => (
                            <th
                                key={index}
                                className={clsx(
                                    "text-dtech-dark-grey text-[17px] font-medium p-3 pb-4",
                                    headerClass
                                )}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data: any, index: any) => (
                        <tr
                            key={index}
                            className="py-2 border border-dtech-middle-grey"
                        >
                            <td className={clsx("px-3 flex", tableRow)}>
                                {tableData[index][1]}
                            </td>
                            <td className={clsx("px-3", tableRow)}>
                                {tableData[index][2]}
                            </td>
                            <td className={clsx("px-3", tableRow)}>
                                {tableData[index][3]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
