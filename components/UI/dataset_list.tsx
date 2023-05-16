// import Dataset from "models/dataset.model.v4";
// import { datasetToResultCardData } from "pages/search/search.vm";
import { datasetToResultCardData } from "common/utils/datasets.util";
import ResultCard, { Data } from "./result_card";

const DatasetList = ({ stats, datasets }: any) => {
    const recordsData = datasetToResultCardData(datasets, stats);

    return (
        <div className="flex flex-col" data-test-id="results table">
            {recordsData?.map((data) => (
                <ResultCard key={data.id} data={data} />
            ))}
        </div>
    );
};

export default DatasetList;
