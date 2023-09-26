import { Carousel } from "@trendyol-js/react-carousel";
import { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import DiscoverVM from "./discover_by_components/discover.vm";
import DataProviderCard from "components/UI/dataprovider_result_card";
import { Data } from "components/UI/result_card";
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
    isLoading
}: {
    dataObjects: Data[];
    isMobile: boolean;
    isLoading:boolean
}) => {
    const [slides, setSlides] = useState<number>(4);
    const discoverVM = DiscoverVM();

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
    //     };

    //     // Call handleResize on initial component render
    //     handleResize();

    //     // Add event listener to window resize
    //     window.addEventListener("resize", handleResize);

    //     // Clean up event listener on component unmount
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);
    useEffect(() => {
        isMobile ? setSlides(2.1) : setSlides(3.5);
    }, [isMobile]);
    function truncateString(str: string | undefined, maxLength: number) {
        if (str && str.length > maxLength) {
            return str?.slice(0, maxLength) + "...";
        }
        return str;
    }

    if(isLoading){
        return <div className="mt-20 ml-[-30px] w-[100%]"><Carousel
        dynamic={true}
        show={slides}
        slide={slides}
        swiping={true}
        leftArrow={
            <button
                style={{
                    background:
                        "linear-gradient(to right, #1EABAF4F, #0065BD08)",
                }}
                className="absolute z-10 left-0 sm:h-[89%] h-[94%] mt-2 sm:mt-4 w-[30%] sm:w-40 text-white py-2 px-2 rounded"
            >
                <div className=" hover:bg-[#0065BD] hover:rounded-full hover:animate-pulse focus-within:rounded-full focus:rounded-full focus-visible:rounded-full active:rounded-full focus-within:bg-white focus-within:border-b-2 focus-within:border-black active:bg-white focus:bg-white w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center focus-within:text-dtech-dark-teal focus-visible:text-dtech-dark-teal active:text-dtech-dark-teal">
                    <BiChevronLeft
                        className=""
                        size={isMobile ? 50 : 100}
                    />
                </div>
            </button>
        }
        rightArrow={
            <button
                onClick={() => {
                    discoverVM.fetchProviders(dataObjects.length, 4);
                }}
                style={{
                    background:
                        "linear-gradient(to left, #1EABAF4F, #0065BD08)",
                }}
                className="absolute z-10 right-0 sm:h-[89%] h-[94%] mt-2 sm:mt-4 w-[30%] sm:w-40 text-white py-2 px-2 rounded"
            >
                <div className=" hover:bg-[#0065BD] hover:rounded-full sm:w-24 sm:h-24 hover:animate-pulse focus-within:rounded-full focus:rounded-full focus-visible:rounded-full active:rounded-full focus-within:bg-white focus-within:border-b-2 focus-within:border-black active:bg-white focus:bg-white w-24 h-24 flex items-center justify-center focus-within:text-dtech-dark-teal focus-visible:text-dtech-dark-teal active:text-dtech-dark-teal">
                    <BiChevronRight
                        className=""
                        size={isMobile ? 50 : 100}
                    />
                </div>
            </button>
        }
        infinite={false}
        responsive={true}
    >
        {Array(20)
                        .fill(1)
                        .map((_, index) => (
                            <div key={index} className="border border-gray-100 rounded-md md:rounded-xl shadow-custom-3  min-h-[100%] max-w-[90%]  md:max-h-[10%] md:min-w-[100%] p-2 w-[100%]">
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
    }
    if (!dataObjects) {
        return <div className=' flex items-center justify-center'>
            No Data To Show
        </div>

    }
    return (
        <Carousel
            dynamic={true}
            show={slides}
            slide={slides}
            swiping={true}
            leftArrow={
                <button
                    style={{
                        background:
                            "linear-gradient(to right, #1EABAF4F, #0065BD08)",
                    }}
                    className="absolute z-10 left-0 sm:h-[89%] h-[94%] mt-2 sm:mt-4 w-[30%] sm:w-40 text-white py-2 px-2 rounded"
                >
                    <div className=" hover:bg-[#0065BD] hover:rounded-full hover:animate-pulse focus-within:rounded-full focus:rounded-full focus-visible:rounded-full active:rounded-full focus-within:bg-white focus-within:border-b-2 focus-within:border-black active:bg-white focus:bg-white w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center focus-within:text-dtech-dark-teal focus-visible:text-dtech-dark-teal active:text-dtech-dark-teal">
                        <BiChevronLeft
                            className=""
                            size={isMobile ? 50 : 100}
                        />
                    </div>
                </button>
            }
            rightArrow={
                <button
                    onClick={() => {
                        discoverVM.fetchProviders(dataObjects.length, 4);
                    }}
                    style={{
                        background:
                            "linear-gradient(to left, #1EABAF4F, #0065BD08)",
                    }}
                    className="absolute z-10 right-0 sm:h-[89%] h-[94%] mt-2 sm:mt-4 w-[30%] sm:w-40 text-white py-2 px-2 rounded"
                >
                    <div className=" hover:bg-[#0065BD] hover:rounded-full sm:w-24 sm:h-24 hover:animate-pulse focus-within:rounded-full focus:rounded-full focus-visible:rounded-full active:rounded-full focus-within:bg-white focus-within:border-b-2 focus-within:border-black active:bg-white focus:bg-white w-24 h-24 flex items-center justify-center focus-within:text-dtech-dark-teal focus-visible:text-dtech-dark-teal active:text-dtech-dark-teal">
                        <BiChevronRight
                            className=""
                            size={isMobile ? 50 : 100}
                        />
                    </div>
                </button>
            }
            infinite={false}
            responsive={true}
        >
            {dataObjects.map((item: Data, index: any) => {
                const imageText = item?.title
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("");
                return (
                    <div
                        className="grid grid-col min-h-[100%] relative p-2 sm:p-4"
                        key={index}
                    >
                        <DataProviderCard
                            key={`${item.id}_${index}`}
                            data={item}
                            isMobile={isMobile}
                        />
                    </div>
                );
            })}
        </Carousel>
    );
};
export default CardComponent;
