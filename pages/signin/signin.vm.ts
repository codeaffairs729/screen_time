import { useForm } from "react-hook-form";

const SigninVM = ()=>{
  const form = useForm();
  
  return {
    form
  }
}

export default SigninVM;