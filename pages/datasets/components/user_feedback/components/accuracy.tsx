import React from "react";
import FormRow from "./form_row";
import StarRating from "components/UI/form/star_rating";

const Accuracy = ({ vm }: { vm: any }) => {

    return (
        <FormRow
            label="Accuracy"
            required={true}
            labelClass="text-[#2D2D32] font-bold text-sm sm:text-lg"
            tooltipClass=" !bg-dtech-light-teal"
            iconClasses=" text-dtech-dark-teal"
            tooltip={
                "Is the information (e.g. values, content) error-free and correct?"
            }
        >
            <div className=" -ml-20">
                <StarRating
                    formControl={{
                        control: vm.form.control,
                        name: "accuracy",
                        rules: {
                            required: "Accuracy feedback is required.",
                        },
                    }}
                    dontKnow={true}
                    starClassName="sm:h-6 sm:w-6 sm:mx-1 h-[14px] w-[14px] mx-[2px]"
                />
            </div>
        </FormRow>
    );
};

export default Accuracy;
