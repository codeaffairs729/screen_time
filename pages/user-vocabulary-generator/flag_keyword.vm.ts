import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";

const FlagKeywordVM = (
    user: any,
    keyword: string,
    activeDomain: string,
    setKeyword: (arg0: string) => void
) => {
    const { execute: executeFlagKeyword, isLoading: isFlaggingKeyword } =
        useHttpCall();
    const registerFlagKeyword = () => {
        executeFlagKeyword(
            () =>
                Http.post(
                    `/v1/user-vocabulary-generator/flag?domain=${activeDomain}`,
                    {
                        keyword: keyword,
                        user_id: user.email,
                        keyword_domain_name: activeDomain,
                    }
                ),
            {
                onSuccess: (res) => {
                    setKeyword(res.keyword);
                    toast.success("The keyword has been flagged.");
                },
                onError: (e) =>
                    toast.error(
                        "Something went wrong while adding the data source."
                    ),
            }
        );
    };

    return { registerFlagKeyword, isFlaggingKeyword };
};

export default FlagKeywordVM;
