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
import {
    discoverToResultCardData
} from "./discover.vm";
import { topicToResultCardData } from "pages/search/topics/topics.vm";
const DiscoverByComponent = ({ isMobile }: { isMobile: boolean, }) => {
    const [providers, setProviders] = useState<any[]>()
    const [topics, setTopics] = useState<any[]>()
    const discoverVM = DiscoverVM()

    useEffect(() => {
        setProviders(shuffleArray(discoverVM.fetchedProviders))
    }, [discoverVM.fetchedProviders])

    useEffect(() => {
        setTopics(shuffleArray(discoverVM.fetchedTopics))
    }, [discoverVM.fetchedTopics])

    useEffect(() => {
        discoverVM.fetchProviders()
        discoverVM.fetchTopics()
    }, []);
    function shuffleArray(cardItems: any[]): any[] {
        for (let i = cardItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardItems[i], cardItems[j]] = [cardItems[j], cardItems[i]];
        }
        return cardItems;
    }
    return (
        <div className="mb-5 sm:mb-20">
            {/* <RecommendedDatasets  isMobile={isMobile} recommendations={recommendations}/> */}
            <DiscoverByTopics isMobile={isMobile} recommendations={topicToResultCardData(topics)} isLoading={discoverVM.isLoadingTopic} />
            <DiscoverByDataProviders isMobile={isMobile} recommendations={discoverToResultCardData(providers)} isLoading={discoverVM.isLoading} />
            {/* <DiscoverByRegions isMobile={isMobile} recommendations={recommendations} /> */}
        </div>
    )
}
export default DiscoverByComponent;