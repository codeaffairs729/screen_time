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
            featured: true,
            name: "Public Health Scotland",
            description:
                "Featured Public Health Scotland Metadata Quality Open Commercial The Scottish Health and Social Care open data platform gives access to statistics and ference data for information and re-use. This platform is managed by Public Health Scotland",
            dataQuality: 2,
            button_tag: ["open"],
        },
        {
            id: 2,
            featured: false,
            name: "Care Inspectorate",
            description:
                "Inspectorate Meta data Quality Open The Care Inspectorate is a scrutiny body which supports improvement. They look at the quality of care in Scotland to ensure it meets high standards. Where improvement is needed, support services are provided to make positive changes The Care Inspectorate is a scrutiny body which supports improvement. They look at the quality of care in Scotland to ensure it meets high standards. Where improvement is needed, support services are provided to make positive changes…more",
            dataQuality: 3,
            button_tag: ["open"],
        },
        {
            id: 3,
            featured: false,
            name: "Ordnance Survey",
            description:
                "Inspectorate Meta data Quality Open The Care Inspectorate is a scrutiny body which supports improvement. They look at the quality of care in Scotland to ensure it meets high standards. Where improvement is needed, support services are provided to make positive changes The Care Inspectorate is a scrutiny body which supports improvement. They look at the quality of care in Scotland to ensure it meets high standards. Where improvement is needed, support services are provided to make positive changes…more",
            dataQuality: 4,
            button_tag: ["open", "commercial"],
        },
        {
            id: 4,
            featured: false,
            name: "Care Inspectorate",
            description:
                "Featured Public Health Scotland Metadata Quality Open Commercial The Scottish Health and Social Care open data platform gives access to statistics and ference data for information and re-use. This platform is managed by Public Health Scotland",
            dataQuality: 5,
            button_tag: ["open"],
        },
        {
            id: 5,
            featured: false,
            name: "Public Health Scotland",
            description:
                "Featured Public Health Scotland Metadata Quality Open Commercial The Scottish Health and Social Care open data platform gives access to statistics and ference data for information and re-use. This platform is managed by Public Health Scotland",
            dataQuality: 4,
            button_tag: ["open", "commercial"],
        },
        {
            id: 6,
            featured: true,
            name: "Care Inspectorate",
            description:
                "Inspect  orate Meta data Quality Open The Care Inspectorate is a scrutiny body which supports improvement. They look at the quality of care in Scotland to ensure it meets high standards. Where improvement is needed, support services are provided to make positive changes The Care Inspectorate is a scrutiny body which supports improvement. They look at the quality of care in Scotland to ensure it meets high standards. Where improvement is needed, support services are provided to make positive changes…more",
            dataQuality: 3,
            button_tag: ["open"],
        },
        {
            id: 7,
            featured: false,
            name: "Ordnance Survey",
            description:
                "Inspe ctorate Meta data Quality Open The Care Inspectorate is a scrutiny body which supports improvement. They look at the quality of care in Scotland to ensure it meets high standards. Where improvement is needed, support services are provided to make positive changes The Care Inspectorate is a scrutiny body which supports improvement. They look at the quality of care in Scotland to ensure it meets high standards. Where improvement is needed, support services are provided to make positive changes…more",
            dataQuality: 2,
            button_tag: ["open"],
        },
        {
            id: 8,
            featured: false,
            name: "Care Inspectorate",
            description:
                "Featured Public Health Scotland Metadata Quality Open Commercial The Scottish Health and Social Care open data platform gives access to statistics and ference data for information and re-use. This platform is managed by Public Health Scotland",
            dataQuality: 1,
            button_tag: ["open"],
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
