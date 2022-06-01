import PrimaryBtn from "components/UI/form/primary_btn";
import { useRouter } from "next/router";

const SuccessScreen = () => {
    const router = useRouter();

    return (
        <div className="max-w-site text-center m-auto">
            <p className="w-[350px] text-gray-700 font-semibold">
                Thank you for reporting, we will look into this problem and fix
                it accordingly.
            </p>
            <PrimaryBtn
                label="Return to Home"
                className="bg-dtech-primary-dark max-w-[180px] mb-2 mx-auto mt-16"
                onClick={() => router.replace("/")}
            />
        </div>
    );
};

export default SuccessScreen;
