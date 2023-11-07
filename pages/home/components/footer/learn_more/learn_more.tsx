import Link from "next/link";
import CustomLink from "../custom_link";
const LearnMoreObjects = [
    {
        label: "API",
        link: "https://api.dtechtive.com/docs",
        target: false
    },
    {
        label: "Data Source Registration",
        link: "/register-data-source#viewCatalogue",
        target: false,
        isAuthRequired:true
    },
    // {
    //     label: "Data Provider",
    //     link: "/",
    //     target: false
    // },
    // {
    //     label: "Data User",
    //     link: "/",
    //     target: false
    // },
    // {
    //     label: "Data Enablers",
    //     link: "/",
    //     target: false
    // },
    // {
    //     label: "Subscription Plan",
    //     link: "/account#subscription",
    //     target: false
    // },
    // {
    //     label: "Data Catalogue",
    //     link: "/",
    //     target: false
    // }
]
const LearnMore = () => {
    return (
        <div className="flex flex-col w-1/2">
            <div className=" my-4 font-[700] sm:text-[19px]">Learn More</div>
            <div className=" flex flex-row h-[100%]">
                <div className=" bg-[#6E498E] w-[2px] mr-4 "></div>
                <div className=" text-dtech-main-grey sm:font-[400] sm:text-[16px]">
                    {LearnMoreObjects.map((item: any, index: number) => (
                        <div key={index}>
                            <CustomLink item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default LearnMore;