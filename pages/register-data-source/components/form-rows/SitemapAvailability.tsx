import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import TextField from "components/UI/form/text_field";
import { ToolTipJson } from "../form_tooltip_type";
import RadioButtonField from "components/UI/form/radio_button_field";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const SitemapAvailability = ({ vm }: { vm: any }) => {
    return (
        <>
            <FormRow
                label="Sitemap availability"
                tooltip={formRowToolTipData.sitemap_exists}
                className=" md:w-auto flex-col sm:!mb-8"
                labelClass="sm:text-[19px]"
                iconClass="sm:h-[19px] sm:w-[19px] text-black"
            >
                <RadioButtonField
                    formControl={{
                        control: vm.form.control,
                        name: "sitemap_exists",
                        rules: {},
                    }}
                    options={[
                        {
                            value: "yes",
                            label: "Yes",
                        },
                        {
                            value: "no",
                            label: "No",
                        },
                        {
                            value: "unknown",
                            label: "Don't know",
                        },
                    ]}
                />
            </FormRow>
            <div
                className={`${
                    vm.form.watch("sitemap_exists") == "yes" ? "" : "hidden"
                }`}
            >
                <FormRow
                    label="Sitemap"
                    tooltip={formRowToolTipData.sitemap_url}
                    className=" md:w-auto flex-col sm:!mb-8"
                    labelClass="sm:text-[19px]"
                    iconClass="sm:h-[19px] sm:w-[19px] text-black"
                >
                    <TextField
                        disabled={vm.form.watch("sitemap_exists") != "yes"}
                        textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                        formControl={{
                            control: vm.form.control,
                            name: "sitemap_url",
                            rules: {},
                        }}
                        placeholder="E.g. https://healthdata.gov/sitemap"
                    />
                </FormRow>
            </div>
        </>
    );
};

export default SitemapAvailability;
