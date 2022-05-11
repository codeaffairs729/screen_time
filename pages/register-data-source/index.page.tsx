import DefaultLayout from "components/layouts/default";
import InfoIcon from "components/UI/icons/info_icon";
import DropdownField from "components/UI/form/dropdown_field";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import Link from "next/link";
import { useWatch } from "react-hook-form";
import FormRow from "./components/form_row";
import isEmail from "validator/lib/isEmail";
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
            <InfoIcon
              className="ml-1"
              title="Register a new data source"
            />
          </span>
        </div>
        <div className="grow md:flex md:space-x-6 justify-center max-w-site mx-auto">
          <div className="">
            <FormRow label="Data source website URL" required={true}>
              <TextField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "source_url",
                  rules: { required: "URL is required" },
                }}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Organisation">
              <TextField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "source_org",
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
              <TextField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "metadata_availability",
                  rules: {},
                }}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Sitemap availability">
              <DropdownField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "sitemap_availability",
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
                ]}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Sitemap">
              <TextField
                className="w-60"
                formControl={{
                  control: vm.form.control,
                  name: "sitemap",
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
                    value: "monthly",
                    label: "Monthly",
                  },
                  {
                    value: "yearly",
                    label: "Yearly",
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
                  name: "contact_person",
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
                  name: "email",
                  rules: {
                    required: "Email is required",
                    validate: (val: string) => {
                      if (!isEmail(val)) {
                        return "Please enter a valid email";
                      }
                    },
                  },
                }}
              />
            </FormRow>
            <FormRow label="Sitemap" isTwoRow={true} className="flex-col">
              <TextField
                type="textarea"
                formControl={{
                  control: vm.form.control,
                  name: "comments",
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
