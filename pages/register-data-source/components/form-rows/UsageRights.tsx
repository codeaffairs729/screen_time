import React, { useState } from "react";
import FormRow from "../form_row";
import { ToolTipJson } from "../form_tooltip_type";
import RadioButtonField from "components/UI/form/radio_button_field";
import TextField from "components/UI/form/text_field";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const UsageRights = ({ vm }: { vm: any }) => {
    const [showOther, setShowOther] = useState(false);

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    React.useEffect(() => {
        const subscription = vm.form.watch(
            (value: any, { name, type }: { name: string; type: string }) => {
                if (value.usage_rights) {
                    const usage_rights: string = value.usage_rights;
                    let other_index = usage_rights.indexOf("other");
                    if (name === "usage_rights") {
                        if (other_index != -1) {
                            setShowOther(true);
                        } else {
                            setShowOther(false);
                        }
                    }
                }
            }
        );
        return () => subscription.unsubscribe();
    }, [vm.form, vm.form.watch]);

    return (
        <>
            <FormRow
                label="Usage rights"
                required={true}
                tooltip={formRowToolTipData.usage_rights}
                className=" md:w-auto flex-col !mb-8"
                labelClass="sm:text-[19px]"
                iconClass="sm:h-[19px] sm:w-[19px] text-black"
            >
                <RadioButtonField
                    formControl={{
                        control: vm.form.control,
                        name: "usage_rights",
                        rules: {
                            required: "Usage rights is required",
                        },
                        // defaultValue: "unknown",
                    }}
                    options={[
                        {
                            value: "open",
                            label: "Open",
                        },
                        {
                            value: "semi-open",
                            label: "Semi-open",
                        },
                        {
                            value: "restricted",
                            label: "Restricted",
                        },
                        {
                            value: "closed",
                            label: "Closed",
                        },
                        {
                            value: "unknown",
                            label: "Don't know",
                        },
                        {
                            value: "other",
                            label: "Other",
                        },
                    ]}
                />
            </FormRow>
            <div className={`${showOther ? "" : "hidden"}`}>
                <FormRow
                    label="Usage rights (other)"
                    tooltip={formRowToolTipData.usage_rights_other}
                    className=" md:w-auto flex-col sm:!mb-8"
                    labelClass="sm:text-[19px]"
                    iconClass="sm:h-[19px] sm:w-[19px] text-black"
                >
                    <TextField
                        textfieldClassName="border-black rounded-[5px] sm:text-[19px]"
                        formControl={{
                            control: vm.form.control,
                            name: "usage_rights_other",
                            rules: {},
                        }}
                        placeholder="Enter Usage Rights (Other)"
                    />
                </FormRow>
            </div>
        </>
    );
};

export default UsageRights;
