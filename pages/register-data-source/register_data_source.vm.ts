import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const RegisterDataSourceVM = () => {
  const form = useForm();

  const {
    execute: executeRegisterDataSource,
    isLoading: isRegisteringDataSource,
  } = useHttpCall();
  const registerDataSource = (data: any) =>
    executeRegisterDataSource(
      () => Http.post("/v1/datasets/data_sources", data),
      {
        onSuccess: (res) =>
          toast.success("The data source was successfully added."),
        onError: (e) =>
          toast.error("Something went wrong while adding the data source."),
      }
    );

  return { form, registerDataSource, isRegisteringDataSource };
};

export default RegisterDataSourceVM;
