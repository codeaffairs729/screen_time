import { useState, useEffect } from "react"
import Carousel from "./Carousel";
// import BarChart from "./bar_graph";
import dynamic from "next/dynamic";
import clsx from "clsx";
const BarChart = dynamic(() => import("./bar_graph"), {
    loading: () => <p>A map is loading</p>,
    ssr: false, // This line is important. It's what prevents server-side render
});
const titles = {
    yAxis: "Percentage of datasets",
    xAxis: "Score"
}
const GraphSection = ({ items }: { items: any }) => {
    const [currentSlide, setCurrentSlide] = useState<String>("overallScore");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
        };

        // Call handleResize on initial component render
        handleResize();

        // Add event listener to window resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    function splitAndCapitalize(input: String) {
        const words = input.split(/(?=[A-Z])/); // Split camel case using regex
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    // return <BarChart data={items[`${currentSlide}`]?.rating} isMobile={isMobile} />
    interface RatingObject {
        [key: number]: number;
    }

    function calculateRatingPercentages(ratings: RatingObject[]): RatingObject[] {
        let totalSum = 0;
        let totalCount = 0;

        ratings.forEach(ratingObj => {
            const [ratingValue, count] = Object.entries(ratingObj)[0];
            totalSum += Number(ratingValue) * count;
            totalCount += count;
        });

        const ratingPercentages: RatingObject[] = ratings.map(ratingObj => {
            const [ratingValue, count] = Object.entries(ratingObj)[0];
            const percentage = (count / totalCount) * 100;
            return { [ratingValue]: percentage };
        });

        return ratingPercentages;
    }
    return (
         <div className={clsx('sm:p-10 flex flex-col sm:flex-row items-center justify-center sm:space-x-20',isMobile&&" !flex-col-reverse")}>
             <div className="sm:block py-4 sm:py-0">
                 <Carousel items={items} currentSlide={currentSlide} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} isMobile={isMobile} setCurrentSlide={setCurrentSlide} />
             </div>
             <div className=" flex flex-col items-center sm:w-[50%] h-full">
                 <div className="hidden sm:block font-bold text-xl">Distribution of {splitAndCapitalize(currentSlide)}</div>
                 <div className=" shadow-custom-1 mt-5 w-full ">
                    <BarChart data={calculateRatingPercentages(items[`${currentSlide}`]?.rating)} isMobile={isMobile} titles={titles} />
                 </div>
             </div>
             {/* <div className="sm:hidden block">
                 <Carousel items={items} isMobile={isMobile} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
             </div> */}
         </div>
    )
}
export default GraphSection