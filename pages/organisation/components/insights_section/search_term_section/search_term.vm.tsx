import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface SearchTermType {
    title: string;
    count: number;
    lastUsed: Date;
}

export enum searchTerms {
    top_10 = 10,
    top_25 = 25,
}

const SearchTermVM = () => {
    const [selectedSearchTerm, setSelectedSearchTerm] = useState<number>(10);
    const { organisation } = useContext(OrganisationDetailVMContext);

    useEffect(() => {
        fetchSearchTerms();
    }, [selectedSearchTerm]);

    const {
        execute: excuteFetchSearchTerms,
        data: searchTerms,
        isLoading: isFetchingSearchTerms,
        error,
    } = useHttpCall<{ [key: string]: any }>([]);
    const fetchSearchTerms = () =>
        excuteFetchSearchTerms(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${organisation?.uuid}/${selectedSearchTerm}`
                );
            },
            {
                postProcess: (res) => {
                    return jsonToSearchTerms(res);
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation search terms insights."
                    );
                },
            }
        );

    return {
        error,
        searchTerms,
        isFetchingSearchTerms,
        fetchSearchTerms,
        setSelectedSearchTerm,
    };
};

export default SearchTermVM;

interface ISearchTermVM {
    error: any;
    searchTerms: any;
    isFetchingSearchTerms: boolean;
    fetchSearchTerms: Function;
    setSelectedSearchTerm: Function;
}

export const SearchTermVMContext = createContext<ISearchTermVM>(
    {} as ISearchTermVM
);

const jsonToSearchTerms = (json: any): SearchTermType[] =>
    json.map((term: any) => {
        return {
            title: term["title"],
            count: term["count"],
            lastUsed: term["created_at"],
        };
    });
