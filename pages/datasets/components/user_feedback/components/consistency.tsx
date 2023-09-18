import React from "react";
import StarRating from "components/UI/form/star_rating";
import FormRow from "./form_row";

const Consistency = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Consistency"
            labelClass="text-[#2D2D32] font-bold text-sm sm:text-lg"
            tooltipClass=" !bg-dtech-light-teal"
            iconClasses=" text-dtech-dark-teal"
            required={true}
            tooltip={
                "Do the values and headers have consistent formats (e.g. date formats), granularity (e.g spatiotemporal resolution), ? Does the same information match across multiple instances?"
            }
        >
            <div className=" -ml-20">
                <StarRating
                    formControl={{
                        control: vm.form.control,
                        name: "consistency",
                        rules: {
                            required: "Consistency feedback is required.",
                        },
                    }}
                    dontKnow={true}
                    starClassName="sm:h-6 sm:w-6 sm:mx-1 h-[14px] w-[14px] mx-[2px]"
                />
            </div>
        </FormRow>
    );
};

export default Consistency;
