import { Carousel } from "@trendyol-js/react-carousel";
import { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import DiscoverVM from "./discover_by_components/discover.vm";
import DataProviderCard from "components/UI/dataprovider_result_card";
import { Data } from "components/UI/result_card";
import TopicCard from "components/UI/topic_result_card";
interface RecommendationItem {
    title: string;
    subTitle?: string;
    imageUrl: string;
    recommended?: boolean;
    id: string;
}
const CardComponent = ({
    dataObjects,
    isMobile,
    isLoading,
    discoverby,
}: {
    dataObjects: Data[];
    isMobile: boolean;
    isLoading: boolean;
    discoverby?: string;
}) => {
    const [slides, setSlides] = useState<number>(2);
    const discoverVM = DiscoverVM();
    const [cards, setCards] = useState<Array<any>>([])
    const [shuffleDone, setShuffleDone] = useState(false);

    useEffect(() => {
        isMobile ? setSlides(2) : setSlides(3.5);
    }, [isMobile]);

    function shuffleArray(cardItems: any[]): any[] {
        for (let i = cardItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardItems[i], cardItems[j]] = [cardItems[j], cardItems[i]];
        }
        return cardItems;
    }

    useEffect(() => {
            !shuffleDone&&setCards(shuffleArray(dataObjects));
            dataObjects.length>0&&setShuffleDone(true);
    }, [dataObjects, shuffleDone]); 
    if (isLoading) {
        return (
            <div className="w-[100%]">
                <Carousel
                    dynamic={true}
                    show={slides}
                    slide={slides}
                    swiping={true}
                    leftArrow={<div></div>}
                    rightArrow={<div></div>}
                    infinite={false}
                    responsive={true}
                >
                    {Array(20)
                        .fill(1)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="border border-gray-100 rounded-md md:rounded-xl shadow-custom-3  min-h-[100%] max-w-[90%]  md:max-h-[10%] md:min-w-[100%] p-2 w-[100%]"
                            >
                                <div className="border-2  bg-[#EBEBEB]  rounded ">
                                    <div className="border-2 bg-gray-400 bg-opacity-60 animate-pulse rounded py-9 mx-1 my-2 md:py-16 md:my-4 md:mx-4 "></div>
                                </div>
                                <div className="border-2  animate-pulse bg-[#EBEBEB]  md:h-[50px]">
                                    <div className="animate-pulse bg-gray-400 bg-opacity-60 rounded-md w-[70%] p-1 md:p-2 mt-5 mb-2 md:mb-1 ml-2 md:ml-4"></div>
                                </div>
                            </div>
                        ))}
                </Carousel>
            </div>
        );
    }
    if (!dataObjects) {
        return (
            <div className=" flex items-center justify-center">
                No Data To Show
            </div>
        );
    }
    return (
        <Carousel
            dynamic={true}
            show={slides}
            slide={2}
            swiping={true}
            leftArrow={
                !isMobile ? (
                    <button
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(181, 133, 183, 0.53) -33.18%, rgba(109, 205, 203, 0.22) 46.47%, rgba(235, 246, 246, 0) 98.63%)",
                            left: "15px",
                            borderRadius: "13px",
                        }}
                        className="absolute flex justify-center items-center z-10 left-0 sm:h-[80%] md:h-[89%] h-[94%] mt-2 sm:mt-4 w-[30%] sm:w-[14%] text-white py-2 px-2 rounded"
                    >
                        <div className=" hover:bg-[#0065BD] hover:rounded-full hover:animate-pulse focus-within:rounded-full focus:rounded-full focus-visible:rounded-full active:rounded-full focus-within:bg-white focus-within:border-b-2 focus-within:border-black active:bg-white focus:bg-white w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex items-center justify-center focus-within:text-dtech-dark-teal focus-visible:text-dtech-dark-teal active:text-dtech-dark-teal">
                            <BiChevronLeft
                                className=""
                                size={isMobile ? 50 : 100}
                            />
                        </div>
                    </button>
                ) : (
                    <div></div>
                )
            }
            rightArrow={
                !isMobile ? (
                    <button
                        // onClick={() => {
                        //     discoverVM.fetchProviders(dataObjects.length, 4);;
                        // }}
                        style={{
                            background:
                                "linear-gradient(-90deg, rgba(181, 133, 183, 0.53) -33.18%, rgba(109, 205, 203, 0.22) 46.47%, rgba(235, 246, 246, 0) 98.63%)",
                        }}
                        className="absolute flex justify-center items-center z-10 right-0 sm:h-[80%] md:h-[88%] h-[94%] mt-2 sm:mt-4 w-[30%] sm:w-[14%] text-white py-2 px-2 rounded"
                    >
                        <div className=" hover:bg-[#0065BD] hover:rounded-full w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 hover:animate-pulse focus-within:rounded-full focus:rounded-full focus-visible:rounded-full active:rounded-full focus-within:bg-white focus-within:border-b-2 focus-within:border-black active:bg-white focus:bg-white flex items-center justify-center focus-within:text-dtech-dark-teal focus-visible:text-dtech-dark-teal active:text-dtech-dark-teal">
                            <BiChevronRight
                                className=""
                                size={isMobile ? 50 : 100}
                            />
                        </div>
                    </button>
                ) : (
                    <div></div>
                )
            }
            infinite={false}
            responsive={true}
        >
            {cards.map((item: Data, index: any) => {
                return (
                    <div
                        className="grid grid-col min-h-[100%] relative sm:p-4"
                        key={index}
                    >
                        {discoverby === "topic" ? (
                            <TopicCard
                                key={`${item.id}_${index}`}
                                data={item}
                                isMobile={isMobile}
                                imgCss={"object-cover h-full w-full"}
                            />
                        ) : (
                            <DataProviderCard
                                key={`${item.id}_${index}`}
                                data={item}
                                isMobile={isMobile}
                            />
                        )}
                    </div>
                );
            })}
        </Carousel>
    );
};
export default CardComponent;
