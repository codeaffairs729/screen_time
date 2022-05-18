import DefaultLayout from "components/layouts/default";
import InfoIcon from "components/UI/icons/info_icon";
import DropdownField from "components/UI/form/dropdown_field";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import Link from "next/link";
import { useWatch } from "react-hook-form";
import FormRow from "./components/form_row";
import isEmail from "validator/lib/isEmail";
import isURL from "validator/lib/isURL";
import ErrorAlert from "components/UI/alerts/error_alert";
import RegisterDataSourceVM from "./register_data_source.vm";

const RegisterDataSourcePage = () => {
  const vm = RegisterDataSourceVM();

  return (
    <DefaultLayout>
      <div className="flex flex-col justify-between">
        <div className="text-center mt-8 mb-4">
          <h1 className="font-semibold text-lg">Register a Data Source</h1>
          <span className="inline-flex space-x-1">
            <i className="mr-1 text-sm underline">Need help?</i>{" "}
            <InfoIcon className="ml-1" title="Register a new data source" />
          </span>
        </div>
        <div className="grow md:flex md:space-x-6 justify-center max-w-site mx-auto">
          <div className="">
            <FormRow label="Data source website URL" required={true}>
              <TextField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "site_url",
                  rules: {
                    required: "URL is required",
                    validate: (val: string) => {
                      if (!isURL(val)) {
                        return "Please enter a valid url";
                      }
                    },
                  },
                }}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Organisation" required={true}>
              <TextField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "site_name",
                  rules: { required: "Organisation is required" },
                }}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Domain">
              <TextField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "domain",
                  rules: {},
                }}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Metadata availability">
              <DropdownField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "metadata_level",
                  rules: {},
                  defaultValue: "nil",
                }}
                options={[
                  {
                    value: "full",
                    label: "Full",
                  },
                  {
                    value: "partial",
                    label: "Partial",
                  },
                  {
                    value: "nil",
                    label: "Nil",
                  },
                ]}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Sitemap availability">
              <DropdownField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "sitemap_exists",
                  rules: {},
                }}
                options={[
                  {
                    value: true,
                    label: "Yes",
                  },
                  {
                    value: false,
                    label: "No",
                  },
                ]}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Sitemap">
              <TextField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "sitemap_url",
                  rules: {},
                }}
                placeholder=""
              />
            </FormRow>
          </div>
          <div className="">
            <FormRow label="How often is the website updated?">
              <DropdownField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "update_frequency",
                  rules: {},
                }}
                options={[
                  {
                    value: "once",
                    label: "Once",
                  },
                  {
                    value: "adhoc",
                    label: "Adhoc",
                  },
                  {
                    value: "within-day",
                    label: "Within a day",
                  },
                  {
                    value: "daily",
                    label: "Daily",
                  },
                  {
                    value: "weekly",
                    label: "Weekly",
                  },
                  {
                    value: "monthly",
                    label: "Monthly",
                  },
                  {
                    value: "quaterly",
                    label: "Quaterly",
                  },
                  {
                    value: "semi-annual",
                    label: "Semi annual",
                  },
                  {
                    value: "annual",
                    label: "Annual",
                  },
                  {
                    value: "multi-year",
                    label: "Multi year",
                  },
                ]}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Contact Person">
              <TextField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "contact_name",
                  rules: {},
                }}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Email">
              <TextField
                className="w-60"
                type="email"
                formControl={{
                  control: vm.form.control,
                  name: "contact_email",
                  rules: {
                    validate: (val: string) => {
                      if (val && !isEmail(val)) {
                        return "Please enter a valid email";
                      }
                    },
                  },
                }}
              />
            </FormRow>
            <FormRow
              label="Comments & Feedback"
              isTwoRow={true}
              className="flex-col"
            >
              <TextField
                type="textarea"
                formControl={{
                  control: vm.form.control,
                  name: "comment",
                  rules: {},
                }}
              />
            </FormRow>
            <PrimaryBtn
              label="Submit"
              className="bg-dtech-primary-dark w-32 mb-2 ml-auto"
              isLoading={vm.isRegisteringDataSource}
              onClick={vm.form.handleSubmit(vm.registerDataSource)}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RegisterDataSourcePage;
