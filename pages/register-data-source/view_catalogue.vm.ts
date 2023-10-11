import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import { createContext, useState } from "react";

const ViewCatalogueVM = () => {
    const [pageNo, setPageNo] = useState<number>(1);
    const [dataPerPage, setDataPerPage] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>();
    const {
        execute: executeCatalouge,
        data: catalouge,
        isLoading: isFetchingCatalouge,
        error,
    } = useHttpCall<{ [key: string]: any }>([]);
    const fetchCatalogue = () =>
        executeCatalouge(
            () => {
                return Http.get(
                    `/v1/data_sources/catalogues?page_num=${pageNo}&count=${dataPerPage}`
                );
            },
            {
                postProcess: (res) => {
                    setTotalPages(res.total_pages)
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching catalogues."
                    );
                },
            }
        );
    return {
        catalouge,
        isFetchingCatalouge,
        fetchCatalogue,
        error,
        totalPages,
        setTotalPages,
        pageNo,
        setPageNo,
        dataPerPage,
        setDataPerPage,
    };
};

export default ViewCatalogueVM;

interface ViewCatalogueVMContext {
    catalouge: any;
    isFetchingCatalouge: any;
    fetchCatalogue: any;
    error: any;
    totalPages: any;
    setTotalPages: any;
    pageNo:any;
    setPageNo:any;
    dataPerPage:any;
    setDataPerPage:any;
}

export const ViewCatalogueVMContext = createContext<ViewCatalogueVMContext>(
    {} as ViewCatalogueVMContext
);
