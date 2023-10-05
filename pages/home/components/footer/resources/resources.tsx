import Link from "next/link";
import CustomLink from "../custom_link";
const Resource = [
    {
        label: "Newsletter",
        link: "https://f7xcuekc9xt.typeform.com/to/BTegGr9w",
        target: true
    },
    {
        label: "FAQ's",
        link: "/faq",
        target: false
    },
    {
        label: "Suggest a Feature",
        link: "https://f7xcuekc9xt.typeform.com/to/Zpryygkm",
        target: true
    },
    {
        label: "Report a bug",
        link: "https://f7xcuekc9xt.typeform.com/to/ff4rGkXc",
        target: true
    },
    {
        label: "Privacy Policy",
        link: "/data-privacy-policy",
        target: false
    }
]

const Resources = () => {
    return (
        <div className="flex flex-col w-1/2 ">
            <div className=" my-4 font-[700] sm:text-[19px]">Resources</div>
            <div className=" flex flex-row h-[100%]">
                <div className=" bg-[#6E498E] w-[2px] mr-4"></div>
                <div className=" text-dtech-main-grey sm:font-[400] sm:text-[16px]">
                    {
                        Resource.map((item: any, index: any) => (
                            <div key={index}>
                                <CustomLink item={item}  />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Resources;