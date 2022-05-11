import { useHttpCall } from "common/hooks";
import { useForm } from "react-hook-form";

const RegisterDataSourceVM = () => {
  const form = useForm();

  const {
    execute: executeRegisterDataSource,
    isLoading: isRegisteringDataSource,
  } = useHttpCall();
  const registerDataSource = (data: any) => {};

  return { form, registerDataSource, isRegisteringDataSource };
};

export default RegisterDataSourceVM;
