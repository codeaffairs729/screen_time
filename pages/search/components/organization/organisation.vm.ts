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
    buttonTags: ["open"],
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
        lastUpdate: DateTime.fromISO(new Date("12-25-2022").toISOString()),
    }));
};
