// import Dataset from "models/dataset.model.v4";
// import { datasetToResultCardData } from "pages/search/search.vm";
import { datasetToResultCardData } from "common/utils/datasets.util";
import ResultCard from "./result_card";


const DatasetList = ({ stats, datasets }: any) => {
    const recordsData = datasetToResultCardData(datasets, stats);

    return (
        <div
            // className="grid grid-cols-1 lg:grid-cols-2 bg-white"
            className="bg-white"
            data-test-id="results table"
        >
            {recordsData?.map((data, index) => (
                <div className="" key={index}>
                    <ResultCard
                        key={data.id}
                        data={data}
                        // hideResultCard={true}
                        className=" md:!pr-0 !py-0 !border-r-0 !rounded-lg !bg-white !shadow-md !p-4"
                        showToolTip={false}
                        pageName="workspace"
                        label="datasets"
                    />
                </div>
            ))}
        </div>
    );
};

export default DatasetList;
