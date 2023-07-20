import ContactUs from "./form/contact_us";
import LearnMore from "./learn_more/learn_more";
import Resources from "./resources/resources";

const Footer = () => {
    return (
        <div className="  " style={{
            background: "linear-gradient(to bottom, #B585B770, #6DCDCB59)"
        }}>
            <div className=" sm:py-6 sm:px-[10%]">
                <div className="flex flex-col sm:flex-row sm:px-[10%] px-6 bg-white ">
                    <div className="flex flex-row sm:w-2/3 sm:px-2 sm:py-4">
                        <Resources />
                        <LearnMore />
                    </div>
                    <div className=" sm:px-2 sm:py-4">
                        <ContactUs />
                    </div>
                </div>
            </div>
            <div className="flex flex-row bg-white items-center justify-center mt-1   p-2 sm:py-6 sm:px-[10%]">
                <div>
                    <img src="/images/dtechtive_without_tagline.png" width={100}></img>
                </div>
                <div className=" bg-dtech-main-dark w-[2px] mx-4 h-16">
                </div>
                <div className="flex flex-col sm:text-sm text-xs text-dtech-main-grey">
                    <div className=" text-dtech-light-teal">Proudly brought to you by <span className=" font-bold text-dtech-new-main-light">DTIME LIMITED ©2023.</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Footer;