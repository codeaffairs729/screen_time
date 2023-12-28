import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const TopicDetailVM = (initialTopicData: any, id: number | undefined) => {
    const [topic, setTopic] = useState(initialTopicData);

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(7);
    const [sortBy, setSortBy] = useState<any>("title");
    const insight_datasetQuality_description = [
        {
            title: "The metadata quality of all datasets of this organisation has been algorithmically estimated based on the",
        },
        {
            title: "The data quality of datasets of this organisation has been estimated based on user feedback (where available).Datasets rated based on overall data quality and individual dimensions are listed below.",
        },
    ];
    const insight_searchTerm_description =
        "Search terms used to discover the datasets of the data provider";
    const insight_useCase_description =
        "Use cases of datasets gathered from user feedback aggregated on the data provider level.";

    const [permittedPermissions, setPermittedPermissions] = useState();
    const protocol = window.location.protocol || "http:";
    const host =
        window.location.hostname !== "localhost"
            ? window.location.hostname
            : "localhost:3000";
    const fullUrl = `${protocol}//${host}`;

    useEffect(() => {
        fetchDatasetByTopic();
    }, [pageNumber, sortBy]);

    const {
        execute: excuteFetchDatasetByTopic,
        data: datasetByTopic,
        isLoading: isFetchingDatasetByTopic,
        error: errorDatasetByTopic,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchDatasetByTopic = () =>
        excuteFetchDatasetByTopic(
            () => {
                return Http.get(
                    `/api/topic/dataset-by-topic?topic_id=${topic?.id}&pageNumber=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}`,
                    {
                        baseUrl: fullUrl,
                    }
                );
            },
            {
                postProcess: (res) => {
                    return jsonToTopicDatasets(
                        res["results"],
                        res["total_matches"]
                    );
                },
                onError: (e) => {
                    console.log(e);
                    toast.error(
                        "Something went wrong while fetching Topic datasets."
                    );
                },
            }
        );

    return {
        topic,
        setTopic,
        fetchDatasetByTopic,
        datasetByTopic,
        pageSize,
        isFetchingDatasetByTopic,
        errorDatasetByTopic,
        pageNumber,
        setPageNumber,
        permittedPermissions,
        setPermittedPermissions,
        insight_datasetQuality_description,
        insight_searchTerm_description,
        insight_useCase_description,
    };
};
export default TopicDetailVM;

export interface ITopicDetailVMContext {
    topic: any;
    setTopic: any;
    fetchDatasetByTopic: any;
    datasetByTopic: any;
    pageSize: any;
    isFetchingDatasetByTopic: any;
    errorDatasetByTopic: any;
    pageNumber: any;
    setPageNumber: any;
    permittedPermissions: any;
    setPermittedPermissions: any;
    insight_datasetQuality_description: string;
    insight_searchTerm_description: string;
    insight_useCase_description: string;
}

export const TopicDetailVMContext = createContext<ITopicDetailVMContext>(
    {} as ITopicDetailVMContext
);

const jsonToTopicDatasets = (jsons: any, totalMatches: number) => {
    // console.log({ jsons });
    return {
        datasets: jsons.map((json: any) => {
            const { dataset } = json || {};
            const { metrics } = dataset;

            const data: any = {
                id: json?.id,
                title: dataset?.title,
                description: "Not present",
                last_updated: dataset?.last_updated,
                views: metrics?.dataset?.view_count,
                downloads: metrics?.dataset?.download_count,
                likes: metrics?.dataset?.favourite_count,
                last_downloaded: metrics?.dataset?.last_downloaded,
                display_count: metrics?.dataset?.display_count,
            };
            return data;
        }),
        total_matches: totalMatches,
    };
};
