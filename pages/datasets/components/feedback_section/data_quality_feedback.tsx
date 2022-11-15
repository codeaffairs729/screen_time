import { useContext } from "react";
import { DatasetDetailVMContext } from "../../dataset_detail.vm";
import DataQualityFeedbackVM from "./data_quality_feedback.vm";
import Accuracy from "./components/accuracy";
import Comment from "./components/comments";
import PrimaryBtn from "components/UI/form/primary_btn";
import Consistency from "./components/consistency";
import Clarity from "./components/clarity";
import Readiness from "./components/readiness";
import CommentAnonymous from "./components/comment_anonymous";

const DataQualityFeedback = () => {
    const vmDataset = useContext(DatasetDetailVMContext);
    const dataset = vmDataset.dataset;

    const vmForm = DataQualityFeedbackVM();

    if (!dataset) return <div />;

    return (
        <div>
            <div className="text-xs font-light text-gray-500">
                We are gathering this information from users to help data
                providers improve the quality of their data files.
            </div>
            <div className="">
                <div className="my-5 mx-3 px-5 py-3">
                    <Accuracy vm={vmForm} />
                    <Consistency vm={vmForm} />
                    <Clarity vm={vmForm} />
                    <Readiness vm={vmForm} />

                    <Comment vm={vmForm} />
                    <CommentAnonymous vm={vmForm} />

                    <PrimaryBtn
                        label="Submit"
                        className="bg-dtech-primary-dark w-36 mt-5 mb-2 ml-32"
                        isLoading={vmForm.isSubmitting}
                        onClick={vmForm.form.handleSubmit(
                            vmForm.submitDataQualityFeedback
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default DataQualityFeedback;
