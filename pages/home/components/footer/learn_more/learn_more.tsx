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
        link: "/register-data-source",
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
            <div className=" my-4 font-bold sm:text-lg">Learn More</div>
            <div className=" flex flex-row h-[100%]">
                <div className=" bg-dtech-light-teal w-[2px] mr-4 "></div>
                <div className=" text-dtech-main-grey">
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