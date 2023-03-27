import DefaultLayout from "components/layouts/default";
import Image from "next/image";
import firstImage from "public/images/about-us/about_first.webp";
import secondImage from "public/images/about-us/tela.webp";
import thirdImage from "public/images/about-us/base.webp";
import fourthImage from "public/images/about-us/ScottishGovernment_Logo.png";
import fifthImage from "public/images/about-us/NatureScot_Logo.png";
import sixthImage from "public/images/about-us/image 36.png";
import seventhImage from "public/images/about-us/image 37.png";
import eightImage from "public/images/about-us/image 38.png";
import ninthImage from "public/images/about-us/image 39.png";
import tenthImage from "public/images/about-us/image 40.png";
import eleventhImage from "public/images/about-us/Sussex_University_Logo.png";
import YoutubePlayer from "components/about/youtube";
import HelpCard from "components/about/helpCard";
import imageOneOfCard from "public/images/about-us/first_image.png";
import imageTwoOfCard from "public/images/about-us/second_image.png";
import { useState } from "react";

const dummyData = {
    name: "XYZ",
    title: "developer",
    desc: "Amazing",
    img: fifthImage,
};
const cardData = [
    {
        imageOne: imageOneOfCard,
        imageTwo: imageTwoOfCard,
        cardData: {
            title: "this is title",
            shortDesc: "This is a very short description",
            desc: [
                "This is first",
                "This is first",
                "This is first",
                "This is first",
                "This is first",
                "This is first",
                "This is first",
            ],
        },
        cardUrl: "dtechtive.com",
        cardUrlLabel: "Try Dtechtive",
    },
];
const dummyArray = Array(5).fill(dummyData);
const AboutUsPage = () => {
    const [image, setImage] = useState(true);
    return (
        <DefaultLayout>
            <div className="flex flex-col">
                <div className="text-3xl	 ml-4 font-bold mt-6 text-dtech-main-dark w-8/9 sm:text-5xl sm:w-2/3 sm:ml-28">
                    Dtechtive discovers the datasets other search engines cannot
                    reach,
                </div>
                <div className="text-2xl  ml-4 font-sans mt-6 text-dtech-main-dark w-8/9 sm:w-2/3 sm:ml-28">
                    by connecting Data Users and Data Providers in a unique
                    ecosystem
                </div>
                <div className="flex mt-20 flex-col sm:ml-24  sm:flex-row">
                    <div>
                        <Image src={firstImage} height={500} width={837} />
                    </div>
                    <div className="flex flex-col items-center sm:-mt-10">
                        <div className=" w-[100%] max-w-[640px] relative">
                            <div className="w-[90%] ml-[4.5%]">
                                <Image
                                    src={secondImage}
                                    height={543}
                                    width={756}
                                />
                            </div>
                            <div className="h-[100%]  absolute top-0 left-0 w-full  flex justify-left items-center">
                                <YoutubePlayer
                                    videoId="aM3-4QvjVBk"
                                    className=" h-[87%] w-[86%] m-[6.5%] max-h-100%"
                                    iframeclassName="h-[100%] w-[100%]"
                                />
                            </div>
                        </div>

                        <div className=" -mt-5">
                            <Image src={thirdImage} height={17} width={900} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-dtech-main-dark text-2xl  ml-4 font-sans font-bold">
                        Our Customers
                    </div>
                    <div className="shadow !w-[100%] border-2 my-5 px-5"></div>
                    <div className="flex flex-col items-center">
                        <div className=" shadow-lg !w-[100%] border-2 my-5 rounded-lg flex flex-col md:flex-row">
                            <div className=" mx-[10%] my-[4%]">
                                <Image
                                    src={fourthImage}
                                    height={80}
                                    width={500}
                                />
                            </div>
                            <div className=" mx-[10%] my-[4%]">
                                <Image
                                    src={fifthImage}
                                    height={150}
                                    width={225}
                                />
                            </div>
                        </div>
                        <div className="text-dtech-main-dark m-8 text-2xl text-center w-[60%]">
                            Take a moment to read through our customer
                            testimonials and discover what makes Dtechtive stand
                            out from the rest.
                        </div>
                        <div className="flex flex-col md:flex-row">
                            {dummyArray.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className=" shadow-md w-[280px] h-[420px] mx-1 my-2 text-center bg-[#DBCFE2] border-2 rounded-sm flex flex-col"
                                    >
                                        <div className="  my-6">
                                            <Image
                                                src={item.img}
                                                height={120}
                                                width={120}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className="text-dtech-main-dark text-2xl mt-4">
                                            {item.name}
                                        </div>
                                        <div className="text-dtech-main-dark text-1xl">
                                            {item.title}
                                        </div>
                                        <div className="text-dtech-main-dark text-1xl mt-20">
                                            {item.desc}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-dtech-main-dark text-2xl  ml-4 font-sans font-bold">
                        Helping data users, providers and enablers
                    </div>
                    <div className="shadow !w-[100%] border-2 my-5 px-5"></div>
                    <div className="flex flex-col items-center">
                        {cardData.map((item, index) => (
                            <HelpCard
                                key={index}
                                cardNumber={index}
                                image={image}
                                setImage={setImage}
                                imageOne={item.imageOne}
                                imageTwo={item.imageTwo}
                                title={item.cardData.title}
                                shortDesc={item.cardData.shortDesc}
                                desc={item.cardData.desc}
                                cardUrl={item.cardUrl}
                                cardUrlLabel={item.cardUrlLabel}
                            />
                        ))}
                    </div>
                </div>
                <div className=" flex flex-col   ml-44 w-4/5 h-40   border-solid border-2 border-indigo-600 ... box-content  ">
                    <div>
                        <div className=" flex flex-row  ml-32 space-x-72 ">
                            <div className="">
                                <Image
                                    src={sixthImage}
                                    height={50}
                                    width={90}
                                />
                            </div>
                            <div className="">
                                <Image
                                    src={seventhImage}
                                    height={75}
                                    width={75}
                                />
                            </div>
                            <div className=" ">
                                <Image
                                    src={eightImage}
                                    height={45}
                                    width={100}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className=" flex flex-row  ml-32  space-x-72 ">
                            <div className=" ">
                                <Image
                                    src={ninthImage}
                                    height={45}
                                    width={100}
                                />
                            </div>
                            <div className="">
                                <Image
                                    src={tenthImage}
                                    height={40}
                                    width={100}
                                />
                            </div>
                            <div className=" ">
                                <Image
                                    src={eleventhImage}
                                    height={70}
                                    width={70}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
export default AboutUsPage;
