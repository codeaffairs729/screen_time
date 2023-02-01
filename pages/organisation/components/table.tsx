import Dataset from "models/dataset.model";
import clsx from "clsx";
import InfoAlert from "components/UI/alerts/info_alert";

const Table = ({
    tableHeaders,
    tableData,
    headerClass = "",
    tableClass = "",
    tableBodyClasses = "",
    cellPadding,
    onScrollEnd,
    tableRow,
}: any) => {
    if (!tableData.length) {
        return <InfoAlert message="There is no data to show" className="mt-1 ml-20 mr-32" messageClassName="ml-56 font-semibold !text-lg !text-blue-800" divClassName="flex flex-row" />;
    }
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
                                    "text-dtech-dark-grey text-[17px] font-medium p-3 pb-4 capitalize",
                                    headerClass
                                )}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={tableBodyClasses} onScroll={onScrollEnd}>
                    {tableData.map((data: any, index: any) => (
                        <tr
                            key={index}
                            className="py-2 border border-dtech-middle-grey"
                        >
                            {data?.map((col: any, index: number) => (
                                <td
                                    key={index}
                                    className={clsx(
                                        `px-3 ${!index && "flex"}`,
                                        tableRow
                                    )}
                                >
                                    {col}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
