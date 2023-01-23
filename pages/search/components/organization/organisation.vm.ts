import Http from "common/http";
import { Data } from "components/UI/result_card";
import { DateTime } from "luxon";
import Organisation from "models/organisation.model";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
export type Filter = {
    domains?: string[];
    topics?: string[];
    last_updated?: string[];
    file_formats?: string[];
    data_owners?: string[];
    metadata_quality?: string[];
    sort_by?: string[];
    usage_rights?: string[];
    keywords?: string[];
    data_hosts?: string[];
    update_frequency?: string[];
    start_date?: string[];
    end_date?: string[];
};

const OrganizationSearchVM = () => {
    const router = useRouter();
    const {
        query: { q },
    } = router;

    const [pageSize, setPageSize] = useState(20); // number of table in page
    const [currentPageNo, setCurrentPageNo] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(10); // pagination total pages
    const [activeFilter, setActiveFilter] = useState<Filter>({
        sort_by: ["relevance"],
    });
    const [queryParams, setQueryParams] = useState<string>("&sort_by=relevance");
    const [organisations, setOrganisations] = useState<Organisation[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);

    useEffect(() => {
        const getQueryParam = (key: keyof Filter): string => {
            if (
                key &&
                activeFilter[key] &&
                (activeFilter[key] as Array<string>).length > 0
            ) {
                const paramValues = activeFilter[key] ?? [];
                return paramValues
                    .map(
                        (v) =>
                            `${encodeURIComponent(key)}=${encodeURIComponent(
                                v
                            )}`
                    )
                    .join("&");
            }
            return "";
        };
        const filterActive = Object.keys(activeFilter).some((key: string) =>
            key === "sort_by"
                ? !activeFilter[key]?.includes("relevance")
                : activeFilter[key as keyof Filter]?.length
        );
        let cQueryParams = Object.keys(activeFilter)
            .map((k) => getQueryParam(k as keyof Filter))
            .filter((qp) => qp)
            .join("&");

        setQueryParams(cQueryParams ? `&${cQueryParams}` : "");
    }, [activeFilter]);
    const { data, error : organisationError}: any = useSWR(
        q
            ? `/v1/data_sources/?search_query=${q}&page_size=${pageSize}&page_num=${currentPageNo}${queryParams}`
            : null,
        (url: string) => {
            Http.get(url)
                .then((res: any) => {
                    const { data_providers = [], total_records = 0 } =
                        res || {};

                    setTotalRecords(total_records);
                    setOrganisations(Organisation.fromJsonList(data_providers));

                    return Organisation.fromJsonList(data_providers);
                })
                .catch((e: any) => {
                    toast.error(
                        "Something went wrong while fetching search results"
                    );
                }),
                { revalidateOnFocus: false };
        }
    );
    const isFetchingOrganisation = !totalRecords && !organisationError;
    useEffect(() => {
        const len = organisations?.length || 0;

        setTotalPages(pageSize ? Math.ceil(len / pageSize) : 0);
    }, [pageSize]);

    return {
        currentPageNo,
        setCurrentPageNo,
        totalPages,
        organisations: organisations || [],
        setPageSize,
        pageSize,
        totalRecords,
        activeFilter,
        setActiveFilter,
        isFetchingOrganisation
    };
};

export default OrganizationSearchVM;

interface IOrganizationSearchVMContext {
    organisations: any;
    currentPageNo: number;
    setCurrentPageNo: (pageNo: number) => void;
    totalPages: number;
    setPageSize: (pageNo: number) => void;
    pageSize: number;
    totalRecords: number;
    activeFilter: any;
    setActiveFilter: Function;
    isFetchingOrganisation: boolean;
}

export const OrganizationSearchVMContext = createContext(
    {} as IOrganizationSearchVMContext
);

export const organisationToResultCardData = (organisations: any): Data[] => {
    if (!organisations?.length) {
        return [];
    }

    return organisations?.map((organisation: any) => ({
        ...organisation,
        id: organisation?.uuid,
        recordType: "organisation",
    }));
};
