import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";

const NewKeywordVM = (
    activeDomain: string,
    setKeyword: (arg0: string) => void
) => {
    // use the API for fetching new keyword.
    const { execute: executeFetchNewKeyword, isLoading: isFetchingNewkeyword } =
        useHttpCall();
    const fetchNewKeyword = () => {
        executeFetchNewKeyword(
            () =>
                Http.get(`/random?domain=${activeDomain}`, {
                    baseUrl: "http://127.0.0.1:8000/api",
                }),
            {
                onSuccess: (res) => {
                    console.log(res);
                    setKeyword(res.keyword);
                },
                onError: (e) =>
                    toast.error(
                        "Something went wrong while adding the data source."
                    ),
            }
        );
    };

    return { fetchNewKeyword, isFetchingNewkeyword };
};

export default NewKeywordVM;
