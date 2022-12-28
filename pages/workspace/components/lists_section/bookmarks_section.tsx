import Loader from "components/UI/loader";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useHttpCall } from "common/hooks";
import DatasetStats from "models/dataset_stats.model";
import Http from "common/http";
import { useEffect } from "react";
import DatasetList from "components/UI/dataset_list";

const BookmarksSection = ({ datasetIDS }: { datasetIDS: any }) => {
    const bookmarkItemsData = useSelector(
        (state: RootState) => state.user.bookmarkItemsData
    );

    const {
        execute: excuteFectchStats,
        data: stats,
        isLoading: isFetchingStats,
    } = useHttpCall<{ [key: string]: any }>({});
    const fectchStats = (ids: number[]) =>
        excuteFectchStats(
            () =>
                Http.post("/v1/datasets/stats", {
                    meta_dataset_ids: ids,
                }),
            {
                postProcess: (res) => {
                    const o: { [key: string]: DatasetStats } = {};
                    Object.keys(res).map(
                        (id) =>
                            (o[id] = DatasetStats.fromJson({
                                ...res[id],
                                dataset_id: id,
                            }))
                    );
                    return o;
                },
            }
        );

    useEffect(() => {
        console.log("datasetIDS", datasetIDS);

        if (datasetIDS.length) {
            fectchStats(datasetIDS);
        }
    }, [datasetIDS]);

    if (datasetIDS.length == 0) {
        return (
            <div className="w-full flex items-center justify-center">
                <p>No datasets bookmarked here.</p>
            </div>
        );
    }

    const datasets = bookmarkItemsData?.filter((dataset: any) =>
        datasetIDS.includes(dataset.id)
    );

    return (
        <div>
            <DatasetList
                datasets={datasets}
                onFavourite={() => {}}
                handleBookmark={() => {}}
                handleShare={() => {}}
            />
        </div>
    );
};

export default BookmarksSection;
