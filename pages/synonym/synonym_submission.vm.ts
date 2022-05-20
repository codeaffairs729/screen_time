import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ErrorAlert from "components/UI/alerts/error_alert";

const SubmitSynonymVM = () => {
    const form = useForm();

    const user = useSelector((state: RootState) => state.auth.user);

    // use the API for submitting the synonym
    const {
        execute: executeSubmitSynonym,
        isLoading: isSubmittingSynonymKeyword,
    } = useHttpCall();
    const submitSynonymKeyword = (data: any) => {
        console.log(data, "Submit Synonym");
        console.log(user);
    };
    // executeSubmitSynonym(
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

    return { form, submitSynonymKeyword, isSubmittingSynonymKeyword };
};

export default SubmitSynonymVM;
