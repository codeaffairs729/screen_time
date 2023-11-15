import { useContext, useEffect } from "react";
import { DatasetDetailVMContext } from "../../dataset_detail.vm";
import DomainsTopics from "./components/domains_topics";
import PotentialUsecases from "./components/potential_usecases";
import UsecaseDescription from "./components/usecase_description";
import CommentAnonymous from "./components/comment_anonymous";
import PrimaryBtn from "components/UI/form/primary_btn";
import DataUseFeedbackVM from "./data_use_feedback.vm";

const DataUseFeedback = () => {
    const vm = useContext(DatasetDetailVMContext);
    const dataset = vm.dataset;

    const vmForm = DataUseFeedbackVM();

    useEffect(() => {
        vmForm.fetchUsecaseFeedback();
    }, []);

    if (!dataset) return <div />;

    return (
        <div className="">
            <div className="text-sm text-gray-600 w-full pb-2 sm:pb-0 text-center">
                We are gathering this information from users to help data
                providers understand what the user needs are.
            </div>
            {!vmForm.isFetchingUsecaseFeedback && (
                <div className="text-sm text-gray-600 w-full pb-2 text-center">
                    You{" "}
                    {vmForm.usecaseFeedback ? (
                        <p className="inline font-bold"> have</p>
                    ) : (
                        <p className="inline font-bold">have not</p>
                    )}{" "}
                    submitted a data use case feedback previously.
                </div>
            )}
            <div className="">
                <div className="my-5 mx-3 sm:px-5 sm:py-3">
                    <DomainsTopics vm={vmForm} />
                    <PotentialUsecases vm={vmForm} />
                    <UsecaseDescription vm={vmForm} />
                    <div className="flex flex-col space-y-4">
                        <CommentAnonymous vm={vmForm} />
                        <PrimaryBtn
                            label="Submit"
                            className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white w-min rounded-full !text-xs !py-3 !px-6"
                            isLoading={vmForm.isSubmitting}
                            onClick={vmForm.form.handleSubmit(
                                vmForm.submitDataUseFeedback
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataUseFeedback;
