import { useHttpCall } from "common/hooks";
import Http, { HttpBuilder } from "common/http";
import { useState } from "react";
import Organisation from "models/organisation.model";
import { Data } from "components/UI/result_card";
import toast from "react-hot-toast";
import Topic from "models/topics.model";
const DiscoverVM = () => {
    const { isLoading: isLoading, execute: executeFetchProviders } =
        useHttpCall();
    const [fetchedProviders, setFetchedProviders] = useState<Organisation[]>(
        []
    );

    const [fetchedTopics, setFetchedTopics] = useState<Topic[]>([]);

    const fetchProviders = (offsset: number = 0, count: number = 50) =>
        executeFetchProviders(
            () => {
                return new HttpBuilder({
                    url: `/v1/data_sources/providers_for_homepage?offset=${offsset}&count=${count}`,
                    method: "GET",
                }).run({ retries: 0, tryRefreshingToken: false });
                // return Http.post(`/v1/users/signin`, data);
            },
            {
                onSuccess: (res: any) => {
                    const convertedObjects = Organisation.fromJsonList(res);
                    setFetchedProviders(convertedObjects);
                },
            }
        );

    const { isLoading: isLoadingTopic, execute: executeFetchTopics } =
        useHttpCall();

    const fetchTopics = (offsset: number = 0, count: number = 50) =>
        executeFetchTopics(
            () => {
                return new HttpBuilder({
                    url: `/v1/topics/?search_query=t&page_size=20&page_num=1&sort_by=relevance`,
                    method: "GET",
                }).run({ retries: 0, tryRefreshingToken: false });
            },
            {
                postProcess: (res: any) => {
                    const { topics = [], total_records = 0 } = res[0] || {};
                    const convertedObjects = Topic.fromJsonList(topics);
                    setFetchedTopics(convertedObjects);
                },
                onError: (e) => {
                    console.log(e);
                    toast.error(
                        "Something went wrong while fetching organisation datasets."
                    );
                },
            }
        );

    return {
        fetchProviders,
        fetchedProviders: fetchedProviders || [],
        isLoading,
        fetchTopics,
        isLoadingTopic,
        fetchedTopics: fetchedTopics || []
    };
};
export default DiscoverVM;

export const discoverToResultCardData = (fetchedProviders: any): Data[] => {
    if (!fetchedProviders?.length) {
        return [];
    }

    return fetchedProviders?.map((organisation: any) => ({
        ...organisation,
        id: organisation?.uuid,
        recordType: "organisation",
    }));
};
