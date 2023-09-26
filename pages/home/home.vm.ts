import { useHttpCall } from "common/hooks";
import Http, { HttpBuilder } from "common/http";
import {useState} from 'react'
const HomeVM = () => {
    const { isLoading: isLoading, execute: executeMetricsQuery } = useHttpCall();
    const [fetchedMetrics, setFetchedMetrics] = useState();
    const [relatedProviders, setRelatedProviders] = useState();
      const { isLoading: isFetchingRelatedProviders, execute: executeRelatedProvidersQuery } = useHttpCall();
    const fetchHomeMetrics = () =>
        executeMetricsQuery(
            () => {
                return new HttpBuilder({
                    url: `/v1/metrics/get_metrics_for_home`,
                    method: "GET",
                })
                    .run({ retries: 0, tryRefreshingToken: false });
                // return Http.post(`/v1/users/signin`, data);
            },
            {
                onSuccess: (res: any) => {
                    setFetchedMetrics(res)
                },
            }
        );
    const fetchRelatedProviders = () =>
        executeRelatedProvidersQuery(
            () => {
                return new HttpBuilder({
                    url: `/v1/data_sources/providers_for_homepage?offset=0&count=20`,
                    method: "GET",
                }).run({ retries: 0, tryRefreshingToken: false });
                // return Http.post(`/v1/users/signin`, data);
            },
            {
                onSuccess: (res: any) => {
                    setRelatedProviders(res);
                },
            }
        );
    return {
        fetchHomeMetrics,
        fetchedMetrics,
        isLoading,
        isFetchingRelatedProviders,
        fetchRelatedProviders,
        relatedProviders,
    };
}
export default HomeVM;