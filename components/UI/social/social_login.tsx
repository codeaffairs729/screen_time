// import { useGoogleLogin } from "@react-oauth/google";
import SigninVM from "pages/login/signin.vm";
import { SetStateAction, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LoginSocialGoogle, LoginSocialLinkedin } from "reactjs-social-login";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import ReactTooltip from "react-tooltip";

const firebaseConfig: any = {
    apiKey:
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
        "AIzaSyCWzVMbFxoaAg1B423N9OVgSiXhXDtiq8Y",
    authDomain:
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
        "dtechtivesso.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dtechtivesso",
    storageBucket:
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
        "dtechtivesso.appspot.com",
    messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "270361505083",
    appId:
        process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
        "1:270361505083:web:b4d49f4a30b1ecc77c9b1e",
    measurementId:
        process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-HYVJP2M340",
};

const SocialLogin = () => {
    const vm = SigninVM();
    const [googleHover, setGoogleHover] = useState<boolean>(false);

    firebase.initializeApp(firebaseConfig);

    const provider = new firebase.auth.OAuthProvider("microsoft.com");
    provider.setCustomParameters({
        prompt: "select_account",
    });

    const signInWithMicrosoft = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result: any) => {
                const credential = result.credential;
                if (credential) {
                    vm.performSsoSignIn({
                        provider: "microsoft",
                        access_token: credential.accessToken,
                    });
                }
            })
            .catch((error) => {
                console.error("Error signing in with Microsoft:", error);
            });
    };

    return (
        <div className="flex flex-row mt-4 justify-center items-center">
            <div data-tip data-for="dtechtive-Google-btn-tooltip">
                <div
                    className=" mx-4 cursor-pointer"
                    onMouseEnter={() => setGoogleHover(true)}
                    onMouseLeave={() => setGoogleHover(false)}
                >
                    <LoginSocialGoogle
                        client_id={
                            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY as string
                        }
                        onResolve={({ provider, data }) => {
                            if (data) {
                                vm.performSsoSignIn({
                                    provider: provider,
                                    access_token: data["access_token"],
                                });
                            }
                        }}
                        onReject={(err) => {
                            console.log(err);
                        }}
                    >
                        {!googleHover ? (
                            <img
                                src="/images/icons/Google.svg"
                                className="cursor-pointer"
                                width={35}
                                height={35}
                            />
                        ) : (
                            <FcGoogle
                                className="w-8 h-9"
                                style={{ width: "35px", height: "35px" }}
                            />
                        )}
                    </LoginSocialGoogle>
                </div>
                <Tooltip id="dtechtive-Google-btn-tooltip" title={"Google"} />
            </div>
            <div
                className=" mx-4 "
                data-tip
                data-for="dtechtive-Microsoft-btn-tooltip"
            >
                <img
                    src="/images/icons/Microsoft.svg"
                    width={35}
                    className=" cursor-pointer"
                    onClick={signInWithMicrosoft}
                ></img>
                <Tooltip
                    id="dtechtive-Microsoft-btn-tooltip"
                    title={"Microsoft"}
                />
            </div>
            <div
                className=" mx-4 "
                data-tip
                data-for="dtechtive-linkedIn-btn-tooltip"
            >
                <img
                    src="/images/icons/LinkedIn.svg"
                    width={35}
                    className=" opacity-50"
                ></img>

                {/* <LoginSocialLinkedin
                    client_id={"778pqcso7m5yq1"}
                    client_secret={"BAGH3KkR3NLPp28r"}
                    redirect_uri={""}
                    scope="email"
                    onResolve={({ provider, data }) => {
                        console.log({ provider }, { data });
                        // if (data) {
                        //     vm.performSsoSignIn({
                        //         provider: provider,
                        //         access_token: data["access_token"],
                        //     });
                        // }
                    }}
                    onReject={(err) => {
                        console.log(err);
                    }}
                >
                    <img
                        src="/images/icons/LinkedIn.svg"
                        width={35}
                        className=" opacity-50"
                    ></img>
                </LoginSocialLinkedin> */}
            </div>
            <Tooltip id="dtechtive-linkedIn-btn-tooltip" title={"LinkedIn"} />
        </div>
    );
};
export default SocialLogin;

const Tooltip = ({ id, title }: { id: string; title: string }) => {
    return (
        <ReactTooltip
            id={id}
            textColor={"white"}
            backgroundColor="#4CA7A5"
            className=" !bg-dtech-dark-teal"
            overridePosition={({ left, top }, _e, _t, node) => {
                return {
                    top,
                    left: typeof node === "string" ? left : Math.max(left, 0),
                };
            }}
        >
            {title}
        </ReactTooltip>
    );
};
