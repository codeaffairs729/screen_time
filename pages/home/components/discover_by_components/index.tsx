import { RecommendationItem } from "pages/home/index.page";
import CardComponent from "../card_component";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link"
import { useState,useEffect } from 'react'
import DiscoverByDataProviders from "./discover_by_data_providers";
import DiscoverByTopics from "./discover_by_topics";
import DiscoverByRegions from "./discover_by_regions";
import RecommendedDatasets from "./recommended_datasets";
import DiscoverVM from "./discover.vm";
import Loader from "components/UI/loader";
// const recommendations: RecommendationItem[] = [{
//     title: "fwefwef",
//     subTitle: "SNH nature reserves (NR) are those SNH properties vwevewf ewfewfew ewfev cerferfewf   ewfewfewfewjmlkmlkmlkmlkmlkmwewfewf...",
//     imageUrl: "/images/home.png",
//     recommended: true,

// }, {
//     title: "fwefwef",
//     subTitle: "SNH nature reserves (NR) are those SNH properties...",
//     imageUrl: "/images/home.png",
//     recommended: false,

// }, {
//     title: "fwefwef",
//     subTitle: "SNH nature reserves (NR) are those SNH properties...",
//     imageUrl: "/images/home.png",
//     recommended: true,

// }, {
//     title: "fwefwef",
//     subTitle: "SNH nature reserves (NR) are those SNH properties...",
//     imageUrl: "/images/home.png",
//     recommended: true,

// }, {
//     title: "fwefwef",
//     subTitle: "SNH nature reserves (NR) are those SNH properties...",
//     imageUrl: "/images/home.png",
//     recommended: true,

// }, {
//     title: "fwefwef",
//     subTitle: "SNH nature reserves (NR) are those SNH properties...",
//     imageUrl: "/images/home.png",
//     recommended: true,

// }, {
//     title: "fwefwef",
//     subTitle: "SNH nature reserves (NR) are those SNH properties...",
//     imageUrl: "/images/home.png",
//     recommended: true,

// }, {
//     title: "fwefwef",
//     subTitle: "SNH nature reserves (NR) are those SNH properties...",
//     imageUrl: "/images/home.png",
//     recommended: true,

// }, {
//     title: "fwefwef",
//     subTitle: "SNH nature reserves (NR) are those SNH properties...",
//     imageUrl: "/images/home.png",
//     recommended: true,

// }, {
//     title: "fwefwef",
//     subTitle: "SNH nature reserves (NR) are those SNH properties...",
//     imageUrl: "/images/home.png",
//     recommended: true,

// }
// ]
const convertToJson = (input_data: any) => {
    const output_data = input_data?.map((item: any) => ({
        title: item.title,
        subTitle: null,
        imageUrl: item.imageUrl || null,
        recommended: false,
        id: item.id
    }));
    return output_data
}
const DiscoverByComponent = ({ isMobile }: { isMobile: boolean, }) => {
    const [providers, setProviders] = useState<any[]>()
    const discoverVM = DiscoverVM()
    useEffect(() => {
        setProviders(discoverVM.fetchedProviders)
    }, [discoverVM.fetchedProviders])
    useEffect(() => {
        discoverVM.fetchProviders()
    }, []);
    if (discoverVM.isLoading)
        return <div className=" h-screen w-screen flex items-center justify-center">
            <Loader />
        </div>
    return (
        <div>
            {/* <RecommendedDatasets  isMobile={isMobile} recommendations={recommendations}/> */}
            <DiscoverByDataProviders isMobile={isMobile} recommendations={convertToJson(providers)} />
            {/* <DiscoverByRegions isMobile={isMobile} recommendations={recommendations} />
            <DiscoverByTopics isMobile={isMobile} recommendations={recommendations} /> */}
        </div>
    )
}
export default DiscoverByComponent;