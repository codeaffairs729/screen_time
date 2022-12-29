import Dataset from "models/dataset.model.v4";
import { datasetToResultCardData } from "pages/search/search.vm";
import ResultCard, { Data } from "./result_card";

const DatasetList = ({
    datasets,
    onFavourite,
    handleBookmark,
    handleShare,
}: any) => {
    const recordsData = datasetToResultCardData(datasets);

    return (
        <div className="flex flex-col" data-test-id="results table">
            {recordsData?.map((data) => (
                <ResultCard
                    key={data.id}
                    data={data}
                    onFavourite={onFavourite}
                    handleBookmark={handleBookmark}
                    handleShare={handleShare}
                />
            ))}
        </div>
    );
};

export default DatasetList;
