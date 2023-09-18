import PrimaryBtn from "components/UI/form/primary_btn";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext, useEffect } from "react";
import Accuracy from "./components/accuracy";
import Clarity from "./components/clarity";
import Comment from "./components/comments";
import CommentAnonymous from "./components/comment_anonymous";
import Consistency from "./components/consistency";
import Readiness from "./components/readiness";
import DataQualityFeedbackVM from "./data_quality_feedback.vm";

const DataQualityFeedback = () => {
    const vmDataset = useContext(DatasetDetailVMContext);
    const dataset = vmDataset.dataset;

    const vmForm = DataQualityFeedbackVM();
    useEffect(()=>{
        vmForm.fetchQualityFeedback();
    },[])

    if (!dataset) return <div />;

    return (
        <div className="">
            <div className="text-md text-gray-600 w-full pb-2 sm:pb-0 text-center">
                We are gathering this information from users to help data
                providers understand what the user needs are.
            </div>
            {!vmForm.isFetchingQualityFeedback && (
                <div className="text-md text-gray-600 w-full pb-2 text-center">
                    You{" "}
                    {vmForm.qualityFeedback ? (
                        <p className="inline font-bold"> have</p>
                    ) : (
                        <p className="inline font-bold">have not</p>
                    )}{" "}
                    submitted a data quality feedback previously.
                </div>
            )}
            <div className="">
                <div className="my-5 mx-3 xl:px-32 md:px-20 py-4 ">
                    <div className="flex flex-col justify-between">
                            <Accuracy vm={vmForm} />
                            <Consistency vm={vmForm} />
                            <Clarity vm={vmForm} />
                            <Readiness vm={vmForm} />
                    </div>
                    <div className="flex flex-col">
                        <Comment vm={vmForm} />
                        <div className="flex flex-col">
                            <CommentAnonymous vm={vmForm} />
                            <PrimaryBtn
                                label="Submit"
                                className="bg-dtech-new-main-light !py-3 !px-8 w-min rounded-full mt-5 mb-2"
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
