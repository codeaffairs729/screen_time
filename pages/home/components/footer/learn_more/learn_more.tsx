import Link from "next/link";
import CustomLink from "../custom_link";
const LearnMoreObjects = [
    {
        label: "Data Provider",
        link: "/",
        target: false
    },
    {
        label: "Data User",
        link: "/",
        target: false
    },
    {
        label: "Data Enablers",
        link: "/",
        target: false
    },
    {
        label: "Subscription Plan",
        link: "/account#subscription",
        target: false
    },
    {
        label: "API",
        link: "https://api.dtechtive.com/docs",
        target: false
    },
    {
        label: "Register a Data Source",
        link: "/register-data-source",
        target: false
    },
    {
        label: "Data Catalogue",
        link: "/",
        target: false
    }
]
const LearnMore = () => {
    return (
        <div className="flex flex-col w-1/2 ">
            <div className=" my-4 font-bold sm:text-lg">Learn More</div>
            <div className=" flex flex-row">
                <div className=" bg-dtech-light-teal w-[2px] mr-4 sm:h-[510px]"></div>
                <div className=" text-dtech-main-grey">
                    {LearnMoreObjects.map((item: any, index: number) => (
                        <div key={index}>
                            <CustomLink item={item} />
                        </div>
                    ))}

                    {/* <div className=" sm:mb-3 mb-1">
                        <Link href={""}>Data User</Link>
                    </div>
                    <div className=" sm:mb-3 mb-1">
                        <Link href={""}>Data Enablers</Link>
                    </div>
                    <div className=" sm:mb-3 mb-1">
                        <Link href={"/account#subscription"}>Subscription Plan</Link>
                    </div>
                    <div className=" sm:mb-3 mb-1">
                        <a target="_blank"><Link href={"https://api.dtechtive.com/docs"}>API</Link></a>
                    </div>
                    <div className=" sm:mb-3 mb-1">
                        <Link href={"/register-data-source"}>Register a Data Source</Link>
                    </div>
                    <div className=" sm:mb-3 mb-1">
                        <Link href={""}>Data Catalogue</Link>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default LearnMore;