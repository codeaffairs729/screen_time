import {useRouter} from "next/router"
const UpgradeAccountModal = () => {
    const router = useRouter()
    return (
        <div className="relative h-full">
            {/* Behind Div */}
            <div className="h-full w-full bg-[#D9D9D9] rounded-[10px] opacity-[75%] absolute top-0 left-0"></div>

            {/* Modal in Center */}
            <div className="flex items-center justify-center h-full relative">
                <div className="md:w-[407px] md:h-[315px] w-[242px] h-[203x] bg-white p-[38px] rounded-xl border-2 border-dtech-light-teal">
                    <div className="md:text-[19px] text-[12px] font-[400] text-[#000000] mt-4 z-50 ">
                        
                        <div className="my-2  text-center md:text-left ">Ready to unlock this awesome feature?</div>
                        <div className="my-4 text-center md:text-left md:leading-6">Upgrade your subscription to get your hands on this!</div>
                        <div className="md:mt-12 cursor-pointer md:w-[160px] md:h-[50px] w-[106px] h-[40px] rounded-full bg-dtech-new-main-light active:bg-[#FDD522] active:text-black text-white hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 flex items-center justify-center text-base font-semibold" onClick={() => {
                            localStorage.setItem("previous_path","/account#subscription")
                            router.push("/account#subscription")
                        }}>
                            Upgrade
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradeAccountModal;
