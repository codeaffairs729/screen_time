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
const OrganizationSearchVM = () => {
    let datasets: any = [
        {
            id: 1,
            title: "Public Health Scotland",
            description:
                "Featured Public Health Scotland Metadata Quality Open Commercial The Scottish Health and Social Care open data platform gives access to statistics and ference data for information and re-use. This platform is managed by Public Health Scotland",
            dataQuality: 2,
            buttonTags: ["open"],
            topics: ["health"],
            domains: ["test"],
            stats: {
                datasetsCount: 1,
                favoritesCount: 2,
                viewCount: 4,
                downloadCount: 1,
            },
        },
        {
            id: 2,
            title: "Test Public Health Scotland",
            description:
                "Featured Public Health Scotland Metadata Quality Open Commercial The Scottish Health and Social Care open data platform gives access to statistics and ference data for information and re-use. This platform is managed by Public Health Scotland",
            dataQuality: 2,
            buttonTags: ["open"],
            topics: ["health"],
            domains: ["test"],
            stats: {
                datasetsCount: 1,
                favoritesCount: 2,
                viewCount: 4,
                downloadCount: 1,
            },
        },
    ];
    const len = datasets.length;
    const [pageSize, setPageSize] = useState(4); // number of table in page
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(2); // pagination total pages
    const [activeFilter, setActiveFilter] = useState<Filter>({
        sort_by: ["relevance"],
    });

    useEffect(() => {
        setTotalPages(Math.ceil(len / pageSize));
    }, [pageSize]);
    const lastindex = currentPageNo * pageSize;
    const firstindex = lastindex - pageSize;

    datasets = datasets.slice(firstindex, lastindex);

    return {
        currentPageNo,
        setCurrentPageNo,
        totalPages,
        datasets,
        setPageSize,
        pageSize,
    };
};

export default OrganizationSearchVM;

interface IOrganizationSearchVMContext {
    datasets: any;
    currentPageNo: number;
    setCurrentPageNo: (pageNo: number) => void;
    totalPages: number;
    setPageSize: (pageNo: number) => void;
    pageSize: number;
}

export const OrganizationSearchVMContext = createContext(
    {} as IOrganizationSearchVMContext
);
