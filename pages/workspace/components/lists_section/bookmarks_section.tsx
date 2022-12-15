import Loader from "components/UI/loader";
import DatasetRowDisplay from "components/UI/data_row_display";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useHttpCall } from "common/hooks";
import DatasetStats from "models/dataset_stats.model";
import Http from "common/http";
import { useEffect } from "react";
import DatasetRow from "components/UI/dataset_row.v4";

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

    return (
        <div>
            {bookmarkItemsData?.map((dataset: any) => (
                <div key={dataset.id}>
                    {datasetIDS.includes(dataset.id) && (
                        // <DatasetRowDisplay
                        //     key={dataset.id}
                        //     dataset={dataset}
                        //     displayContext={"favorite-item"}
                        // />
                        <DatasetRow
                            datasetStats={stats[dataset.id]}
                            isLoadingStats={isFetchingStats}
                            key={dataset.id}
                            dataset={dataset}
                            displayContext={"favorite-item"}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default BookmarksSection;
