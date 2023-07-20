import { Carousel } from '@trendyol-js/react-carousel';
import { useState, useEffect, useRef } from 'react';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface RecommendationItem {
    title: string;
    subTitle?: string;
    imageUrl: string;
    recommended?: boolean;
}
const CardComponent = ({ dataObjects, isMobile }: { dataObjects: RecommendationItem[], isMobile : boolean}) => {
    const [slides, setSlides] = useState<number>(4)
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
        isMobile?setSlides(2):setSlides(4)
        
    }, [isMobile])
    function truncateString(str:string|undefined, maxLength:number) {
        if (str&&str.length > maxLength) {
            return str?.slice(0, maxLength) + '...';
        }
        return str;
    }
    return (
        <Carousel
            dynamic={true}
            show={slides}
            slide={ slides}
            swiping={true}
            leftArrow={<button style={{ background: "linear-gradient(to right, #1EABAF4F, #0065BD08)" }} className=" absolute z-10  left-0  sm:h-[89%] h-[94%] mt-2 sm:mt-4 w-[30%] sm:w-40 text-white py-2 px-4 rounded"><div className=' hover:bg-[#0065BD] hover:rounded-full hover:animate-pulse focus-within:rounded-full focus:rounded-full focus-visible:rounded-full active:rounded-full focus-within:bg-white focus-within:border-b-2 focus-within:border-black active:bg-white focus:bg-white w-24 h-24 flex items-center justify-center focus-within:text-dtech-dark-teal focus-visible:text-dtech-dark-teal active:text-dtech-dark-teal'><BiChevronLeft className='' size={100} /></div></button>}
            rightArrow={<button style={{ background: "linear-gradient(to left, #1EABAF4F, #0065BD08)" }} className=" absolute z-10 right-0  sm:h-[89%] h-[94%] mt-2 sm:mt-4 w-[30%]   sm:w-40 text-white py-2 px-4 rounded"><div className=' hover:bg-[#0065BD] hover:rounded-full hover:animate-pulse focus-within:rounded-full focus:rounded-full focus-visible:rounded-full active:rounded-full focus-within:bg-white focus-within:border-b-2 focus-within:border-black active:bg-white focus:bg-white w-24 h-24 flex items-center justify-center focus-within:text-dtech-dark-teal focus-visible:text-dtech-dark-teal active:text-dtech-dark-teal'><BiChevronRight className='' size={100} /></div></button>}
            infinite={false}
            responsive={true}
        >{dataObjects.map((item: RecommendationItem, index: any) => (
            <div className="flex flex-col relative max-w-[290px] p-2 sm:p-4" key={index}>
                <div className=' border-b-2 max-h-32 overflow-hidden'>
                {item.recommended && isMobile && <div className=" absolute ml-2 sm:hidden p-2 bg-white z-50"><img src="/images/icons/recommended.svg" /></div>}
                {isMobile && <div className="absolute ml-2 p-2 bg-white z-50 left-28"><img src="images/icons/curved_arrow.svg" /></div>}
                <img  src={item.imageUrl}  className=' max-w-[100%] max-h-[100%] block'/>
                </div>

                <div className=" hover:bg-[#D9EFFC] max-h-28 break-word overflow-hidden     focus-within:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black active:bg-[#FDD522] focus:bg-[#FDD522] flex flex-col p-2 sm:p-4 shadow-lg">
                    <div className=" flex flex-row items-center justify-between ">
                        <div className="flex flex-row items-center ">
                            <div className="font-bold text-md sm:text-xl text-dtech-new-main-light">{item.title}</div>
                            <div className=" mx-1 hidden sm:block"><img src="images/icons/curved_arrow.svg" /></div>
                        </div>
                        {item.recommended && <div className=" hidden sm:block"><img src="/images/icons/recommended.svg" /></div>}
                    </div>
                    {item.recommended && <div className=" text-dtech-main-grey text-sm ">
                        {truncateString(item.subTitle,65)}
                    </div>}
                </div>
            </div>
        ))}

        </Carousel>
    )
}
export default CardComponent