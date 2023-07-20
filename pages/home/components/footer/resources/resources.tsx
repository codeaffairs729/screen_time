import Link from "next/link";
import CustomLink from "../custom_link";
const Resource = [
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
        <div className="flex flex-col w-1/2">
            <div className=" my-4 font-bold sm:text-lg">Resources</div>
            <div className=" flex flex-row">
                <div className=" bg-dtech-light-teal w-[2px] mr-4 sm:h-[510px] h-[220px] "></div>
                <div className=" text-dtech-main-grey">
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