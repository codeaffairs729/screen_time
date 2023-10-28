import Header from "./components/data_files_header";
import Row from "./components/data_files_row";
import Dataset, { DatasetUrl } from "models/dataset.model.v4";
import { useContext, useEffect } from "react";
import clsx from "clsx";

const DataFilesSection = ({
    dataset,
    className = "",
}: {
    dataset: Dataset;
    className?: string;
}) => {
    // const vm = useContext(DatasetDetailVMContext);
    // const dataset = vm.dataset;
    useEffect(() => {
        console.log("dataset", dataset);
    }, [dataset]);

    if (!dataset) {
        return <div />;
    }

    return (
        <div
            className={clsx(
                "bg-white sm:px-8 px-4 sm:py-4 py-2 shadow overflow-x-auto",
                className
            )}
        >
            <h4 className="font-semibold mb-2">
                Data Files({dataset.urls?.length ?? 0})
            </h4>
            <p className="mb-1 font-normal text-sm text-dtech-main-grey">
                All the data files available for this dataset are listed in the
                table below.
            </p>
            <table className="table-fixed border-separate border-spacing-0.5 w-full min-w-[640px]">
                <Header
                    columns={["Name", "Format", "Size", "Download", "Preview"]}
                />
                <tbody>
                    {dataset?.urls?.map((dataFile: DatasetUrl, i: number) => (
                        <Row key={dataFile.id} dataFile={dataFile} dataset={dataset} />
                    ))}
                    {dataset?.urls.length < 1 && (
                        <td colSpan={5} className="text-gray-800 text-sm">
                            No data files found
                        </td>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataFilesSection;
