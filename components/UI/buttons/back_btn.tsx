import Image from "next/image";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";

const BackBtn = () => {
    const router = useRouter();

    return (
        <button
            onClick={router.back}
            data-selector="back-btn"
            className="m-1 whitespace-nowrap bg-dtech-main-dark h-8 w-32 flex items-center justify-center rounded-lg"
        >
            <BiChevronLeft className="text-white w-6 h-6"/>
            <span className="text-[17px] ml-1 mr-2 font-medium text-white">Go back</span>
        </button>
    );
};

export default BackBtn;
