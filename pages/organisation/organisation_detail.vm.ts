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
import { getNotificationAge } from "pages/workspace/notification.vm";
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
    by_user_type,
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
    const [organisation, setOrganisation] = useState(initialOrganisationData);
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<number>(0);
    const [selectedSearchTerm, setSelectedSearchTerm] = useState<number>(10);
    const [selectedDownload, setSelectedDownload] = useState<number>(0);

    const {
        execute: excuteFectchOrganisationRankedDatasets,
        data: organisationRankedDatasets,
        isLoading: isFetchingOrganisationRankedDatasets,
    } = useHttpCall<{ [key: string]: any }>({});

    useEffect(() => {
        fetchSearchTerms();
    }, [selectedSearchTerm]);

    const fectchOrganisationRankedDatasets = () =>
        excuteFectchOrganisationRankedDatasets(
            () => {
                return Http.get(
                    `/v1/data_sources/${organisation?.id}/provider_ranked_datasets`
                );
            },
            {
                postProcess: (res) => {
                    return jsonToOrgDatasets(res);
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation datasets."
                    );
                },
            }
        );

    const {
        execute: excuteFectchOrganisationDatasets,
        data: organisationDatasets,
        isLoading: isFetchingOrganisationDatasets,
    } = useHttpCall<{ [key: string]: any }>({});

    const fectchOrganisationDatasets = () =>
        excuteFectchOrganisationDatasets(
            () => {
                return Http.get(
                    `/v1/data_sources/${
                        organisation?.id
                    }/${1}/provider_datasets`
                );
            },
            {
                postProcess: (res) => {
                    return jsonToOrgDatasets(res);
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation datasets."
                    );
                },
            }
        );

    const {
        execute: excuteFectchQualityMetrics,
        data: qualityMetrics,
        isLoading: isFetchingQualityMetrics,
    } = useHttpCall<{ [key: string]: any }>({});

    const fetchQualityMetrics = (ids: number[]) =>
        excuteFectchQualityMetrics(
            () => {
                // return Http.get(
                //     `/v1/data_sources/${organisation?.id}/quality_metrics`
                // );
            },
            {
                postProcess: (res) => {
                    return res;
                },
                onError: (e) => {
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
                    `/v1/data_sources/${organisation?.id}/${selectedSearchTerm}/search_terms`
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
        execute: excuteFectchDownloadMetrics,
        data: downloadMetrics,
        isLoading: isFetchingDownloadMetrics,
    } = useHttpCall<{ [key: string]: any }>({});

    const fectchDownloadMetrics = (ids: number[]) =>
        excuteFectchDownloadMetrics(
            () =>
                Http.get(
                    `/v1/data_sources/${organisation?.id}/download_metrics`
                ),
            {
                postProcess: (res) => {
                    return jsonToOrgDownloadMetrics(res);
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation download metrics."
                    );
                },
            }
        );

    const isLoading =
        isFetchingOrganisationDatasets ||
        isFetchingOrganisationRankedDatasets ||
        isFetchingQualityMetrics ||
        isFetchingSearchTerms ||
        isFetchingDownloadMetrics;

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
        isLoading,
        setOrganisation,
        fectchOrganisationDatasets,
        fetchQualityMetrics,
        fetchSearchTerms,
        fectchOrganisationRankedDatasets,
        fectchDownloadMetrics,
        setSelectedQualityInsights,
        setSelectedSearchTerm,
        setSelectedDownload,
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
    isLoading: boolean;
    fectchOrganisationRankedDatasets: Function;
    fectchOrganisationDatasets: Function;
    fetchQualityMetrics: Function;
    fetchSearchTerms: Function;
    fectchDownloadMetrics: Function;
    setSelectedQualityInsights: Function;
    setSelectedSearchTerm: Function;
    setSelectedDownload: Function;
    setOrganisation: Dispatch<SetStateAction<Organisation | undefined>>;
}

export const OrganisationDetailVMContext =
    createContext<IOrganisationDetailVMContext>(
        {} as IOrganisationDetailVMContext
    );

const jsonToOrgDatasets = (json: any) => {
    const orgDatasets: any = {};
    Object.keys(json)?.forEach((key: string) => {
        orgDatasets[key] = json[key].map((dataset: any) => {
            const data: any = {
                id: dataset["id"],
                title: dataset["title"],
                description: dataset["description"],
            };

            if (dataset?.count) {
                data["count"] = dataset["count"];
            }

            return data;
        });
    });

    return orgDatasets;
};

const jsonToSearchTerms = (json: any): SearchTermType[] =>
    json.map((term: any) => {
        return {
            title: term["title"],
            count: term["count"],
            lastUsed: term["created_at"],
        };
    });

const jsonToOrgDownloadMetrics = (json: any): DownloadMetrics => ({
    regions: json["regions"]?.map((region: any) => ({
        name: region["name"],
        location: {
            lat: region["location"]["lat"],
            long: region["location"]["long"],
        },
        count: region["count"],
        date: region["last_used"],
    })),
    downloadByTime: json["download_by_time"]?.map((data: any) => ({
        date: data["date"],
        count: data["count"],
    })),
    downloadByUseCase: json["download_by_use_case"]?.map((useCase: any) => ({
        name: useCase["name"],
        value: useCase["value"],
    })),
});

// const rating = [{ 1: 10 }, { 2: 20 }, { 3: 30 }, { 4: 20 }, { 5: 10 }];
// const datasets = [
//     {
//         id: 1,
//         title: "2011 Output Area code, old to new",
//         description:
//             "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
//         rating: 10,
//     },
//     {
//         id: 2,
//         title: "2011 Output Area code, old to new",
//         description:
//             "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
//         rating: 30,
//     },
//     {
//         id: 3,
//         title: "2011 Output Area code, old to new",
//         description:
//             "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
//         rating: 20,
//     },
// ];
// const dataFile: any = {
//     overall_score: {
//         title: "Overall score",
//         rating: rating,
//         datasets: datasets,
//     },
//     accuracy: {
//         title: "accuracy",
//         rating: rating,
//         datasets: datasets,
//     },
//     consistency: {
//         title: "consistency",
//         rating: rating,
//         datasets: datasets,
//     },
//     clarity: {
//         title: "clarity",
//         rating: rating,
//         datasets: datasets,
//     },
//     readiness: {
//         title: "readiness",
//         rating: rating,
//         datasets: datasets,
//     },
// };
// const metaFile: any = {
//     overall_score: {
//         title: "Overall score",
//         rating: rating,
//         datasets: datasets,
//     },
//     findability: {
//         title: "findability",
//         rating: rating,
//         datasets: datasets,
//     },
//     accessibility: {
//         title: "accessibility",
//         rating: rating,
//         datasets: datasets,
//     },
//     reusability: {
//         title: "reusability",
//         rating: rating,
//         datasets: datasets,
//     },
//     contextuality: {
//         title: "contextuality",
//         rating: rating,
//         datasets: datasets,
//     },
//     interoperability: {
//         title: "interoperability",
//         rating: rating,
//         datasets: datasets,
//     },
// };
