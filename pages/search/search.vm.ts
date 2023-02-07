import Http from "common/http";
import { SearchOption } from "components/UI/dataset_search_input";
import { isEqual } from "lodash-es";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SingleValue } from "react-select";
import { updateCache } from "store/cache/cache.action";
import useSWR from "swr";
import Dataset from "../../models/dataset.model.v4";
import { usereventSearchQueryResults } from "services/usermetrics.service";
import { useHttpCall } from "common/hooks";
import DatasetStats from "models/dataset_stats.model";
import { RootState } from "store";
import Datasets from "pages/organisation/components/datasets";
import { Data } from "components/UI/result_card";

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

const SearchVM = (search = true) => {
    const router = useRouter();
    const {
        query: { q },
    } = router;
    const dispatch = useDispatch();

    const [activeFilter, setActiveFilter] = useState<Filter>({
        sort_by: ["relevance"],
    });
    const [filterOptions, setFilterOptions] = useState<Filter>({});
    const [queryParams, setQueryParams] =
        useState<string>("&sort_by=relevance");
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    /**
     * Update the query params on updating any filter
     */
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

        setIsFilterActive(filterActive);
        setQueryParams(cQueryParams ? `&${cQueryParams}` : "");
    }, [activeFilter]);

    /**
     * Fired when the term on the search input on the search page is changed
     */
    const onSearchChange = (
        type: string,
        option: SingleValue<SearchOption>
    ) => {
        if (!option) return;
        const searchType = type === "dataset" ? "" : type;

        dispatch(updateCache("last-search-query", option.value));
        setCurrentPageNo(1);
        router.push({
            pathname: `/search/${searchType}`,
            query: { q: option.value },
        });
    };

    /**
     * Reset all the filters and data search results
     */
    const resetAllFilters = () => {
        if (isFilterActive) {
            const updatedFilters = Object.keys(activeFilter).reduce(
                (pv: Filter, cv: string) => ({
                    ...pv,
                    [cv]: cv == "sort_by" ? ["relevance"] : [],
                }),
                {}
            );
            setLoading(true);
            setActiveFilter(updatedFilters);
        }
    };

    /**
     * Fetch stats for datasets to highlight favourite status
     */
    const {
        execute: excuteFectchStats,
        data: stats,
        isLoading: isFetchingStats,
    } = useHttpCall<{ [key: string]: any }>({});
    const fectchStats = (ids: number[]) =>
        excuteFectchStats(
            () =>
                Http.post("/v1/datasets/stats", {
                    meta_dataset_ids: ids,
                }),
            {
                postProcess: (res) => {
                    const o: { [key: string]: DatasetStats } = {};
                    Object.keys(res).map(
                        (id) =>
                            (o[id] = DatasetStats.fromJson({
                                ...res[id],
                                dataset_id: id,
                            }))
                    );
                    return o;
                },
            }
        );

    /**
     * Get search results
     * TODO: uriencode searchquery, pagenum and pagesize
     */
    const { data: datasets, error } = useSWR(
        q && search
            ? `/v4/datasets/?search_query=${q}&page_size=${pageSize}&page_num=${currentPageNo}${queryParams}`
            : null,
        (url: string) =>
            Http.get(url, {
                baseUrl: `${process.env.NEXT_PUBLIC_PUBLIC_API_ROOT}`,
                redirectToLoginPageIfAuthRequired: false,
            })
                .catch((e) => {
                    setLoading(false);
                    toast.error(
                        "Something went wrong while fetching search results"
                    );
                    throw e;
                })
                .then((res) => {
                    setLoading(false);
                    // setCurrentPageNo(res[0]["user_search"][0]["pagenum"]);
                    const totalRecords = res[0]["user_search"][0]["total"];
                    setTotalPages(
                        totalRecords
                            ? Math.ceil(totalRecords / pageSize)
                            : totalRecords
                    );
                    setTotalRecords(totalRecords);
                    const resFitlerOptions =
                        res[0]["user_search"][0]["filter_options"];
                    setFilterOptions({
                        domains: resFitlerOptions["domains"],
                        file_formats: resFitlerOptions["file_formats"],
                        data_owners: resFitlerOptions["data_owners"],
                        topics: resFitlerOptions["topics"],
                        usage_rights: resFitlerOptions["usage_rights"],
                        keywords: resFitlerOptions["keywords"],
                        data_hosts: resFitlerOptions["data_hosts"],
                        update_frequency: resFitlerOptions["update_frequency"],
                    });

                    const datasets = Dataset.fromJsonList(
                        res[0]["user_search"][0]["results"]
                    );
                    const datasetIds = datasets.map((dataset) => dataset.id);
                    if (datasetIds.length) {
                        fectchStats(datasetIds);
                    }
                    return datasets;
                })
                .then((datasets) => {
                    setLoading(false);
                    updateDisplayCount(datasets.map((d) => d.id));
                    usereventSearchQueryResults(
                        q,
                        datasets.map((d) => d.id)
                    );
                    return datasets;
                })
                .catch((e) => {
                    setLoading(false);
                    console.error(e);
                    throw e;
                }),
        { revalidateOnFocus: false }
    );

    /**
     * Update the display count when the datasets appear in the search result
     */
    const updateDisplayCount = (datasetIds: number[]) => {
        return Http.post("/v1/datasets/displays", {
            meta_dataset_ids: datasetIds,
        });
    };

    return {
        datasets,
        error,
        isLoading: (!datasets && !error) || loading,
        onSearchChange,
        activeFilter,
        setActiveFilter,
        currentPageNo,
        setCurrentPageNo,
        totalPages,
        filterOptions,
        setFilterOptions,
        resetAllFilters,
        isFilterActive,
        isFetchingStats,
        stats,
        fectchStats,
        pageSize,
        totalRecords,
        setPageSize,
    };
};

