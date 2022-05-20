import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const FlagKeywordVM = () => {
    const form = useForm();
    // use the API for flagging the keyword.
    const { execute: executeFlagKeyword, isLoading: isFlaggingKeyword } =
        useHttpCall();
    const registerFlagKeyword = (data: any) => {
        console.log(data, "FlagKeyword VM");
    };
    // executeFlagKeyword(() => Http.post("/v1/API", data), {
    //     onSuccess: (res) =>
    //         toast.success("The keyword has been flagged."),
    //     onError: (e) =>
    //         toast.error(
    //             "Something went wrong while adding the data source."
    //         ),
    // });

    return { form, registerFlagKeyword, isFlaggingKeyword };
};

export default FlagKeywordVM;
