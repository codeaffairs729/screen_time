import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PageLoadVM = () => {
    const form = useForm();
    // use the API for Initial page load to get keyword, and categories.
    const { execute: executeInitialPageLoad, isLoading: isFlaggingKeyword } =
        useHttpCall();
    const fetchInitalPageLoad = (data: any) => {
        console.log(data, "Page Load VM");
    };
    // executeInitialPageLoad(() => Http.post("/v1/API", data), {
    //     onSuccess: (res) =>
    //         toast.success("The keyword has been flagged."),
    //     onError: (e) =>
    //         toast.error(
    //             "Something went wrong while adding the data source."
    //         ),
    // });

    return { form, fetchInitalPageLoad, isFlaggingKeyword };
};

export default PageLoadVM;
