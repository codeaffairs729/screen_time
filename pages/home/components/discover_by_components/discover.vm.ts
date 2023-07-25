import { useHttpCall } from "common/hooks";
import Http, { HttpBuilder } from "common/http";
import { useState } from "react";
const DiscoverVM = () => {
    const { isLoading: isLoading, execute: executeFetchProviders } =
        useHttpCall();
    const [fetchedProviders, setFetchedProviders] = useState();
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
                    const convertedObjects = convertToJson(res);
                    setFetchedProviders(convertedObjects);
                },
            }
        );
    return {
        fetchProviders,
        fetchedProviders,
        isLoading,
    };
};
export default DiscoverVM;
const convertToJson = (input_data: any) => {
    const output_data = input_data.map((item:any) => ({
  title: item.name,
  subTitle: null,
  imageUrl: item.logo_url ||null,
  recommended: false,
  id: item.uuid
    }));
    return output_data
}