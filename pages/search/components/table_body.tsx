import DatasetCard from "components/UI/dataset_card";
import DatasetRow from "components/UI/dataset_row.v4";
import Dataset from "models/dataset.model.v4";
import { useContext } from "react";
import { SearchVMContext } from "../search.vm";
// import DatasetRowDisplay from "components/UI/dataset_row_display";

const TableBody = () => {
    const vm = useContext(SearchVMContext);

    if (vm.isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {vm.datasets?.map((dataset: Dataset, i) => {
                const data = {
                    title: dataset.detail.name,
                    description: dataset.detail.description,
                    dataQuality: dataset.detail.dataQuality,
                    buttonTags: ["open"],
                    topics: dataset.detail.topics,
                    domains: dataset.detail.domain,
                };
                const dataProviders = {
                    organisation: dataset.owner.organisation,
                    hostName: dataset.detail.hostName,
                };
                return (
                    <DatasetCard
                        key={dataset.id}
                        href={`/datasets/${dataset.id}`}
                        data={data}
                        lastUpdate={dataset.detail.lastUpdate}
                        dataProviders={dataProviders}
                        onFavourite={() => {}}
                        handleBookmark={() => {}}
                        handleShare={() => {}}
                    />
                );
            })}
        </>
    );
};

export default TableBody;
