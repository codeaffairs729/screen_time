import React, { ReactNode } from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useIsMobile } from "common/hooks";

interface ImageObjectType {
    src: string;
    text1: string;
    text2: string;
}

const NewGradientUI = ({
    children,
    backgroundGradient = "",
    imageObjects = [
        {
            src: "/images/login.png",
            text1: "By 2025, the global dataset volume is estimated to be 180 zettabytes (one followed by 21 zeroes!).",
            text2: "Dtechtive will help you surf through this vast sea of datasets with ease.",
        },
        {
            src: "/images/signup.svg",
            text1: "Many datasets escape the sight of existing search engines due to non-standard publishing practices.",
            text2: "Fear not, Dtechtive uncovers those datasets with wit and wisdom!",
        },
        {
            src: "/images/signup2.svg",
            text1: "Knowledge workers spend up to 25% of their time searching for data, costing millions for organisations.",
            text2: "Dtechtive saves both time and money.",
        },
    ],
}: {
    children: ReactNode;
    backgroundGradient?: string;
    imageObjects?: ImageObjectType[];
}) => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: false,
    };

    const { isMobile} = useIsMobile();
    const [imageIndex, setImageIndex] = useState(0);
    const [imageSrc, setImageSrc] = useState(imageObjects);

    const gradientStyle = {
        background: isMobile
            ? backgroundGradient
                ? backgroundGradient
                : "linear-gradient(180deg, rgba(183, 133, 151, 0.30) -10.01%, rgba(109, 205, 203, 0.22) 58.69%)"
            : "",
    };
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setImageIndex((prevIndex) => (prevIndex + 1) % imageSrc.length);
    //     }, 10000);

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [imageSrc.length]);

    // useEffect(() => {
    //     setImageSrc((prevSrc) =>
    //         prevSrc.map((src, index) =>
    //             index === imageIndex ? src : prevSrc[index]
    //         )
    //     );
    // }, [imageIndex]);

    return (
        <div className="flex flex-row justify-between h-screen z-0">
            <div className="md:w-1/2 max-h-screen hidden md:block">
                <Slider {...settings} className="login-slickdots">
                    {imageObjects?.map((item:any,index:number) => {
                        return (
                            <div key={index} className=" hidden h-screen bg-gradient-to-b from-[rgba(181,_133,_183,_0.53)_-10.01%] to-[rgba(109,_205,_203,_0.22)_102.15%] text-center md:!flex flex-col items-center justify-center p-8">
                                <h2 className=" text-white font-bold hidden md:block lg:text-2xl md:text-xl lg:px-24 md:px-20">
                                    {item.text1}
                                </h2>
                                <h2 className="font-semibold text-dtech-main-dark mt-6 hidden md:block lg:text-2xl md:text-xl lg:px-24 md:px-20">
                                    {item.text2}
                                </h2>
                                <img
                                    className=" hidden md:block"
                                    src={item.src}
                                    width={550}
                                ></img>
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <div className=" bg-[#6DCDCB] h-screen  w-2 ml-5 sm:ml-0 fixed md:relative md:w-4"></div>
            <div className=" bg-[#0065BD] h-screen  w-6 sm:hidden md:relative md:w-8"></div>
            <div
                className="flex flex-col w-fixed md:w-1/2 w-screen md:bg-white overflow-scroll"
                style={gradientStyle}
            >
                {children}
            </div>
        </div>
    );
};

export default NewGradientUI;
