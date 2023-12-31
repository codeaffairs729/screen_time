import { useGoogleLogin } from "@react-oauth/google";
import SigninVM from "pages/login/signin.vm";
import { LoginSocialGoogle, LoginSocialLinkedin } from "reactjs-social-login";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";

const firebaseConfig: any = {
    apiKey:
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain:
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:
        process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId:
        process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const SocialLogin = ({ vm }: { vm: any }) => {
    const [socialHover, setSocialHover] = useState({
        google: false,
        microsoft: false,
        linkedIn: false,
    });

    const protocol = window.location.protocol || "http:";
    const host =
        window.location.hostname !== "localhost"
            ? window.location.hostname
            : "localhost:3000";
    const fullUrl = `${protocol}//${host}`;

    // const LINKEDIN_CLIENT_SECRET =
    //     process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET_ID || "";
    // const LINKEDIN_CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || "";
    // const LINKEDIN_CALLBACK_URL = `${fullUrl}/login`;
    // const linkedinOAuthURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    //     LINKEDIN_CALLBACK_URL
    // )}&scope=openid%20profile%20email`;

    // const handleLinkedInCallback = async () => {
    //     const queryString = window.location.search;
    //     const urlParams = new URLSearchParams(queryString);
    //     const code = urlParams.get("code");
    //     if (code) {
    //         fetch(
    //             `/api/linkedin-login?code=${code}&redirect_uri=${LINKEDIN_CALLBACK_URL}`
    //         )
    //             .then((res: any) => res.json())
    //             .then((data: any) => {
    //                 console.log("data :", data);
    //                 vm.performSsoSignIn({
    //                     provider: "linkedin",
    //                     access_token: data?.accessToken,
    //                 });
    //             });
    //     }
    // };

    // useEffect(() => {
    //     handleLinkedInCallback();
    // }, []);

    firebase.initializeApp(firebaseConfig);
    const provider = new firebase.auth.OAuthProvider("microsoft.com");
    provider.addScope("email")
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

    const signInWithGoogle = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        googleProvider.addScope("email")
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((result: any) => {
                const credential = result.credential;
                if (credential) {
                    vm.performSsoSignIn({
                        provider: "google",
                        access_token: credential.accessToken,
                    });
                }
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
            });
    };

    return (
        <div className="flex flex-row mt-4 justify-center items-center">
            <div data-tip data-for="dtechtive-Google-btn-tooltip">
                <div
                    className=" mx-4 cursor-pointer"
                    onMouseEnter={() =>
                        setSocialHover({ ...socialHover, google: true })
                    }
                    onMouseLeave={() =>
                        setSocialHover({ ...socialHover, google: false })
                    }
                >
                    {/* <LoginSocialGoogle
                        scope="email"
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
                    > */}
                    {!socialHover.google ? (
                        <img
                            src="/images/icons/Google.svg"
                            className="cursor-pointer"
                            width={35}
                            onClick={signInWithGoogle}
                        />
                    ) : (
                        <img
                            src="/images/logo/google-logo.png"
                            className="cursor-pointer"
                            width={35}
                            onClick={signInWithGoogle}
                        />
                    )}
                    {/* </LoginSocialGoogle> */}
                </div>
                <Tooltip id="dtechtive-Google-btn-tooltip" title={"Google"} />
            </div>
            <div
                className="mx-4 w-10"
                data-tip
                data-for="dtechtive-Microsoft-btn-tooltip"
                onMouseEnter={() =>
                    setSocialHover({ ...socialHover, microsoft: true })
                }
                onMouseLeave={() =>
                    setSocialHover({ ...socialHover, microsoft: false })
                }
            >
                {!socialHover.microsoft ? (
                    <img
                        src="/images/icons/Microsoft.svg"
                        width={35}
                        className="cursor-pointer"
                        onClick={signInWithMicrosoft}
                    ></img>
                ) : (
                    <img
                        src="/images/logo/microsoft-logo.png"
                        width={35}
                        className="p-1 cursor-pointer"
                        onClick={signInWithMicrosoft}
                    ></img>
                )}
            </div>
            <Tooltip id="dtechtive-Microsoft-btn-tooltip" title={"Microsoft"} />

            <div
                className="mx-4"
                data-tip
                data-for="dtechtive-linkedIn-btn-tooltip"
                onMouseEnter={() =>
                    setSocialHover({ ...socialHover, linkedIn: true })
                }
                onMouseLeave={() =>
                    setSocialHover({ ...socialHover, linkedIn: false })
                }
            >
                {/* <a href={linkedinOAuthURL}> */}
                {/* {!socialHover.linkedIn ? ( */}
                <img
                    src="/images/icons/LinkedIn.svg"
                    width={35}
                    className=" opacity-50"
                ></img>
                {/* ) : (
                        <img
                            src="/images/logo/linkedin-logo.svg"
                            width={35}
                            className=" cursor-pointer"
                        ></img>
                    )} */}
                {/* </a> */}
            </div>
            {/* <Tooltip id="dtechtive-linkedIn-btn-tooltip" title={"LinkedIn"} /> */}
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
