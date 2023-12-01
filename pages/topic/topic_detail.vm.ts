import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const TopicDetailVM = (initialTopicData: any, id: number | undefined) => {
    const [topic, setTopic] = useState(initialTopicData);

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(7);
    const [sortBy, setSortBy] = useState<any>("title");
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
