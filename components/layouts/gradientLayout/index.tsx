import React, { ReactNode } from "react";
import { useEffect, useState } from "react";
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
    const [isMobile, setIsMobile] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [imageSrc, setImageSrc] = useState(imageObjects);

    const gradientStyle = {
        background: isMobile
            ? backgroundGradient
                ? backgroundGradient
                : "linear-gradient(to bottom right, #FFFFFF, #3F0068)"
            : "",
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % imageSrc.length);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [imageSrc.length]);

    useEffect(() => {
        setImageSrc((prevSrc) =>
            prevSrc.map((src, index) =>
                index === imageIndex ? src : prevSrc[index]
            )
        );
    }, [imageIndex]);

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
    return (
        <div className="flex flex-row justify-between h-screen z-0">
            <div
                className=" hidden md:w-2/3 max-h-screen bg-black text-center md:flex flex-col items-center justify-center p-8"
                // style={{
                //     background:
                //         "linear-gradient(146.51deg, #0065BD -7.18%, rgba(40, 161, 151, 0.19) 98.96%)",
                // }}

                style={{
                    background:"linear-gradient(to bottom right, #FFFFFF, #3F0068)"
                        
                }}
            >
                <h2 className=" text-white font-bold text-2xl px-24 hidden md:block">
                    {imageSrc[imageIndex].text1}
                </h2>
                <h2 className="font-semibold text-dtech-main-dark text-2xl px-24 mt-6 hidden md:block">
                    {imageSrc[imageIndex].text2}
                </h2>
                <img
                    className=" hidden md:block"
                    // style={{
                    //     opacity: imageIndex === 0 ? 1 : 0,
                    //     transition: "opacity  ease-in-out",
                    //   }}
                    src={imageSrc[imageIndex].src}
                    width={350}
                ></img>
            </div>
            <div className=" bg-dtech-dark-teal h-screen  w-2 ml-5 sm:ml-0 fixed md:relative md:w-8"></div>
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
