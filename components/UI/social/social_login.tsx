// import { useGoogleLogin } from "@react-oauth/google";
import SigninVM from "pages/login/signin.vm";
import { SetStateAction, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LoginSocialGoogle, LoginSocialLinkedin } from "reactjs-social-login";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig: any = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

const SocialLogin = () => {
    const vm = SigninVM();
    const [googleHover, setGoogleHover] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setGoogleHover(true);
    };

    const handleMouseLeave = () => {
        setGoogleHover(false);
    };

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
            <div
                className=" mx-4 cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
            <div className=" mx-4 ">
                <img
                    src="/images/icons/Microsoft.svg"
                    width={35}
                    className=" cursor-pointer"
                    onClick={signInWithMicrosoft}
                ></img>
            </div>
            <div className=" mx-4 ">
                <img
                    src="/images/icons/LinkedIn.svg"
                    width={35}
                    className=" opacity-50"
                ></img>
            </div>
        </div>
    );
};
export default SocialLogin;

/*


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACTUFateeEMuZGi119tVHINxRnOye8Dow",
  authDomain: "signin-f1e1e.firebaseapp.com",
  projectId: "signin-f1e1e",
  storageBucket: "signin-f1e1e.appspot.com",
  messagingSenderId: "1086885612666",
  appId: "1:1086885612666:web:bf3c767c2c906b7800ffc3",
  measurementId: "G-3WE304BM4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


*/
