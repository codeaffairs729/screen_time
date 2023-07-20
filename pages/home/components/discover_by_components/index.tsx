import { RecommendationItem } from "pages/home/index.page";
import CardComponent from "../card_component";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link"
import DiscoverByDataProviders from "./discover_by_data_providers";
import DiscoverByTopics from "./discover_by_topics";
import DiscoverByRegions from "./discover_by_regions";
import RecommendedDatasets from "./recommended_datasets";
const recommendations: RecommendationItem[] = [{
    title: "fwefwef",
    subTitle: "SNH nature reserves (NR) are those SNH properties vwevewf ewfewfew ewfev cerferfewf   ewfewfewfewjmlkmlkmlkmlkmlkmwewfewf...",
    imageUrl: "/images/home.png",
    recommended: true,

}, {
    title: "fwefwef",
    subTitle: "SNH nature reserves (NR) are those SNH properties...",
    imageUrl: "/images/home.png",
    recommended: false,

}, {
    title: "fwefwef",
    subTitle: "SNH nature reserves (NR) are those SNH properties...",
    imageUrl: "/images/home.png",
    recommended: true,

}, {
    title: "fwefwef",
    subTitle: "SNH nature reserves (NR) are those SNH properties...",
    imageUrl: "/images/home.png",
    recommended: true,

}, {
    title: "fwefwef",
    subTitle: "SNH nature reserves (NR) are those SNH properties...",
    imageUrl: "/images/home.png",
    recommended: true,

}, {
    title: "fwefwef",
    subTitle: "SNH nature reserves (NR) are those SNH properties...",
    imageUrl: "/images/home.png",
    recommended: true,

}, {
    title: "fwefwef",
    subTitle: "SNH nature reserves (NR) are those SNH properties...",
    imageUrl: "/images/home.png",
    recommended: true,

}, {
    title: "fwefwef",
    subTitle: "SNH nature reserves (NR) are those SNH properties...",
    imageUrl: "/images/home.png",
    recommended: true,

}, {
    title: "fwefwef",
    subTitle: "SNH nature reserves (NR) are those SNH properties...",
    imageUrl: "/images/home.png",
    recommended: true,

}, {
    title: "fwefwef",
    subTitle: "SNH nature reserves (NR) are those SNH properties...",
    imageUrl: "/images/home.png",
    recommended: true,

}
]
const DiscoverByComponent = ({ isMobile }: { isMobile: boolean }) => {
    return (
        <div>
            <RecommendedDatasets  isMobile={isMobile} recommendations={recommendations}/>
            <DiscoverByDataProviders isMobile={isMobile} recommendations={recommendations} />
            <DiscoverByRegions isMobile={isMobile} recommendations={recommendations} />
            <DiscoverByTopics isMobile={isMobile} recommendations={recommendations} />
        </div>
    )
}
export default DiscoverByComponent;