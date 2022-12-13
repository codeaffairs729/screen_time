import Dataset from "models/dataset.model";

const Table = ({ tableHeaders, tableData }: any) => {
    return (
        <div className="my-4">
            <table className="bg-dtech-light-grey text-left" cellPadding={3}>
                <tr className="border border-dtech-middle-grey p-3">
                    {tableHeaders.map((header: any, index: number) => (
                        <th className="text-dtech-dark-grey text-[17px] font-medium	p-3 pb-4">
                            {header}
                        </th>
                    ))}
                </tr>
                {["", "", ""].map((_, index) => (
                    <tr
                        key={index}
                        className="py-2 border border-dtech-middle-grey"
                    >
                        <td className="px-3 flex">{tableData[0][index]}</td>
                        <td className="px-3">
                            <div>
                                <span className="text-sm font-medium text-dtech-dark-grey">
                                    {tableData[1][index].title}
                                </span>
                                <span className="text-sm text-dtech-dark-grey limit-line">
                                    {tableData[1][index].description}
                                </span>
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default Table;
