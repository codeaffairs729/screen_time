import { useHttpCall } from "common/hooks";
import Http, { HttpBuilder } from "common/http";
import {useState} from 'react'
const HomeVM = () => {
    const { isLoading: isLoading, execute: executeMetricsQuery } = useHttpCall();
    const [fetchedMetrics, setFetchedMetrics] =useState();
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
    return {
        fetchHomeMetrics,
        fetchedMetrics, 
        isLoading
    };
}
export default HomeVM;