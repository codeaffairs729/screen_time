import { Data } from "components/UI/result_card";
import { DateTime } from "luxon";
import { createContext, useContext, useEffect, useState } from "react";
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

const DATASET = {
    title: "Public Health Scotland",
    description:
        "Featured Public Health Scotland Metadata Quality Open Commercial The Scottish Health and Social Care open data platform gives access to statistics and ference data for information and re-use. This platform is managed by Public Health Scotland",
    dataQuality: 2,
    licenseTypes: ["open"],
    topics: ["health"],
    domains: ["test"],
    stats: {
        datasetsCount: 1,
        favoritesCount: 2,
        viewCount: 4,
        downloadCount: 1,
    },
};

const TOTAL_RECORDS = 200;
const OrganizationSearchVM = () => {
    let organisations: any = Array(TOTAL_RECORDS)
        .fill(1)
        .map((x, y) => x + y)
        .map((index) => ({
            id: index,
            ...DATASET,
        }));
    const len = organisations.length;
    const [pageSize, setPageSize] = useState(20); // number of table in page
    const [currentPageNo, setCurrentPageNo] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(2); // pagination total pages
    const [activeFilter, setActiveFilter] = useState<Filter>({
        sort_by: ["relevance"],
    });

    useEffect(() => {
        setTotalPages(Math.ceil(len / pageSize));
    }, [pageSize]);
    const lastindex = currentPageNo * pageSize;
    const firstindex = lastindex - pageSize;

    organisations = organisations.slice(firstindex, lastindex);
    // const [organisationSearchData , setOrganisationSearchData] = useState<Organisation[]>()
    // const { data , error } = useSWR(
    //     q
    //         ? `/v4/datasets/organisation/?search_query=${q}&page_size=${pageSize}&page_num=${currentPageNo}${queryParams}`
    //         : null,
    //     (url: string) => {
    //         Http.get(url, {
    //             baseUrl: `${process.env.NEXT_PUBLIC_PUBLIC_API_ROOT}`,
    //         })
    //             .catch((e) => {
    //                 setLoading(false);
    //                 toast.error(
    //                     "Something went wrong while fetching search results"
    //                 );
    //                 throw e;
    //             })
    //             .finally(() => {
    //                 let datasets = Array(20)
    //                     .fill(1)
    //                     .map((x, y) => x + y)
    //                     .map((index) => ({
    //                         id: index,
    //                         ...DATASET,
    //                     }));
    //                 const totalRecords = datasets.length;
    //                 setTotalPages(
    //                     totalRecords
    //                         ? Math.ceil(totalRecords / pageSize)
    //                         : totalRecords
    //                 );
    //                 let organisationSearchData =
    //                     Organisation.fromJsonList(datasets);
    //                 const lastindex = currentPageNo * pageSize;
    //                 const firstindex = lastindex - pageSize;
    //                 organisationSearchData = organisationSearchData.slice(
    //                     firstindex,
    //                     lastindex
    //                 );
    //                 console.log("SWR is working", organisationSearchData);
    //                 setOrganisationSearchData(organisationSearchData)
    //                 return organisationSearchData;
    //             });
    //     }
    // );
    // console.log("organisationSearchData outside :", organisationSearchData);
    return {
        currentPageNo,
        setCurrentPageNo,
        totalPages,
        organisations,
        setPageSize,
        pageSize,
        totalRecords: TOTAL_RECORDS,
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
        recordType: "organisation",
    }));
};
