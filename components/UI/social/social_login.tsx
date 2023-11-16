import { useGoogleLogin } from "@react-oauth/google";
import SigninVM from "pages/login/signin.vm";

const SocialLogin = () => {
    const vm = SigninVM();
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            vm.performGoogleSignIn({
                access_token: tokenResponse["access_token"],
            });
        },
        onError: (error) => console.log({ error }),
    });
    return (
        <div className="flex flex-row mt-4 justify-center">
            <div className=" mx-4">
                <img
                    src="/images/icons/Google.svg"
                    className=" cursor-pointer"
                    onClick={() => login()}
                    width={35}
                ></img>
            </div>
            <div className=" mx-4 ">
                <img src="/images/icons/Microsoft.svg" width={35}></img>
            </div>
            <div className=" mx-4 ">
                <img src="/images/icons/LinkedIn.svg" width={35}></img>
            </div>
        </div>
    );
};
export default SocialLogin;