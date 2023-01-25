import PrimaryBtn from "components/UI/form/primary_btn";
import DataQualityFeedbackVM from "pages/datasets/components/feedback_section/data_quality_feedback.vm";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext } from "react";
import Accuracy from "./components/accuracy";
import Clarity from "./components/clarity";
import Comment from "./components/comments";
import CommentAnonymous from "./components/comment_anonymous";
import Consistency from "./components/consistency";
import Readiness from "./components/readiness";

const DataQualityFeedback = () => {
    const vmDataset = useContext(DatasetDetailVMContext);
    const dataset = vmDataset.dataset;

    const vmForm = DataQualityFeedbackVM();

    if (!dataset) return <div />;

    return (
        <div>
            <div className="text-sm text-gray-600 w-full ml-10">
                The scores are calculated from the user feedback on quality of
                the data files.
            </div>
            <div className="">
                <div className="my-5 mx-3 px-5 py-4 mr-32">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <Accuracy vm={vmForm} />
                            <Consistency vm={vmForm} />
                        </div>
                        <div className="flex flex-col">
                            <Clarity vm={vmForm} />
                            <Readiness vm={vmForm} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Comment vm={vmForm} />
                        <div className="flex flex-row justify-between">
                            <CommentAnonymous vm={vmForm} />
                            <PrimaryBtn
                                label="Submit"
                                className="bg-dtech-main-dark w-36 mt-5 mb-2 ml-32"
                                isLoading={vmForm.isSubmitting}
                                onClick={vmForm.form.handleSubmit(
                                    vmForm.submitDataQualityFeedback
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DataQualityFeedback;