interface ISearchVMContext {
    datasets: Dataset[] | undefined | void;
    error: any;
    isLoading: boolean;
    totalRecords: number;
    onSearchChange: Function;
    activeFilter: Filter;
    setActiveFilter: Function;
    filterOptions: Filter;
    setFilterOptions: Function;
    currentPageNo: number;
    fectchStats: Function;
    setCurrentPageNo: (pageNo: number) => void;
    totalPages: number;
    resetAllFilters: Function;
    isFilterActive: boolean;
    isFetchingStats: boolean;
    stats: { [key: string]: DatasetStats };
    pageSize: number;
    setPageSize: Function;
}

export default SearchVM;

export const SearchVMContext = createContext({} as ISearchVMContext);

export interface FilterOptionItem {
    value: string;
    label: string;
    checkbox: boolean | string;
}
export interface FilterOptions {
    [key: string]: FilterOptionItem[];
}

export const useSearchFilter = ({
    name,
    filterOptionItems,
}: {
    name: keyof Filter;
    filterOptionItems: FilterOptionItem[] | undefined;
}) => {
    const { activeFilter, setActiveFilter } = useContext(SearchVMContext);
    const { control, register, watch, reset } = useForm<FilterOptions>();
    const { fields, replace, update } = useFieldArray({ control, name });

    useEffect(() => {
        if (!filterOptionItems) return;
        replace(
            filterOptionItems?.map((f) => ({
                ...f,
                checkbox: (activeFilter?.[name] ?? []).includes(f.value)
                    ? f.value
                    : false,
            }))
        );
    }, [filterOptionItems]);

    useEffect(() => {
        const subscription = watch((formState) => {
            const currentFilterState = formState[name];
            const newFilterState = currentFilterState
                ?.filter((f) => f)
                .filter((f) => f?.checkbox)
                .map((f) => f?.value);
            setActiveFilter((state: Filter) => ({
                ...state,
                [name]: newFilterState,
            }));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return { control, register, fields, replace };
};

export const datasetToResultCardData = (datasets: any, stats: any): Data[] => {
    if (!datasets?.length) {
        return [];
    }

    return datasets?.map((dataset: any) => ({
        id: dataset.id,
        title: dataset.detail.name,
        recordType: "datasets",
        description: dataset.detail.description,
        dataQuality: dataset.detail.dataQuality,
        licenseTypes: ["open"],
        topics: dataset.detail.topics,
        isFavourited: stats[dataset.id]?.isFavourited,
        lastUpdate: dataset.detail.lastUpdate,
        domains:
            typeof dataset.detail.domain === "string"
                ? [dataset.detail.domain]
                : dataset.detail.domain, //Some dataset are fetching from older version api need to update it in future
        dataProviders: {
            organisation: dataset.owner.organisation,
            hostName: dataset.detail.hostName,
        },
    }));
};
