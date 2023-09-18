// import Dataset from "models/dataset.model.v4";
// import { datasetToResultCardData } from "pages/search/search.vm";
import { datasetToResultCardData } from "common/utils/datasets.util";
import ResultCard, { Data } from "./result_card";

const   DatasetList = ({ stats, datasets }: any) => {
    const recordsData = datasetToResultCardData(datasets, stats);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white" data-test-id="results table">
            {recordsData?.map((data,index) => (
                <div className=" lg:ml-8" key={index}>
                    <ResultCard key={data.id} data={data} hideResultCard={true} showToolTip={false} />
                </div>
            ))}
        </div>
    );
};

export default DatasetList;
