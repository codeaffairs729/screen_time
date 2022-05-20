import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NewKeywordVM = () => {
    const form = useForm();
    // use the API for fetching new keyword.
    const { execute: executeFetchNewKeyword, isLoading: isFetchingNewkeyword } =
        useHttpCall();
    const fetchNewKeyword = (data: any) => {
        console.log(data, "New Keyword");
    };
    // executeFetchNewKeyword(
    //     () => Http.post("/v1/datasets/data_sources", data),
    //     {
    //         onSuccess: (res) =>
    //             toast.success("The data source was successfully added."),
    //         onError: (e) =>
    //             toast.error(
    //                 "Something went wrong while adding the data source."
    //             ),
    //     }
    // );

    return { form, fetchNewKeyword, isFetchingNewkeyword };
};

export default NewKeywordVM;
