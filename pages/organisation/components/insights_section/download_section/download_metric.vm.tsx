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

const checkIfDateExists = (downloadDate: any, currDate: any) => {
    const downloadDateString = new Date(downloadDate.date).toDateString();
    const currDateString = new Date(currDate).toDateString();

    return currDateString == downloadDateString;
};

const DownloadMetricVM = () => {
    const currentDate = new Date();
    const oneYearAgoDate = new Date(
        currentDate.setFullYear(currentDate.getFullYear() - 1)
    );

    const [downloadMetrics, setDownloadMetrics] = useState<any>();
    const [fromDate, setFromDate] = useState(oneYearAgoDate);
    const [toDate, setToDate] = useState(new Date());
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
        error,
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
        fetchingDownloadMetrics ;

    return {
        error,
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
    error: any;
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

export const getDateRange = (fromDate: any, toDate: any, dates: any) => {
    let datesList: any = [];
    let currentDate = new Date(fromDate);
    while (currentDate <= new Date(toDate)) {
        const downloadDate = dates.filter((downDate: any) =>
            checkIfDateExists(downDate, currentDate)
        )[0];

        // console.log("downloadDate :", checkIfDateExists(dates[2], currentDate))
        const dateToShow = downloadDate
            ? new Date(downloadDate?.date)
            : currentDate;
        datesList.push({
            date: dateToShow.toLocaleString("en", {
                day:"numeric",
                weekday: "short",
                month: "short",
                year: "numeric",
            }),
            download: downloadDate?.count || 0,
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return datesList;
};