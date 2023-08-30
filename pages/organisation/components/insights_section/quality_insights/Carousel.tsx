import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { Menu } from "@headlessui/react";
import { roundRatings } from "components/UI/star_rating";

function Carousel({ items, currentSlide, setCurrentSlide, isMobile, currentIndex, setCurrentIndex}: { items: any, currentSlide: String, setCurrentSlide: Function, isMobile:boolean, currentIndex:number, setCurrentIndex:Function }) {
    const [visibleFactors, setVisibleFactors] = useState([""])
    const handlePrev = () => {
        setCurrentIndex((prevIndex:number) => Math.max(prevIndex - 1, 0));
    };
    function splitAndCapitalize(input: string) {
        const words = input.split(/(?=[A-Z])/); // Split camel case using regex
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    const handleNext = () => {
        setCurrentIndex((prevIndex: number) => Math.min(prevIndex + 1, isMobile ? Object.keys(items).length - 2 : Object.keys(items).length - 3));
    };
    function calculateAverageStars(data: any) {
        const totalStars = data?.reduce((acc: any, obj: any) => {
            const star: any = Object.keys(obj)[0];
            const votes = obj[star];
            return acc + (star * votes);
        }, 0);

        const totalVotes = data?.reduce((acc: any, obj: any): any => acc + Object.values(obj)[0], 0);

        if (totalVotes === 0) {
            return 0; // To avoid division by zero
        }

        const value = totalStars / totalVotes;
        if (Number.isNaN(value)) return 0
        else return value
    }
    useEffect(() => {
        if (isMobile) {
            setVisibleFactors(Object.keys(items).slice(currentIndex, currentIndex + 2))
        }
        else {
            setVisibleFactors(Object.keys(items).slice(currentIndex, currentIndex + 3))
        }
    }, [isMobile])
    useEffect(() => {
        setVisibleFactors(Object.keys(items).slice(currentIndex, currentIndex + (isMobile?2:3)))
    },[currentIndex])
    // const visibleFactors = isMobile ? Object.keys(items).slice(currentIndex, currentIndex + 2) : Object.keys(items).slice(currentIndex, currentIndex + 3);

    return (
        <div className=" w-fit flex flex-row sm:flex-col items-center justify-center ">
            <button
                className={`sm:mx-2 sm:px-4 px-2 -rotate-90 sm:rotate-0 sm:py-2 py-1 ${currentIndex === 0 ? "text-white" : " "
                    }`}
                onClick={handlePrev}
            >
                <VscTriangleUp/>
            </button>
            <div className="flex flex-row mt-4 sm:mt-0 sm:flex-col space-x-3 sm:space-x-0 items-center justify-center">
                {visibleFactors.map((factor, index) => (
                    <div className='flex flex-col cursor-pointer sm:m-4 font-bold items-center justify-center max-w-fit' key={index}
                        onClick={() => setCurrentSlide(factor)}
                    >
                        <div className={clsx(' sm:px-3 px-6 py-1 sm:py-2 border-[2px] rounded-xl text:xs sm:text-2xl ', currentSlide == factor && " border-dtech-new-main-light text-dtech-new-main-light")}>
                            {roundRatings(calculateAverageStars(items[factor]?.rating))}/5
                        </div>
                        <div className={clsx(" text-sm", currentSlide == factor && "text-dtech-new-main-light")}>{splitAndCapitalize(items[factor]?.title||"")}</div>
                    </div>
                ))}
            </div>

            <button
                className={`sm:mx-2 sm:px-4 px-2 sm:py-2 -rotate-90 sm:rotate-0 py-1 ${currentIndex >= (isMobile ? Object.keys(items).length - 2 : Object.keys(items).length - 3) ? "text-white" : ""
                    }`}
                onClick={handleNext}
            >
                <VscTriangleDown />
            </button>
        </div>
    );
}

export default Carousel;
