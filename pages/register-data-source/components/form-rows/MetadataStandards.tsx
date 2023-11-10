import React from "react";
import FormRow from "../form_row";
import { ToolTipJson } from "../form_tooltip_type";
import { useState } from "react";
import TextField from "components/UI/form/text_field";
import DropdownField from "components/UI/form/dropdown_field";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const MetadataStandards = ({ vm }: { vm: any }) => {
    const [showOther, setShowOther] = useState(false);

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    React.useEffect(() => {
        const subscription = vm.form.watch(
            (value: any, { name, type }: { name: string; type: string }) => {
                if (value.metadata_standards) {
                    const metadata_standards: string = value.metadata_standards;
                    let other_index = metadata_standards.indexOf("other");
                    if (name === "metadata_standards") {
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
                label="Metadata standards"
                required={false}
                tooltip={formRowToolTipData.metadata_standards}
                className=" md:w-auto flex-col sm:!mb-8"
                labelClass="sm:text-[19px] !justify-start"
                iconClass="sm:h-[19px] sm:w-[19px] text-black"
                tooltipClass="!ml-2"
            >
                <DropdownField
                    inputClass="border-[#C3C3C3] focus:border-[#C3C3C3] focus:ring-opacity-0 rounded-[5px] sm:text-[19px]"
                    newDropdownIcon={false}
                    formControl={{
                        control: vm.form.control,
                        name: "metadata_standards",
                        rules: {},
                    }}
                    options={[
                        {
                            value: "schema_org",
                            label: "Schema.org",
                        },
                        {
                            value: "dcat",
                            label: "DCAT",
                        },
                        {
                            value: "other",
                            label: "Other",
                        },
                        {
                            value: "unknown",
                            label: "Don't know",
                        },
                        {
                            value: null,
                            label: "None",
                        },
                    ]}
                    placeholder="Select Metadata standards"
                />
            </FormRow>
            <div className={`${showOther ? "" : "hidden"}`}>
                <FormRow
                    label="Metadata standards (other)"
                    tooltip={formRowToolTipData.metadata_standards_other}
                    className=" md:w-auto flex-col sm:!mb-8"
                    labelClass="sm:text-[19px]"
                    iconClass="sm:h-[19px] sm:w-[19px] text-black"
                >
                    <TextField
                        textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                        formControl={{
                            control: vm.form.control,
                            name: "metadata_standards_other",
                            rules: {},
                        }}
                        placeholder="E.g. https://healthdata.gov/sitemap"
                    />
                </FormRow>
            </div>
        </>
    );
};

export default MetadataStandards;
