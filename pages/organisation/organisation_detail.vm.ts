import { useHttpCall } from "common/hooks";
import Http from "common/http";
import Organisation from "models/organisation.model";
import {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";
import toast from "react-hot-toast";

export enum insightTabIndex {
    dataset_quality,
    search_term,
    download_metrics,
}

export const formatLabel = (label: string) => {
    const res = label.replaceAll("_", " ");
    return `${res[0].toUpperCase()}${res.slice(1)}`;
};

export const getSelectedLabelIndex = (label: string, types: any) => {
    return types[label];
};

// const TempUUID = "eb71822d-e53f-54fc-afc0-a578f40343ec";

const OrganisationDetailVM = (
    initialOrganisationData: Organisation | undefined,
    orgUUID: String | undefined
) => {
    const [organisation, setOrganisation] = useState(initialOrganisationData);
    const [orgDatasetsCount, setOrgDatasetsCount] = useState(10);

    useEffect(() => {
        if (orgDatasetsCount > 10) {
            fetchOrganisationDatasets();
        }
    }, [orgDatasetsCount]);

    const incrementOrgDatasetsCount = () =>
        setOrgDatasetsCount(orgDatasetsCount + 10);

    const {
        execute: excuteFetchOrganisationDatasets,
        data: organisationDatasets,
        isLoading: isFetchingOrganisationDatasets,
        error: errorOrganisationDatasets,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchOrganisationDatasets = () =>
        excuteFetchOrganisationDatasets(
            () => {
                return Http.get(
                    `/v5/datasets/by-data-host/${orgUUID}?page_number=1&page_size=${orgDatasetsCount}`,
                    { baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT }
                );
            },
            {
                postProcess: (res) => {
                    return jsonToOrgDatasets(
                        res[0]["user_search"][0]["results"]
                    );
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation datasets."
                    );
                },
            }
        );

    const {
        data: topDownloaded,
        isLoading: isFetchingtopDownloaded,
        fetch: fetchTopDownloaded,
        error: errorTopDownloaded,
    } = GetRankedData({
        key: "download_count",
        orgUUID: organisation?.uuid,
    });

    const {
        data: topViewed,
        isLoading: isFetchingTopViewed,
        fetch: fetchTopViewed,
        error: errorTopViewed,
    } = GetRankedData({
        key: "view_count",
        orgUUID: organisation?.uuid,
    });

    const {
        data: topFavourited,
        isLoading: isFetchingTopFavourited,
        fetch: fetchTopFavourited,
        error: errorTopFavourited,
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
    const error = errorTopDownloaded || errorTopViewed || errorTopFavourited;

    const fetchOrganisationRankedDatasets = () => {
        fetchTopDownloaded();
        fetchTopFavourited();
        fetchTopViewed();
    };

    return {
        errorOrganisationDatasets,
        error,
        organisation,
        organisationRankedDatasets,
        organisationDatasets,
        isFetchingOrganisationDatasets,
        isFetchingOrganisationRankedDatasets,
        setOrganisation,
        fetchOrganisationDatasets,
        incrementOrgDatasetsCount,
        fetchOrganisationRankedDatasets,
    };
};

const GetRankedData = ({
    key,
    orgUUID,
}: {
    key: string;
    orgUUID: string | undefined;
}) => {
    const { execute, data, isLoading, error } = useHttpCall<{
        [key: string]: any;
    }>([]);

    const fetch = () => {
        execute(
            () => {
                //TODO replace TempUUID with orgUUID when working with orginal providers related data instead of dummy data
                return Http.get(`/v5/datasets/${orgUUID}/ranked-by/${key}`, {
                    baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT,
                });
            },
            {
                postProcess: (res) => {
                    return jsonToOrgDatasets(
                        res[0]["user_search"][0]["results"],
                        true,
                        getCountKey()
                    );
                },
                onError: (e) => {
                    // toast.error(
                    //     "Something went wrong while fetching organisation datasets."
                    // );
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
        error,
    };
};
export default OrganisationDetailVM;

export interface IOrganisationDetailVMContext {
    errorOrganisationDatasets: any;
    error: any;
    organisation: Organisation | undefined;
    organisationDatasets: any;
    organisationRankedDatasets: any;
    incrementOrgDatasetsCount: Function;
    fetchOrganisationRankedDatasets: Function;
    fetchOrganisationDatasets: Function;
    setOrganisation: Dispatch<SetStateAction<Organisation | undefined>>;
    isFetchingOrganisationDatasets: boolean;
    isFetchingOrganisationRankedDatasets: boolean;
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

        if (isRanked) {
            data["count"] = global[countKey];
        }

        return data;
    });
