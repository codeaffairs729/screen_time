import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";

export enum downloadHeaders {
    by_region,
    by_time,
    by_role,
}

export type DownloadByRegion = {
    name: string;
    location: {
        lat: number;
        long: number;
    };
    count: number;
    date: Date;
};

export type DownloadByTime = {
    date: Date;
    count: number;
};

export type DownloadByUseCase = {
    name: string;
    value: number;
};

export interface DownloadMetrics {
    regions: DownloadByRegion[];
    downloadByTime: DownloadByTime[];
    downloadByUseCase: DownloadByUseCase[];
}

const DownloadMetricVM = () => {
    const currentDate = new Date();
    const oneYearAgoDate = new Date(
        currentDate.setFullYear(currentDate.getFullYear() - 1)
    );

    const [downloadMetrics, setDownloadMetrics] = useState<any>();
    const [fromDate, setFromDate] = useState(oneYearAgoDate);
    const [toDate, setToDate] = useState(currentDate);
    const [selectedDownload, setSelectedDownload] = useState<number>(0);
    const { organisation } = useContext(OrganisationDetailVMContext);

    useEffect(() => {
        fetchDownloadMetricsByTime();
    }, [fromDate, toDate]);

    const {
        execute: executeFetchDownloadMetricByTime,
        isLoading: fetchingDownloadMetricByTime,
    } = useHttpCall<{ [key: string]: any }>({});

    const {
        execute: excuteFetchDownloadMetrics,
        isLoading: fetchingDownloadMetrics,
    } = useHttpCall<{ [key: string]: any }>({});

    const fetchDownloadMetrics = () =>
        excuteFetchDownloadMetrics(
            () =>
                Http.get(
                    `/v1/metrics/get_provider_metrics/${organisation?.uuid}`
                ),
            {
                postProcess: (res) => {
                    setDownloadMetrics(jsonToOrgDownloadMetrics(res));
                    return [];
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation download metrics."
                    );
                },
            }
        );

    const fetchDownloadMetricsByTime = () =>
        executeFetchDownloadMetricByTime(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${
                        organisation?.uuid
                    }/by_time?from=${format(
                        fromDate,
                        "yyyy-MM-dd"
                    )}&to=${format(toDate, "yyyy-MM-dd")}`
                );
            },
            {
                postProcess: (res: any) => {
                    setDownloadMetrics({
                        ...downloadMetrics,
                        downloadByTime: jsonToOrgDownloadMetricByTime(res),
                    });
                    return [];
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation download metrics."
                    );
                },
            }
        );

    const isFetchingDownloadMetrics =
        fetchingDownloadMetrics || fetchingDownloadMetricByTime;

    return {
        fromDate,
        toDate,
        setFromDate,
        setToDate,
        downloadMetrics,
        selectedDownload,
        setSelectedDownload,
        fetchDownloadMetrics,
        isFetchingDownloadMetrics,
    };
};

export default DownloadMetricVM;

interface IDownloadMetricVM {
    fromDate: Date;
    toDate: Date;
    setFromDate: Function;
    setToDate: Function;
    downloadMetrics: any;
    selectedDownload: any;
    setSelectedDownload: Function;
    fetchDownloadMetrics: Function;
    isFetchingDownloadMetrics: boolean;
}

export const DownloadMetricVMContext = createContext<IDownloadMetricVM>(
    {} as IDownloadMetricVM
);

const jsonToOrgDownloadMetricByTime = (json: any): any =>
    json?.map((data: any) => ({
        date: data["date"],
        count: data["count"],
    }));

const jsonToOrgDownloadMetrics = (json: any): any => ({
    regions: json["provider_downloads_by_location"]?.map((region: any) => ({
        name: region["name"],
        location: region["locations"]?.map((location: any) => ({
            lat: location["latitude"],
            long: location["longitude"],
        })),
        count: region["count"],
        date: region["date"],
    })),
    downloadByTime: json["provider_downloads_by_time"]?.map((data: any) => ({
        date: data["date"],
        count: data["count"],
    })),
    downloadByUseCase: json["provider_downloads_by_role"]?.map(
        (useCase: any) => ({
            name: useCase["name"],
            value: useCase["count"],
        })
    ),
});
