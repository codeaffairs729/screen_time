import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { DateTime } from "luxon";
import Organisation from "models/organisation.model";
import { createContext, useState, Dispatch, SetStateAction } from "react";
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

    const fectchOrganisationRankedDatasets = () =>
        excuteFectchOrganisationRankedDatasets(
            () => {
                return Http.get(
                    `/v1/data_sources/${organisation?.id}/provider_ranked_datasets`
                );
            },
            {
                onSuccess: (res) => {
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
                onSuccess: (res) => {
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
        execute: excuteFectchMetaDataQulaity,
        data: metaDataQulaity,
        isLoading: isFetchingMetaDataQulaity,
    } = useHttpCall<{ [key: string]: any }>({});

    const fectchMetaDataQulaity = (ids: number[]) =>
        excuteFectchMetaDataQulaity(
            () =>
                Http.post("/v1/datasets/stats", {
                    meta_dataset_ids: ids,
                }),
            {
                postProcess: (res) => {
                    return res;
                },
            }
        );

    const {
        execute: excuteFectchDataFileQuality,
        data: dataFileQuality,
        isLoading: isFetchingDataFileQuality,
    } = useHttpCall<{ [key: string]: any }>({});

    const fectchDataFileQuality = (ids: number[]) =>
        excuteFectchDataFileQuality(
            () => {
                // return  Http.post("/v1/datasets/stats", {meta_dataset_ids: ids,}),
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
        execute: excuteFectchSearchTerms,
        data: searchTerms,
        isLoading: isFetchingSearchTerms,
    } = useHttpCall<{ [key: string]: any }>([]);
    const fectchSearchTerms = () =>
    excuteFectchSearchTerms(
        () => {
            return Http.get(`/v1/data_sources/${organisation?.id}/${selectedSearchTerm}/search_terms`);
        },
        {
            onSuccess: (res) => {
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
                onSuccess: (res) => {
                    return res;
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
        isFetchingMetaDataQulaity ||
        isFetchingDataFileQuality ||
        isFetchingSearchTerms ||
        isFetchingDownloadMetrics;

    return {
        selectedQualityInsights,
        selectedSearchTerm,
        selectedDownload,
        organisation,
        organisationRankedDatasets,
        organisationDatasets,
        metaDataQulaity: metaFile,
        dataFileQuality: dataFile,
        searchTerms, //TODO replace with searchTerms,
        downloadMetrics,
        isLoading,
        setOrganisation,
        fectchOrganisationDatasets,
        fectchMetaDataQulaity,
        fectchDataFileQuality,
        fectchSearchTerms,
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
    metaDataQulaity: any;
    dataFileQuality: any;
    searchTerms: any;
    downloadMetrics: any;
    isLoading: boolean;
    fectchOrganisationRankedDatasets: Function;
    fectchOrganisationDatasets: Function;
    fectchMetaDataQulaity: Function;
    fectchDataFileQuality: Function;
    fectchSearchTerms: Function;
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
        const date:any=DateTime.fromISO(term["created_at"])
        return {
        title: term["title"],
        count: term["count"],
        lastUsed: date.ts
    }});

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

const SearchTerms = [
    { title: "Nature", count: 1, created_at: new Date() },
    { title: "Biodiversity", count: 1, created_at: new Date() },
    { title: "Climate change", count: 1, created_at: new Date() },
    { title: "Species", count: 1, created_at: new Date() },
    { title: "Ecology", count: 1, created_at: new Date() },
    { title: "Indicators", count: 1, created_at: new Date() },
    { title: "Agroecology", count: 1, created_at: new Date() },
    { title: "Scotland", count: 1, created_at: new Date() },
    { title: "Environment", count: 1, created_at: new Date() },
    { title: "Health", count: 1, created_at: new Date() },
    { title: "Nature1", count: 1, created_at: new Date() },
    { title: "Biodiversity1", count: 1, created_at: new Date() },
    { title: "Climate change1", count: 1, created_at: new Date() },
    { title: "Species1", count: 1, created_at: new Date() },
    { title: "Ecology1", count: 1, created_at: new Date() },
    { title: "Indicators1", count: 1, created_at: new Date() },
    { title: "Agroecology1", count: 1, created_at: new Date() },
    { title: "Scotland1", count: 1, created_at: new Date() },
    { title: "Environment1", count: 1, created_at: new Date() },
    { title: "Health1", count: 1, created_at: new Date() },
];

const dates = [...Array(12)].map((_, key) => new Date(2022, key));
const DownloadMetrics = {
    regions: [
        {
            name: "Manchester",
            location: {
                lat: 41.8819,
                long: -87.6278,
            },
            count: 125,
            date: new Date(),
        },
        {
            name: "Edinburgh",
            location: {
                lat: 45.89,
                long: -87.6278,
            },
            count: 125,
            date: new Date(),
        },
        {
            name: "Bristol",
            location: {
                lat: 42.536457,
                long: -70.985786,
            },
            count: 125,
            date: new Date(),
        },
        {
            name: "Manchester",
            location: {
                lat: 35.328674,
                long: -90.664658,
            },
            count: 125,
            date: new Date(),
        },
        {
            name: "Edinburgh",
            location: {
                lat: 31.8819,
                long: -87.6278,
            },
            count: 125,
            date: new Date(),
        },
        {
            name: "Bristol",
            location: {
                lat: 75.89,
                long: -87.6279,
            },
            count: 125,
            date: new Date(),
        },
        {
            name: "London",
            location: {
                lat: 52.536457,
                long: -90.985786,
            },
            count: 125,
            date: new Date(),
        },
    ],
    download_by_time: dates.map((date, index) => ({
        date: date,
        count: 10 + index,
    })),
    download_by_use_case: [
        { name: "Data modelling", value: 400 },
        { name: "Publications", value: 300 },
        { name: "Planning", value: 200 },
        { name: "gov", value: 500 },
        { name: "Plan", value: 300 },
    ],
};
const rating = [
    [{ 1: 10 }, { 2: 20 }, { 3: 30 }, { 4: 20 }, { 5: 10 }],
    [{ 1: 10 }, { 2: 20 }, { 3: 50 }, { 4: 20 }, { 5: 10 }],
    [{ 1: 50 }, { 2: 20 }, { 3: 30 }, { 4: 20 }, { 5: 10 }],
    [{ 1: 10 }, { 2: 20 }, { 3: 30 }, { 4: 20 }, { 5: 10 }],
    [{ 1: 20 }, { 2: 10 }, { 3: 20 }, { 4: 20 }, { 5: 10 }],
    [{ 1: 10 }, { 2: 10 }, { 3: 20 }, { 4: 20 }, { 5: 10 }],
];
const datasets = [
    {
        id: 1,
        title: "2011 Output Area code, old to new",
        description:
            "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
        rating: 10,
    },
    {
        id: 2,
        title: "2011 Output Area code, old to new",
        description:
            "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
        rating: 30,
    },
    {
        id: 3,
        title: "2011 Output Area code, old to new",
        description:
            "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
        rating: 20,
    },
];
const dataFile: any = {
    overall_score: {
        title: "Overall score",
        rating: rating,
        datasets: datasets,
    },
    accuracy: {
        title: "accuracy",
        rating: rating,
        datasets: datasets,
    },
    consistency: {
        title: "consistency",
        rating: rating,
        datasets: datasets,
    },
    clarity: {
        title: "clarity",
        rating: rating,
        datasets: datasets,
    },
    readiness: {
        title: "readiness",
        rating: rating,
        datasets: datasets,
    },
};
const metaFile: any = {
    overall_score: {
        title: "Overall score",
        rating: rating,
        datasets: datasets,
    },
    findability: {
        title: "findability",
        rating: rating,
        datasets: datasets,
    },
    accessibility: {
        title: "accessibility",
        rating: rating,
        datasets: datasets,
    },
    reusability: {
        title: "reusability",
        rating: rating,
        datasets: datasets,
    },
    contextuality: {
        title: "contextuality",
        rating: rating,
        datasets: datasets,
    },
    interoperability: {
        title: "interoperability",
        rating: rating,
        datasets: datasets,
    },
};
