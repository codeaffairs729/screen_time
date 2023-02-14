import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";

export type DownloadByTimeEnum = {
    date: Date;
    count: number;
};

export enum DownloadSectionEnum {
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

const checkIfDateExists = (downloadDate: any, currDate: any) => {
    const downloadDateString = new Date(downloadDate.date).toDateString();
    const currDateString = new Date(currDate).toDateString();

    return currDateString == downloadDateString;
};
const DownloadMetricsVM = () => {
    const { dataset } = useContext(DatasetDetailVMContext);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [downloadMetrics, setDownloadMetrics] = useState<any>();
    const [selectedDownload, setSelectedDownload] = useState<number>(0);

    useEffect(() => {
        fetchDatasetMetricsByTime();
    }, [fromDate, toDate]);
    const {
        execute: excutefetchDatasetMetrics,
        data: datasetMetrics,
        error,
        isLoading: isFetchingDatasetMetrics,
    } = useHttpCall<{ [key: string]: any }>({});

    const fetchDatasetMetrics = () =>
        excutefetchDatasetMetrics(
            () => {
                return Http.get(
                    `/v1/metrics/get_dataset_metrics/${dataset?.id}`
                );
            },
            {
                postProcess: (res) => {
                    setDownloadMetrics(jsonToOrgDownloadMetrics(res));
                    return [];
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation datasets."
                    );
                },
            }
        );
    const {
        execute: excutefetchDatasetMetricsByTime,
        data: datasetMetricsByTime,
        isLoading: isFetchingDatasetMetricsByTime,
    } = useHttpCall<{ [key: string]: any }>({});

    const fetchDatasetMetricsByTime = () =>
        excutefetchDatasetMetricsByTime(
            () => {
                return Http.get(
                    `/v1/metrics/dataset/${
                        dataset?.id
                    }/by_time?from_date=${format(
                        fromDate,
                        "yyyy-MM-dd"
                    )}&to_date=${format(toDate, "yyyy-MM-dd")}`
                );
            },
            {
                postProcess: (res) => {
                    setDownloadMetrics({
                        ...downloadMetrics,
                        downloadByTime: jsonToOrgDownloadMetricByTime(res),
                    });
                    return [];
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation datasets."
                    );
                },
            }
        );

    return {
        error,
        datasetMetrics,
        datasetMetricsByTime,
        selectedDownload,
        setSelectedDownload,
        isFetchingDatasetMetrics,
        isFetchingDatasetMetricsByTime,
        downloadMetrics,
        toDate,
        fromDate,
        setToDate,
        setFromDate,
        fetchDatasetMetrics,
        fetchDatasetMetricsByTime,
    };
};

export default DownloadMetricsVM;

interface IDownloadMetricsVMContext {
    error: any;
    datasetMetrics: any;
    datasetMetricsByTime: any;
    downloadMetrics: any;
    selectedDownload: number;
    setSelectedDownload: Function;
    isFetchingDatasetMetrics: boolean;
    isFetchingDatasetMetricsByTime: boolean;
    fromDate: Date;
    setFromDate: Function;
    toDate: Date;
    setToDate: Function;
    fetchDatasetMetrics: Function;
    fetchDatasetMetricsByTime: Function;
}

export const DownloadMetricsVMContext =
    createContext<IDownloadMetricsVMContext>({} as IDownloadMetricsVMContext);

const jsonToOrgDownloadMetricByTime = (json: any): any =>
    json?.map((data: any) => ({
        date: data["date"],
        count: data["count"],
    }));

const jsonToOrgDownloadMetricByLocation = (json: any): any =>
    json?.map((region: any) => ({
        name: region["name"],
        location: region["locations"]?.map((location: any) => ({
            lat: location["latitude"],
            long: location["longitude"],
        })),
        count: region["count"],
        date: region["date"],
    }));

const jsonToOrgDownloadMetricByRole = (json: any): any =>
    json?.map((useCase: any) => ({
        name: useCase["name"],
        value: useCase["count"],
    }));

const jsonToOrgDownloadMetrics = (json: any): any => ({
    regions: jsonToOrgDownloadMetricByLocation(json["downloads_by_location"]),
    downloadByTime: jsonToOrgDownloadMetricByTime(json["downloads_by_time"]),
    downloadByUseCase: jsonToOrgDownloadMetricByRole(json["downloads_by_role"]),
});

const getDifferenceInDays = (fromDate: any, toDate: any) =>
    (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);

const getDataByMonth = (dates: any) => {
    const tempDate = dates.map((data: DownloadByTime) => {
        const date = new Date(data?.date);
        const month = date.toLocaleString("en", { month: "short" });
        const year = new Date(data?.date).getFullYear();
        return { count: data.count, month: `${month} ${year}` };
    });

    const aggregated = tempDate.reduce((acc: any, curr: any) => {
        const existingMonth = acc.find(
            (monthObj: any) => monthObj.month === curr.month
        );
        if (existingMonth) {
            existingMonth.count += curr.count;
        } else {
            acc.push({
                month: curr.month,
                count: curr.count,
            });
        }
        return acc;
    }, []);
    return aggregated;
};

export const getDateRange = (fromDate: any, toDate: any, dates: any) => {
    const differenceInDays: number = getDifferenceInDays(fromDate, toDate);
    if (differenceInDays >= 90) {
        const lineChartByMonth = getDataByMonth(dates).map((data: any) => ({
            month: data.month,
            download: data.count,
        }));
        return lineChartByMonth;
    } else {
        let datesList: any = [];
        let currentDate = new Date(fromDate);
        while (currentDate <= new Date(toDate)) {
            const downloadDate = dates.filter((downDate: any) =>
                checkIfDateExists(downDate, currentDate)
            )[0];
            const dateToShow = downloadDate
                ? new Date(downloadDate?.date)
                : currentDate;
            datesList.push({
                date: dateToShow.toLocaleString("en", {
                    day: "numeric",
                    weekday: "short",
                    month: "short",
                    year: "numeric",
                }),
                download: downloadDate?.count || 0,
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return datesList;
    }
};

