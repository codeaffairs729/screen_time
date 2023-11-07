import ContactUs from "./form/contact_us";
import LearnMore from "./learn_more/learn_more";
import Resources from "./resources/resources";
import Link from "next/link"
const Footer = () => {
    return (
        <div className="  bg-[#EBEBEB]" style={{
            // background: "linear-gradient(to bottom, #B585B770, #6DCDCB59)"
        }}>
            <div className=" sm:pt-[130px] sm:px-[10%] ">
                <div className="flex flex-col sm:flex-row sm:px-[10%] px-6 max-w-full bg-[#FBFAFA] ">
                    <div className="flex flex-row sm:w-2/3 sm:px-2 sm:py-4 ">
                        <Resources />
                        <LearnMore />
                    </div>
                    <div className=" sm:px-2 sm:py-4 sm:w-1/3 ">
                        <ContactUs />
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-end justify-center mt-1 p-2 sm:py-6 sm:px-[10%]">
                <Link href="/">
                    <img src="/images/dtechtive_without_tagline.png" width={100}></img>
                </Link>
                <div className=" bg-[#6E498E] w-[2px] mx-4 h-[30px]">
                </div>
                <div className="flex flex-col sm:text-[16px] text-xs text-dtech-main-grey">
                    <div className=" text-[#727272] font-[400]">Proudly brought to you by <a href="https://dtime.ai" rel="noreferrer" target="_blank"><span className=" font-[500] text-dtech-new-main-light">DTIME.AI ©2023.</span></a>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Footer;