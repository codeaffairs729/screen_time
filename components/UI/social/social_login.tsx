import { useGoogleLogin } from "@react-oauth/google";
import SigninVM from "pages/login/signin.vm";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
    const vm = SigninVM();
    const [googleHover, setGoogleHover] = useState<boolean>(false);
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            vm.performGoogleSignIn({
                access_token: tokenResponse["access_token"],
            });
        },
        onError: (error) => console.log({ error }),
    });

    const handleMouseEnter = () => {
        setGoogleHover(true);
    };

    const handleMouseLeave = () => {
        setGoogleHover(false);
    };
    return (
        <div className="flex flex-row mt-4 justify-center items-center">
            <div
                className=" mx-4 cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {!googleHover ? (
                    <img
                        src="/images/icons/Google.svg"
                        className="cursor-pointer"
                        onClick={() => login()}
                        width={35}
                        height={35}
                    />
                ) : (
                    <FcGoogle
                        className="w-8 h-9"
                        onClick={() => login()}
                        style={{ width: "35px", height: "35px" }}
                    />
                )}
            </div>
            <div className=" mx-4 ">
                <img src="/images/icons/Microsoft.svg" width={35} className=" opacity-50"></img>
            </div>
            <div className=" mx-4 ">
                <img src="/images/icons/LinkedIn.svg" width={35} className=" opacity-50"></img>
            </div>
        </div>
    );
};
export default SocialLogin;
