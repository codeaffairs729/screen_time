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
    const sanitizedValues = pickBy(data, (value) => value.length > 0);
    return executeRegisterDataSource(
      () => Http.post("/v1/data_sources/", sanitizedValues),
      {
        onSuccess: (res) =>{
          toast.success("The data source was successfully added.");
          setIsSubmissionSuccess(true);
        },
        onError: (e) =>
          toast.error("Something went wrong while adding the data source."),
      }
    );
  };

  return { form, registerDataSource, isRegisteringDataSource, isSubmissionSuccess };
};

export default RegisterDataSourceVM;
