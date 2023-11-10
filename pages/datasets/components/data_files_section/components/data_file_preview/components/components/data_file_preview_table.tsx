import clsx from "clsx";

const DataFilePreviewTable = ({
    columns,
    data,
    index,
    className
}: {
    columns: string[];
    data: string[][];
    index: string[];
    className?: string;
}) => {
    return (
        <table className={clsx("w-full table-auto", className)}>
            <THead columns={columns} />
            <TBody data={data} index={index} />
        </table>
    );
};

const THead = ({ columns }: { columns: string[] }) => {
    return (
        <>
            <thead>
                <tr className="bg-dtech-dark-teal shadow-md shadow-gray-400 pb-2">
                    {columns.map((column) => {
                        return (
                            <th key={column} className="pb-1">
                                <span className="block w-full text-center text-white  font-medium py-2">
                                    {column}
                                </span>
                            </th>
                        );
                    })}
                </tr>
            </thead>
        </>
    );
};

const TBody = ({ data, index }: { data: string[][]; index: string[] }) => {
    return (
        <tbody>
            {data.map((row, i) => {
                const tdClass =
                    "border-4 border-gray-200 text-center break-words align-top px-5 py-4";
                return (
                    <tr key={i}>
                        <td className={clsx(tdClass, "min-w-[100px]")}>
                            {index[i]}
                        </td>
                        {row.map((column, i) => {
                            return (
                                <td
                                    className={clsx(
                                        tdClass,
                                        column?.length < 20 && "min-w-[100px]",
                                        (column?.length >= 10 && column?.length < 30) && "whitespace-nowrap",
                                        column?.length >= 30 && "min-w-[350px]"
                                    )}
                                    key={i}
                                >
                                    {column}
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default DataFilePreviewTable;
