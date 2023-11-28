
const SignupMessage = ({
    successMessage,
    errorMessage,
}: {
    successMessage: any;
    errorMessage: any;
}) => {

    return (
        <div className=" h-screen flex flex-col items-center justify-center sm:bg-[#6E498E] bg-gradient-to-b from-[rgba(181,_133,_183,_0.53)_-10.01%] to-[rgba(109,_205,_203,_0.22)_102.15%]">
            <img
                width={200}
                className="-mt-8 hidden sm:block"
                src="/gif/mail_sent.gif"
            ></img>

            {successMessage? (
                <>
                    <span className=" text-xl hidden sm:block sm:text-4xl text-white font-bold my-8">
                        A verification email has been sent.
                    </span>
                    <span className=" text-sm hidden sm:block sm:text-2xl text-white font-bold w-[32%] text-center">
                        {successMessage}
                    </span>
                    <span className="uppercase text-2xl sm:hidden block text-[#6DCDCB] font-bold text-center">
                        Sign Up <br />
                        Successfull!
                    </span>
                    <span className=" text-base block text-white text-center my-4 hover:text-[#6DCDCB] active:text-">
                        <a href="/" className=" underline underline-offset-2">
                            Go to home page
                        </a>
                    </span>
                </>
            ) : (
                <>
                    <span className=" text-sm hidden sm:block sm:text-2xl text-white font-bold w-[32%] text-center">
                        {errorMessage}
                    </span>
                    <span className=" text-base block text-white text-center my-4 hover:text-[#6DCDCB] active:text-">
                        <a href="/" className=" underline underline-offset-2">
                            Go to home page
                        </a>
                    </span>
                </>
            )}
        </div>
    );
};

export default SignupMessage;
