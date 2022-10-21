import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import TextField from "components/UI/form/text_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const SitemapAvailability = ({ vm }: { vm: any }) => {
    return (
        <>
            <FormRow
                label="Sitemap availability"
                tooltip={formRowToolTipData.sitemap_exists}
            >
                <DropdownField
                    className="w-80"
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
                            label: "Unknown",
                        },
                    ]}
                    placeholder=""
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
                >
                    <TextField
                        disabled={vm.form.watch("sitemap_exists") != "yes"}
                        className="w-80"
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
