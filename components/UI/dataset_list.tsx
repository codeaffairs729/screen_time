import Dataset from "models/dataset.model.v4";
import DatasetCard from "./dataset_card";

interface DatasetsListProps {
    datasets: Dataset[];
}

const DatasetList = ({
    datasets,
    onFavourite,
    handleBookmark,
    handleShare,
}: any) => {
    return datasets?.map((dataset: Dataset, index: number) => {
        const data = {
            id: dataset.id,
            title: dataset.detail.name,
            description: dataset.detail.description,
            dataQuality: dataset.detail.dataQuality,
            buttonTags: ["open"],
            topics: dataset.detail.topics,
            domains:
                typeof dataset.detail.domain === "string"
                    ? [dataset.detail.domain]
                    : dataset.detail.domain, //Some dataset are fetching from older version api need to update it in future
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
                onFavourite={onFavourite}
                handleBookmark={handleBookmark}
                handleShare={handleShare}
            />
        );
    });
};

export default DatasetList;
