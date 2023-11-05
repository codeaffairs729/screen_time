import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { TopicDetailVMContext } from "pages/topic/topic_detail.vm";

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

export type DownloadByRole = {
    name: string;
    value: number;
};

export interface DownloadMetrics {
    regions: DownloadByRegion[];
    downloadByTime: DownloadByTime[];
    downloadByRole: DownloadByRole[];
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
    const { topic } = useContext(TopicDetailVMContext);

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
                    `/v1/metrics/get_topic_metrics/${topic?.id}`
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
                    `/v1/metrics/${
                        topic?.id
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

    const isFetchingDownloadMetrics = fetchingDownloadMetrics;

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
    downloadByRole: json["provider_downloads_by_role"]?.map(
        (role: any) => ({
            name: role["name"],
            value: role["count"],
        })
    ),
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

export const getTableData = (fromDate: any, toDate: any, dates: any) => {
    const differenceInDays: number = getDifferenceInDays(fromDate, toDate);
    if (differenceInDays >= 90) {
        const tableDataByMonth = getDataByMonth(dates).map((data: any) => [
            [data.month],
            [data.count],
        ]);
        return tableDataByMonth;
    } else {
        const tableDataByTime = dates.map((data: DownloadByTime) => {
            const date = new Date(data?.date);
            const month = date.toLocaleString("en", { month: "short" });
            const year = new Date(data?.date).getFullYear();
            return [[`${month} ${year}`], [data.count] ];
        });

        return tableDataByTime;
    }
};
