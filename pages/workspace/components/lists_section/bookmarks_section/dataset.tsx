import Loader from "components/UI/loader";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useHttpCall } from "common/hooks";
import DatasetStats from "models/dataset_stats.model";
import Http from "common/http";
import { useEffect } from "react";
import DatasetList from "components/UI/dataset_list";
import SearchVM from "pages/search/search.vm";
import { datasetToResultCardData } from "common/utils/datasets.util";

const DatasetBookmarksSection = ({ datasetIDS }: { datasetIDS: any }) => {
    const bookmarkItemsData = useSelector(
        (state: RootState) => state.user.bookmarkItemsData
    );
    const { fectchStats, stats, isFetchingStats } = SearchVM();

    useEffect(() => {
        if (datasetIDS.length) {
            fectchStats(datasetIDS.filter((id: any) => id));
        }
    }, [datasetIDS]);

    const datasets = bookmarkItemsData?.datasets?.filter((dataset: any) =>
        datasetIDS.includes(dataset.id)
    );

    if (isFetchingStats) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            <DatasetList datasets={datasets} stats={stats} />
        </div>
    );
};

export default DatasetBookmarksSection;
