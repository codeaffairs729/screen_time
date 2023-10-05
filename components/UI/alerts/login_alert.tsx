import clsx from "clsx";
import Link from "next/link";

const LoginAlert = ({ className = "" }: { className?: string }) => {
    return (
        <div
            data-selector="login-alert"
            className={clsx(
                "flex items-center justify-center mt-10",
                className
            )}
        >
            <div className="bg-white w-1/2 mx-5 px-5 py-4 rounded-lg border-2 border-dtech-secondary-light ">
                <div className="text-gray-500 font-lg text-center font-semibold my-4">
                    If you wish to give feedback to data providers and unlock
                    other features, please login or signup. Else continue as a
                    guest.
                </div>
                <div className="flex justify-around mt-6 mb-2">
                    <Link href="/login" passHref={true}>
                        <a className="text-xs font-medium bg-dtech-secondary-light text-white rounded px-3 py-1">
                            Log in
                        </a>
                    </Link>

                    <Link href="/signup" passHref={true}>
                        <a className="text-xs font-medium border-[1px] border-dtech-secondary-light rounded px-3 py-1">
                            Sign up
                        </a>
                    </Link>

                    {/* <a
                        
                        className="text-xs font-medium border-[1px] border-dtech-secondary-light rounded px-3 py-1"
                    >
                        Continue as guest
                    </a> */}
                </div>
            </div>
        </div>
    );
};

export default LoginAlert;
