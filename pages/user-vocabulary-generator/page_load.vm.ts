import { useEffect } from "react";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";

const PageLoadVM = (
    setKeyword: (arg0: string) => void,
    setKeywordDomains: (arg0: string[]) => void,
    setActiveDomain: (arg0: string) => void
) => {
    useEffect(() => {
        fetchPageLoad();
    }, []);

    // use the API for Initial page load to get keyword, and categories.
    const { execute: executePageLoad, isLoading: isPageLoading } =
        useHttpCall();
    const fetchPageLoad = () => {
        executePageLoad(
            () =>
                Http.get("/v1/user-vocabulary-generator/onload"),
            {
                onSuccess: (res) => {
                    setKeyword(res.keyword);
                    setKeywordDomains(res.keyword_domains);
                    setActiveDomain(res.default_domain);
                },
                onError: (e) =>
                    toast.error(
                        "Something went wrong while adding the data source."
                    ),
            }
        );
    };

    return { isPageLoading };
};

export default PageLoadVM;
