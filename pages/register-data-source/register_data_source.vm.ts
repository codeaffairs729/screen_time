import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { pickBy } from "lodash-es";
import { useState } from "react";
const RegisterDataSourceVM = () => {
    const form = useForm();
    const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);
    const {
        execute: executeRegisterDataSource,
        isLoading: isRegisteringDataSource,
    } = useHttpCall();
    const registerDataSource = (data: any) => {
        const sanitizedValues = pickBy(data, (value) => value?.length > 0);
        // if (sanitizedValues.metadata_standards == "other") {
        //     sanitizedValues.metadata_standards =
        //         sanitizedValues.metadata_standards_other;
        //     delete sanitizedValues["metadata_standards_other"];
        // }
        // if (sanitizedValues.data_type == "other") {
        //     sanitizedValues.data_type = sanitizedValues.data_type_other;
        //     delete sanitizedValues["data_type_other"];
        // }
        // if (sanitizedValues.data_management_system == "other") {
        //     sanitizedValues.data_management_system =
        //         sanitizedValues.data_management_system_other;
        //     delete sanitizedValues["data_management_system_other"];
        // }

        let host = false;
        let owner = false;

        const dataProviderType = sanitizedValues.data_provider_type || "";
        if (
            dataProviderType.includes("host") &&
            dataProviderType.includes("owner")
        ) {
            host = true;
            owner = true;
        } else if (dataProviderType === "host") {
            host = true;
        } else if (dataProviderType === "owner") {
            owner = true;
        }

        const newValues = {
            ...sanitizedValues,
            host,
            owner,
        } as typeof sanitizedValues & {
            host: boolean;
            owner: boolean;
        };
        // Delete the data_provider_type key from the newValues object
        delete newValues.data_provider_type;
        return executeRegisterDataSource(
            () =>
                Promise.all([
                    Http.post("/v1/data_sources/", newValues),
                    // Http.post("/v1/data_sources/", newValues, {
                    //     baseUrl: process.env.NEXT_PUBLIC_PIPELINE_API_ROOT,
                    // }),
                ]),
            {
                onSuccess: (res) => {
                    toast.success("The data source was successfully added.");
                    setIsSubmissionSuccess(true);
                },
                onError: (e) =>
                    toast.error(
                        "Something went wrong while adding the data source."
                    ),
            }
        );
    };
    return {
        form,
        registerDataSource,
        isRegisteringDataSource,
        isSubmissionSuccess,
    };
};
export default RegisterDataSourceVM;