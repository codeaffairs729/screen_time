import React from "react";
import FormRow from "./form_row";
import StarRating from "components/UI/form/star_rating";

const Readiness = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Readiness"
            labelClass="text-[#2D2D32] font-bold text-sm sm:text-lg"
            tooltipClass=" !bg-dtech-light-teal"
            iconClasses=" text-dtech-dark-teal"
            required={true}
            tooltip={
                "Does the file need minimal preprocessing (e.g. missing value imputation, outlier removal) before any sensible use?"
            }
        >
            <div className=" -ml-20">
                <StarRating
                    formControl={{
                        control: vm.form.control,
                        name: "readiness",
                        rules: {
                            required: "Readiness feedback is required.",
                        },
                    }}
                    dontKnow={true}
                    starClassName="sm:h-6 sm:w-6 sm:mx-1 h-[14px] w-[14px] mx-[2px]"
                />
            </div>
        </FormRow>
    );
};

export default Readiness;
