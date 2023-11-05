import Http from "common/http";
import { Data } from "components/UI/result_card";
import { Console } from "console";
import { DateTime } from "luxon";
import Organisation from "models/organisation.model";
import Topic from "models/topics.model";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
export type Filter = {
    domains?: string[];
    topics?: string[];
    last_updated?: string[];
    file_formats?: string[];
    data_owner?: string[];
    metadata_quality?: string[];
    sort_by?: string[];
    usage_rights?: string[];
    keywords?: string[];
    data_host?: string[];
    update_frequency?: string[];
    start_date?: string[];
    end_date?: string[];
};

const TopicSearchVM = () => {
    const router = useRouter();
    const {
        query: { q },
    } = router;
    const [pageSize, setPageSize] = useState(20); // number of table in page
    const [currentPageNo, setCurrentPageNo] = useState<number>(
        router.query.page ? parseInt(router.query.page as string) : 1
    );
    const [totalPages, setTotalPages] = useState<number>(1); // pagination total pages
    const [activeFilter, setActiveFilter] = useState<Filter>({
        sort_by: ["relevance"],
    });
    const [queryParams, setQueryParams] =
        useState<string>("&sort_by=relevance");
    const [topics, setTopics] = useState<Topic[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
        };

        // Call handleResize on initial component render
        handleResize();

        // Add event listener to window resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
        setLoading(true);
    }, [activeFilter]);

    const {
        data,
        error: organisationError,
        isValidating,
    }: any = useSWR(
        q
            ? `/v1/topics/?search_query=${q}&page_size=${pageSize}&page_num=${currentPageNo}${queryParams}`
            : `/v1/topics/?search_query=&page_size=${pageSize}&page_num=${currentPageNo}${queryParams}`,
        async (url: string) => {
            setLoading(true);
            try {
                const res = await Http.get(url);
                const { topics = [], total_records = 0 } = res[0] || {};

                setTotalRecords(total_records);
                setTotalPages(Math.ceil(total_records / pageSize));
                setTopics(Topic.fromJsonList(topics));
                setLoading(false);
                return Topic.fromJsonList(topics);
            } catch (e) {
                setLoading(false);
                toast.error(
                    "Something went wrong while fetching search results"
                );
            }
        },
        { revalidateOnFocus: false }
    );

    const isFetchingOrganisation = !!(
        (!totalRecords && !organisationError && topics?.length) ||
        loading
    );

    // useEffect(() => {
    //     const len = organisations?.length || 0;

    //     setTotalPages(pageSize ? Math.ceil(len / pageSize) : 0);
    // }, [pageSize]);

    useEffect(() => {
        // if (router.pathname === "/search/organisation") {
        //     const url = new URL(window.location.href);
        //     const params = new URLSearchParams(url.search);

        //     params.set("page", `${currentPageNo}`);

        //     // Replace the current URL with the updated URL
        //     window.history.replaceState({}, "", `${url.pathname}?${params}`);
        // }
        if (currentPageNo.toString() != router.query?.page) {
            router.replace({
                query: { ...router.query, page: currentPageNo },
            });
        }
    }, [currentPageNo]);

    useEffect(() => {
        setLoading(true);
    }, [currentPageNo]);

    return {
        currentPageNo,
        setCurrentPageNo,
        totalPages,
        topics: topics,
        setPageSize,
        pageSize,
        totalRecords,
        activeFilter,
        setActiveFilter,
        isFetchingOrganisation,
        setLoading,
        isMobile,
    };
};

export default TopicSearchVM;

interface IOrganizationSearchVMContext {
    topics: any;
    currentPageNo: number;
    setCurrentPageNo: (pageNo: number) => void;
    totalPages: number;
    setPageSize: (pageNo: number) => void;
    pageSize: number;
    totalRecords: number;
    activeFilter: any;
    setActiveFilter: Function;
    isFetchingOrganisation: boolean;
    setLoading: Function;
    isMobile: boolean;
}

export const TopicSearchVMContext = createContext(
    {} as IOrganizationSearchVMContext
);


export const topicToResultCardData = (topics: any): any => {

    if (!topics?.length) {
        return [];
    }
    return topics?.map((topic: any) => ({
        ...topic,
        recordType: "topic",
    }));
};