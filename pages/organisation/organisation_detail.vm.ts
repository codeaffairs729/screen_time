import { useHttpCall } from "common/hooks";
import Http from "common/http";
import Organisation from "models/organisation.model";
import { createContext, useState, Dispatch, SetStateAction } from "react";

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
    // const [organisationDatasets, setOrganisationDatasets] = useState({});
    // const [metaDataQulaity, setMetaDataQulaity] = useState({});
    // const [dataFileQuality, setDataFileQulaity] = useState({});
    // const [searchTerms, setSearchTerms] = useState([]);
    // const [downloadMetrics, setDownloadMetrics] = useState({});

    const {
        execute: excuteFectchOrganisationDatasets,
        data: organisationDatasets,
        isLoading: isFetchingOrganisationDatasets,
    } = useHttpCall<{ [key: string]: any }>({});

    const fectchOrganisationDatasets = (ids: number[]) =>
        excuteFectchOrganisationDatasets(
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
        execute: excuteFectchDownloadMetrics,
        data: downloadMetrics,
        isLoading: isFetchingDownloadMetrics,
    } = useHttpCall<{ [key: string]: any }>({});

    const fectchDownloadMetrics = (ids: number[]) =>
        excuteFectchDownloadMetrics(
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

    const isLoading =
        isFetchingOrganisationDatasets ||
        isFetchingMetaDataQulaity ||
        isFetchingDataFileQuality ||
        isFetchingSearchTerms ||
        isFetchingDownloadMetrics;

    return {
        organisation,
        organisationDatasets,
        metaDataQulaity,
        dataFileQuality,
        searchTerms,
        downloadMetrics,
        isLoading,
        setOrganisation,
        fectchOrganisationDatasets,
        fectchMetaDataQulaity,
        fectchDataFileQuality,
        fectchSearchTerms,
        fectchDownloadMetrics,
    };
};

export default OrganisationDetailVM;

export interface IOrganisationDetailVMContext {
    organisation: Organisation | undefined;
    organisationDatasets: any;
    metaDataQulaity: any;
    dataFileQuality: any;
    searchTerms: any;
    downloadMetrics: any;
    isLoading: boolean;
    fectchOrganisationDatasets: Function;
    fectchMetaDataQulaity: Function;
    fectchDataFileQuality: Function;
    fectchSearchTerms: Function;
    fectchDownloadMetrics: Function;
    setOrganisation: Dispatch<SetStateAction<Organisation | undefined>>;
}

export const OrganisationDetailVMContext =
    createContext<IOrganisationDetailVMContext>(
        {} as IOrganisationDetailVMContext
    );
