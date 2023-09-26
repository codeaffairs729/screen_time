import { useHttpCall } from "common/hooks";
import Http, { HttpBuilder } from "common/http";
import { useState } from "react";
import Organisation from "models/organisation.model";
import { Data } from "components/UI/result_card";
const DiscoverVM = () => {
    const { isLoading: isLoading, execute: executeFetchProviders } =
        useHttpCall();
    const [fetchedProviders, setFetchedProviders] = useState<Organisation[]>([]);
    const fetchProviders = (offsset: number = 0, count: number = 20) =>
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
    return {
        fetchProviders,
        fetchedProviders: fetchedProviders || [],
        isLoading,
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