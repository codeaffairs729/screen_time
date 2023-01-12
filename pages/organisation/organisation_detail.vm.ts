import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { DateTime } from "luxon";
import Organisation from "models/organisation.model";
import { createContext, useState, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

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
        execute: excuteFectchSearchTerms,
        data: searchTerms,
        isLoading: isFetchingSearchTerms,
    } = useHttpCall<{ [key: string]: any }>({});

    const fectchSearchTerms = (ids: number[]) =>
        excuteFectchSearchTerms(
            () => {
                // return Http.get(`/v1/data_provider/${1}/search_terms`);
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
        metaDataQulaity,
        dataFileQuality,
        searchTerms: jsonToSearchTerms(SearchTerms),
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

const jsonToSearchTerms = (json: any): SearchTermType =>
    json.map((term: any) => ({
        title: term["title"],
        count: term["count"],
        // lastUsed: DateTime.fromISO(term["updated_at"]),
    }));

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
