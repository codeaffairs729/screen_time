import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import Dataset from "models/dataset.model.v4";
import { ReactNode, useContext} from "react";
import useSWR from "swr";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import DatasetStats from "models/dataset_stats.model";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import DatasetList from "components/UI/dataset_list";
import SearchVM from "pages/search/search.vm";
import { Tab } from "@headlessui/react";

const TabHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Tab
            className={({ selected }) =>
                ` text-xl font-normal px-3 py-1 mx-5 ${
                    selected
                        ? "text-dtech-main-dark underline underline-offset-8 border-none"
                        : ""
                }`
            }
        >
            {children}
        </Tab>
    );
};
const MayAlsoLike = () => {
    const { dataset } = useContext(DatasetDetailVMContext);
    // const [isLoadingStats, setIsLoadingStats] = useState(false);
    /**
     * Fetch stats for datasets to highlight favourite status
     */
    const { fectchStats, stats, isFetchingStats } = SearchVM();

    // const searchTerm = dataset?.detail.topics
    //     .slice(0, 5)
    //     .filter((t) => t)
    //     .map((t) => encodeURIComponent(t))
    //     .join(",");
    // const { data: datasets, error } = useSWR(
    //     `${process.env.NEXT_PUBLIC_PUBLIC_API_ROOT}/v4/datasets/?search_query=${searchTerm}&page_size=20&page_num=1`,
    //     (url: string) =>
    //         fetch(url)
    //             .then((res) => res.json())
    //             .then((res) => {
    //                 const datasets = Dataset.fromJsonList(
    //                     res[0]["user_search"][0]["results"]
    //                         .slice(0, 10)
    //                         .filter((ds: any) => ds["id"] != dataset?.["id"])
    //                 );
    //                 const datasetIds = datasets
    //                     .filter((id: any) => id)
    //                     .map((dataset) => dataset.id);
    //                 if (datasetIds.length) {
    //                     fectchStats(datasetIds);
    //                 }
    //                 return datasets;
    //             })
    // );
    const { data: datasetsByCategory, error: errorByCategory } = useSWR(
        `${process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT}/v5/datasets/related-by-jaccard-similarity/7`,
        (url: string) =>
            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    const datasets = Dataset.fromJsonList(
                        res[0]["user_search"][0]["results"]
                            .slice(0, 10)
                            .filter((ds: any) => ds["id"] != dataset?.["id"])
                    );
                    const datasetIds = datasets
                        .filter((id: any) => id)
                        .map((dataset) => dataset.id);
                    if (datasetIds.length) {
                        fectchStats(datasetIds);
                    }
                    return datasets;
                })
    );
    const { data: datasetsByDescription, error: errorByDescription } = useSWR(
        `${process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT}/v5/datasets/related-by-semantic-similarity/7`,
        (url: string) =>
            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    const datasets = Dataset.fromJsonList(
                        res[0]["user_search"][0]["results"]
                            .slice(0, 10)
                            .filter((ds: any) => ds["id"] != dataset?.["id"])
                    );
                    const datasetIds = datasets
                        .filter((id: any) => id)
                        .map((dataset) => dataset.id);
                    if (datasetIds.length) {
                        fectchStats(datasetIds);
                    }
                    return datasets;
                })
    );

    const isLoading = (!datasetsByCategory && !datasetsByDescription && !errorByCategory && !errorByDescription) || isFetchingStats;

    if (errorByCategory || errorByDescription) {
        return (
            <ErrorAlert
                className="m-2"
                message="Something went wrong while fetching related datasets. Please try again later"
            />
        );
    }

    if (isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <Tab.Group>
                <Tab.List>
                    <TabHeader>Related by category</TabHeader>
                    <TabHeader>Ralated by description</TabHeader>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className=" mt-5 h-[44rem] overflow-auto">
                            <DatasetList datasets={datasetsByCategory} stats={stats} />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className=" mt-5 h-[44rem] overflow-auto">
                            <DatasetList datasets={datasetsByDescription} stats={stats} />
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default MayAlsoLike;
