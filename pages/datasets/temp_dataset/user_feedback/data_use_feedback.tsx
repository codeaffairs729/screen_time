import { useContext } from "react";
import { DatasetDetailVMContext } from "../../dataset_detail.vm";
import DomainsTopics from "./components/domains_topics";
import PotentialUsecases from "./components/potential_usecases";
import UsecaseDescription from "./components/usecase_description";
import CommentAnonymous from "./components/comment_anonymous";
import PrimaryBtn from "components/UI/form/primary_btn";
import DataUseFeedbackVM from "pages/datasets/components/feedback_section/data_use_feedback.vm";

const DataUseFeedback = () => {
    const vm = useContext(DatasetDetailVMContext);
    const dataset = vm.dataset;

    const vmForm = DataUseFeedbackVM();

    if (!dataset) return <div />;

    return (
        <div>
            <div className="text-xs font-light text-gray-500">
                We are gathering this information from users to help data
                providers understand what the user needs are.
            </div>
            <div className="">
                <div className="my-5 mx-3 px-5 py-3">
                    <DomainsTopics vm={vmForm} />
                    <PotentialUsecases vm={vmForm} />
                    <UsecaseDescription vm={vmForm} />
                    <div className="flex flex-row justify-between w-[92%]">
                        <CommentAnonymous vm={vmForm} />
                        <PrimaryBtn
                            label="Submit"
                            className="bg-dtech-main-dark w-36 mt-5 mb-2 ml-32"
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
