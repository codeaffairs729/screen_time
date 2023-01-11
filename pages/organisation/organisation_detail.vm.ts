import { useHttpCall } from "common/hooks";
import Http from "common/http";
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

    const {
        execute: excuteFectchOrganisationDatasets,
        data: organisationDatasets,
        isLoading: isFetchingOrganisationDatasets,
    } = useHttpCall<{ [key: string]: any }>({});

    const fectchOrganisationDatasets = (id: number) =>
        excuteFectchOrganisationDatasets(
            () => {
                // return Http.get(`/v1/data_provider/${1}/orgDatsets`);
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
        organisationDatasets: jsonToOrgDatasets(orgDatasets), //Only for test purpose,
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

const orgDatasets = {
    all_datasets: [
        {
            id: 1,
            title: "2011 Output Area code, old to new",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
        },
        {
            id: 2,
            title: "Frozen Postcode 2011 to Workplace Zone 2011",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
        },
        {
            id: 3,
            title: "2011 Output Area code, old to new",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
        },
    ],
    downloaded: [
        {
            id: 1,
            title: "2011 Output Area code, old to new",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
            count: 125,
        },
        {
            id: 2,
            title: "Frozen Postcode 2011 to Workplace Zone 2011",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
            count: 56,
        },
        {
            id: 3,
            title: "2011 Output Area code, old to new",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
            count: 125,
        },
    ],
    viewed: [
        {
            id: 1,
            title: "2011 Output Area code, old to new",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
            count: 125,
        },
        {
            id: 2,
            title: "Frozen Postcode 2011 to Workplace Zone 2011",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
            count: 56,
        },
        {
            id: 3,
            title: "2011 Output Area code, old to new",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
            count: 125,
        },
    ],
    added_to_favourite: [
        {
            id: 1,
            title: "2011 Output Area code, old to new",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
            count: 125,
        },
        {
            id: 2,
            title: "Frozen Postcode 2011 to Workplace Zone 2011",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
            count: 56,
        },
        {
            id: 3,
            title: "2011 Output Area code, old to new",
            description:
                "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
            count: 125,
        },
    ],
};
