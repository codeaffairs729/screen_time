import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { DateTime } from "luxon";
import Organisation from "models/organisation.model";
import {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Dataset from "models/dataset.model.v4";

export enum insightTabIndex {
    dataset_quality,
    search_term,
    download_metrics,
}

export enum searchTerms {
    top_10 = 10,
    top_25 = 25,
}

export enum qualityInsights {
    data_file,
    metadata,
}

export enum download {
    by_region,
    by_time,
    by_role,
}

export interface SearchTermType {
    title: string;
    count: number;
    lastUsed: Date;
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

export const formatLabel = (label: string) => {
    const res = label.replaceAll("_", " ");
    return `${res[0].toUpperCase()}${res.slice(1)}`;
};

export const getSelectedLabelIndex = (label: string, types: any) => {
    return types[label];
};

const OrganisationDetailVM = (
    initialOrganisationData: Organisation | undefined
) => {
    const currentDate = new Date();
    const oneYearAgoDate = new Date(currentDate.setFullYear(currentDate.getFullYear()-1));
    const [organisation, setOrganisation] = useState(initialOrganisationData);
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<number>(0);
    const [selectedSearchTerm, setSelectedSearchTerm] = useState<number>(10);
    const [selectedDownload, setSelectedDownload] = useState<number>(0);
    const [orgDatasetsCount, setOrgDatasetsCount] = useState(10);
    const [fromDate, setFromDate] = useState(oneYearAgoDate);
    const [toDate, setToDate] = useState(currentDate);
    const [downloadMetrics, setDownloadMetrics] = useState<any>();

    // const {
    //     execute: excuteFetchOrganisationRankedDatasets,
    //     data: organisationRankedDatasets,
    //     isLoading: isFetchingOrganisationRankedDatasets,
    // } = useHttpCall<{ [key: string]: any }>({});

    useEffect(() => {
        fetchSearchTerms();
    }, [selectedSearchTerm]);

    useEffect(() => {
        if (orgDatasetsCount != 10) {
            fetchOrganisationDatasets();
        }
    }, [orgDatasetsCount]);

    useEffect(() => {
        fetchDownloadMetricsByTime();
    }, [fromDate, toDate]);
    const incrementOrgDatasetsCount = () =>
        setOrgDatasetsCount(orgDatasetsCount + 10);

    const {
        execute: excuteFetchOrganisationDatasets,
        data: organisationDatasets,
        isLoading: isFetchingOrganisationDatasets,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchOrganisationDatasets = () =>
        excuteFetchOrganisationDatasets(
            () => {
                return Http.get(
                    `/v5/datasets/by-data-host/test-1-2-3?page_number=1&page_size=${orgDatasetsCount}`,
                    { baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT }
                );
            },
            {
                postProcess: (res) => {
                    //TODO Replace mark api with dashboard after db schema update
                    //Mark API datasets
                    return jsonToOrgDatasets(
                        res[0]["user_search"][0]["results"]
                    );
                    //Mark API
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation datasets."
                    );
                },
            }
        );

    const {
        execute: excuteFetchQualityMetrics,
        data: qualityMetrics,
        isLoading: isFetchingQualityMetrics,
    } = useHttpCall<{ [key: string]: any }>({});

    const fetchQualityMetrics = () =>
        excuteFetchQualityMetrics(
            () => {
                return Http.get(
                    `/v1/data_sources/${organisation?.uuid}/quality_metrics`
                );
            },
            {
                postProcess: (res) => {
                    return jsonToQualityMetrics(res);
                },
                onError: (e) => {
                    console.log(e);
                    toast.error(
                        "Something went wrong while fetching organisation Data Quality insights."
                    );
                },
            }
        );

    const {
        execute: excuteFetchSearchTerms,
        data: searchTerms,
        isLoading: isFetchingSearchTerms,
    } = useHttpCall<{ [key: string]: any }>([]);
    const fetchSearchTerms = () =>
        excuteFetchSearchTerms(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${organisation?.uuid}/${selectedSearchTerm}`
                );
            },
            {
                postProcess: (res) => {
                    return jsonToSearchTerms(res);
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation search terms insights."
                    );
                },
            }
        );

    const {
        execute: excuteFetchDownloadMetrics,
        // data: downloadMetrics,
        isLoading: isFetchingDownloadMetrics,
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

    const {
        execute: executeFetchDownloadMetricByTime,
        // data: downloadMetricsByTime,
        isLoading: isFetchDownloadMetricByTime,
    } = useHttpCall<{ [key: string]: any }>({});

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

    const {
        data: topDownloaded,
        isLoading: isFetchingtopDownloaded,
        fetch: fetchTopDownloaded,
    } = GetRankedData({
        key: "download_count",
        orgUUID: organisation?.uuid,
    });

    const {
        data: topViewed,
        isLoading: isFetchingTopViewed,
        fetch: fetchTopViewed,
    } = GetRankedData({
        key: "view_count",
        orgUUID: organisation?.uuid,
    });

    const {
        data: topFavourited,
        isLoading: isFetchingTopFavourited,
        fetch: fetchTopFavourited,
    } = GetRankedData({ key: "favourite_count", orgUUID: organisation?.uuid });

    const isFetchingOrganisationRankedDatasets =
        isFetchingtopDownloaded ||
        isFetchingTopViewed ||
        isFetchingTopFavourited;

    const organisationRankedDatasets = {
        downloaded: topDownloaded,
        viewed: topViewed,
        added_to_favourite: topFavourited,
    };

    const fetchOrganisationRankedDatasets = () => {
        fetchTopDownloaded();
        fetchTopFavourited();
        fetchTopViewed();
    };

    return {
        selectedQualityInsights,
        selectedSearchTerm,
        selectedDownload,
        organisation,
        organisationRankedDatasets,
        organisationDatasets,
        qualityMetrics,
        searchTerms,
        downloadMetrics,
        // isLoading,
        fromDate,
        toDate,
        isFetchingOrganisationDatasets,
        isFetchingOrganisationRankedDatasets,
        isFetchingQualityMetrics,
        isFetchingSearchTerms,
        isFetchingDownloadMetrics,
        setOrganisation,
        fetchOrganisationDatasets,
        incrementOrgDatasetsCount,
        fetchQualityMetrics,
        fetchSearchTerms,
        fetchOrganisationRankedDatasets,
        fetchDownloadMetrics,
        setSelectedQualityInsights,
        setSelectedSearchTerm,
        setSelectedDownload,
        setFromDate,
        setToDate,
    };
};

const GetRankedData = ({
    key,
    orgUUID,
}: {
    key: string;
    orgUUID: string | undefined;
}) => {
    const { execute, data, isLoading } = useHttpCall<{ [key: string]: any }>(
        []
    );

    const tempUUID = "test-1-2-3";

    const fetch = () => {
        execute(
            () => {
                return Http.get(`/v5/datasets/${tempUUID}/ranked-by/${key}`, {
                    baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT,
                });
            },
            {
                postProcess: (res) => {
                    return jsonToOrgDatasets(res, true, getCountKey());
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation datasets."
                    );
                },
            }
        );
    };

    const getCountKey = () => {
        switch (key) {
            case "download_count":
                return "downloads";
            case "favourite_count":
                return "favourite_count";
            case "view_count":
                return "views";
            default:
                return "";
        }
    };

    return {
        data,
        isLoading,
        fetch,
    };
};
export default OrganisationDetailVM;

export interface IOrganisationDetailVMContext {
    selectedQualityInsights: number;
    selectedSearchTerm: number;
    selectedDownload: number;
    organisation: Organisation | undefined;
    organisationDatasets: any;
    organisationRankedDatasets: any;
    qualityMetrics: any;
    searchTerms: any;
    downloadMetrics: any;
    // isLoading: boolean;
    incrementOrgDatasetsCount: Function;
    fetchOrganisationRankedDatasets: Function;
    fetchOrganisationDatasets: Function;
    fetchQualityMetrics: Function;
    fetchSearchTerms: Function;
    fetchDownloadMetrics: Function;
    setSelectedQualityInsights: Function;
    setSelectedSearchTerm: Function;
    setSelectedDownload: Function;
    setOrganisation: Dispatch<SetStateAction<Organisation | undefined>>;
    fromDate: Date;
    toDate: Date;
    setFromDate: Function;
    setToDate: Function;
    isFetchingOrganisationDatasets: boolean;
    isFetchingOrganisationRankedDatasets: boolean;
    isFetchingQualityMetrics: boolean;
    isFetchingSearchTerms: boolean;
    isFetchingDownloadMetrics: boolean;
}

export const OrganisationDetailVMContext =
    createContext<IOrganisationDetailVMContext>(
        {} as IOrganisationDetailVMContext
    );

const jsonToOrgDatasets = (jsons: any, isRanked = false, countKey = "views") =>
    jsons.map((json: any) => {
        const { dataset } = json || {};
        const data: any = {
            id: json?.id,
            uuid: dataset?.uuid,
            title: dataset?.title,
            description: dataset?.description,
        };

        const { metrics } = dataset || {};
        const { global } = metrics || {};

        // if (isRanked) {
        //     data["count"] = global[countKey];
        // }

        return data;
    });

const jsonToSearchTerms = (json: any): SearchTermType[] =>
    json.map((term: any) => {
        return {
            title: term["title"],
            count: term["count"],
            lastUsed: term["created_at"],
        };
    });

const jsonToQualityMetrics = (json: any): any => ({
    dataFileQuality: {
        overallScore: getQualityScore(
            json["data_file_quality"]["overall_score"],
            "overallScore"
        ),
        accuracy: getQualityScore(
            json["data_file_quality"]["accuracy"],
            "accuracy"
        ),
        consistency: getQualityScore(
            json["data_file_quality"]["consistency"],
            "consistency"
        ),
        clarity: getQualityScore(
            json["data_file_quality"]["clarity"],
            "clarity"
        ),
        readiness: getQualityScore(
            json["data_file_quality"]["readiness"],
            "readiness"
        ),
    },
    metaFileQuality: {
        overallScore: getQualityScore(
            json["meta_file_quality"]["overall_score"],
            "overallScore"
        ),
        findability: getQualityScore(
            json["meta_file_quality"]["findability"],
            "findability"
        ),
        accessibility: getQualityScore(
            json["meta_file_quality"]["accessibility"],
            "accessibility"
        ),
        reusability: getQualityScore(
            json["meta_file_quality"]["reusability"],
            "reusability"
        ),
        contextuality: getQualityScore(
            json["meta_file_quality"]["contextuality"],
            "contextuality"
        ),
        interoperability: getQualityScore(
            json["meta_file_quality"]["interoperability"],
            "interoperability"
        ),
    },
});

const getQualityScore = (data: any, title: string) => ({
    title: title,
    rating: data.rating,
    datasets: data.datasets.map((data: any) => getQualityDatasets(data)),
});

const getQualityDatasets = (dataset: any) => ({
    uuid: dataset["uuid"],
    title: dataset["title"],
    description: dataset["description"],
    rating: dataset["rating"],
});

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

const jsonToOrgDownloadMetricByTime = (json: any): any =>
    json?.map((data: any) => ({
        date: data["date"],
        count: data["count"],
    }));
