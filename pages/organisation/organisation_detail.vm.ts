import { useHttpCall } from "common/hooks";
import Http, { HttpBuilder } from "common/http";
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
    use_cases,
    search_terms,
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
    const [orgDatasetsCount, setOrgDatasetsCount] = useState(7);
    const [pageNumber, setPageNumber] = useState(1);
    const [relatedProviders, setRelatedProviders] = useState();
    const [permittedPermissions, setPermittedPermissions] = useState();
    const insight_datasetQuality_description = [
        {title:"The metadata quality of all datasets of this organisation has been algorithmically estimated based on the"},
        {title:"The data quality of datasets of this organisation has been estimated based on user feedback (where available).Datasets rated based on overall data quality and individual dimensions are listed below."},
    ];
    const insight_searchTerm_description =
        "Search terms used to discover the datasets of the data provider";
    const insight_useCase_description =
        "Use cases of datasets gathered from user feedback aggregated on the data provider level.";
    const {
        isLoading: isFetchingRelatedProviders,
        execute: executeRelatedProvidersQuery,
    } = useHttpCall();
    const fetchRelatedProviders = () =>
        executeRelatedProvidersQuery(
            () => {
                return new HttpBuilder({
                    url: `/v1/data_sources/providers_for_homepage?offset=0&count=20`,
                    method: "GET",
                }).run({ retries: 0, tryRefreshingToken: false });
                // return Http.post(`/v1/users/signin`, data);
            },
            {
                onSuccess: (res: any) => {
                    setRelatedProviders(res);
                },
            }
        );
    useEffect(() => {
        if (orgDatasetsCount > 10) {
            fetchOrganisationDatasets();
        }
    }, [orgDatasetsCount]);

    const incrementOrgDatasetsCount = () =>
        setOrgDatasetsCount(orgDatasetsCount + 10);
    useEffect(() => {
        fetchOrganisationDatasets();
    }, [pageNumber]);
    const protocol = window.location.protocol || "http:";
    const host =
        window.location.hostname !== "localhost"
            ? window.location.hostname
            : "localhost:3000";
    const fullUrl = `${protocol}//${host}`;
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
                    `/api/datasets-by-data-host?orgUUID=${orgUUID}&pageNumber=${pageNumber}&orgDatasetsCount=${orgDatasetsCount}`,
                    {
                        baseUrl: fullUrl,
                    }
                );
            },
            {
                postProcess: (res) => {
                    return {
                        datasets: jsonToOrgDatasets(res["results"]),
                        total_matches: res["total_matches"],
                    };
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
        orgDatasetsCount,
        pageNumber,
        setPageNumber,
        setOrganisation,
        fetchOrganisationDatasets,
        incrementOrgDatasetsCount,
        fetchOrganisationRankedDatasets,
        isFetchingRelatedProviders,
        insight_datasetQuality_description,
        insight_searchTerm_description,
        insight_useCase_description,
    };
};

const GetRankedData = ({
    key,
    orgUUID,
}: {
    key: string;
    orgUUID: string | undefined;
}) => {
    const protocol = window.location.protocol || "http:";
    const host =
        window.location.hostname !== "localhost"
            ? window.location.hostname
            : "localhost:3000";
    const fullUrl = `${protocol}//${host}`;
    const { execute, data, isLoading, error } = useHttpCall<{
        [key: string]: any;
    }>([]);

    const fetch = () => {
        execute(
            () => {
                //TODO replace TempUUID with orgUUID when working with orginal providers related data instead of dummy data
                return Http.get(
                    `/api/datasets-ranked-by-factor?orgUUid=${orgUUID}&key=${key}`,
                    {
                        baseUrl: fullUrl,
                    }
                );
            },
            {
                postProcess: (res) => {
                    return jsonToOrgDatasets(
                        res["results"],
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
    orgDatasetsCount: any;
    incrementOrgDatasetsCount: Function;
    fetchOrganisationRankedDatasets: Function;
    fetchOrganisationDatasets: Function;
    pageNumber: number;
    setPageNumber: Function;
    setOrganisation: Dispatch<SetStateAction<Organisation | undefined>>;
    isFetchingOrganisationDatasets: boolean;
    isFetchingOrganisationRankedDatasets: boolean;
    permittedPermissions: any;
    setPermittedPermissions: Function;
    insight_datasetQuality_description: any;
    insight_searchTerm_description: any;
    insight_useCase_description: any;
}

export const OrganisationDetailVMContext =
    createContext<IOrganisationDetailVMContext>(
        {} as IOrganisationDetailVMContext
    );

const jsonToOrgDatasets = (jsons: any, isRanked = false, countKey = "views") =>
    jsons.map((json: any) => {
        const { dataset } = json || {};
        const { metrics } = dataset || {};
        const { global } = metrics || {};
        const data: any = {
            id: json?.id,
            uuid: dataset?.uuid,
            title: dataset?.title,
            description: dataset?.description,
            last_updated: dataset?.last_updated,
            total_matches: dataset?.total_matches,
            views: global?.views,
            downloads: global?.downloads,
            likes: global?.favourite_count,
        };

        if (isRanked) {
            data["count"] = global[countKey];
        }

        return data;
    });
