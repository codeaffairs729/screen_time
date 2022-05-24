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
                Http.get(`/v1/user-vocabulary-generator/random?domain=${activeDomain}`),
            {
                onSuccess: (res) => {
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
