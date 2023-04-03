import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {
    FaLinkedinIn,
    FaTwitter,
    FaDiscord,
    FaFacebookF,
    FaYoutubeSquare,
} from "react-icons/fa";
import FooterLink from "./components/footer_link";
import FooterSocialMediaItem from "./components/footer_social_media_item";

const Footer = ({ className = "" }: { className?: string }) => {
    return (
        <footer className={clsx("px-8 pt-11 pb-2")}>
            <div className="flex flex-nowrap md:flex-wrap shadow w-[90%] mx-[6%] border-2 my-5 bg-dtech-main-dark px-5 md:w-[87%]"></div>
            <div className="flex flex-col sm:flex-row text-left justify-between items-center w-[88%] mx-auto  ">
                {/* <div className="justify-center items-center space-x-12  mx-[1%] justify-center items-center  text-fuchsia-900 space-x-1"> */}

                {/* <div className=""> */}
                <div className="text-center sm:text-left flex flex-col">
                    <FooterLink
                        label="Suggest feature"
                        href="https://f7xcuekc9xt.typeform.com/to/Zpryygkm"
                    />
                    <FooterLink
                        label="Report a bug"
                        href="https://f7xcuekc9xt.typeform.com/to/ff4rGkXc"
                    />
                </div>
                <div className=" text-center sm:text-left flex flex-col">
                    <FooterLink label="FAQs" href="/faq" />
                    <FooterLink
                        label="Newsletter"
                        href="https://f7xcuekc9xt.typeform.com/to/BTegGr9w?typeform-source=www.google.com"
                    />
                </div>
                <div className=" text-center sm:text-left flex flex-col">
                    <FooterLink label="Contact Us" href="/contact-us" />
                    <FooterLink
                        label="Privacy Policy"
                        href="/data-privacy-policy"
                    />
                </div>
                <div>
                    <div className=" text-center sm:text-left flex flex-col">
                        <span className="text-lg  mb-1 text-fuchsia-900  hover:underline text-[17px] ">
                            Follow us on
                        </span>
                        <div className="space-x-1 sm:space-x-3 ">
                            <FooterSocialMediaItem
                                icon={<FaFacebookF size="auto" />}
                                link="https://www.facebook.com/dtechtive.search"
                            />
                            <FooterSocialMediaItem
                                icon={<FaTwitter size="auto" />}
                                link="https://twitter.com/dtechtive"
                            />
                            <FooterSocialMediaItem
                                icon={<FaLinkedinIn size="auto" />}
                                link="https://www.linkedin.com/showcase/dtechtive/"
                            />

                            <FooterSocialMediaItem
                                icon={<FaYoutubeSquare size="auto" />}
                                link="https://www.youtube.com/@dtechtive.search"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center sm:text-left flex flex-col">
                    <span className="text-lg  mb-1 text-fuchsia-900 hover:underline text-[17px] ">
                        Join our community
                    </span>
                    <div className="space-x-2  ">
                        <FooterSocialMediaItem
                            icon={<FaDiscord size="auto" />}
                            link=" https://discord.gg/fg6qPfJhHb"
                        />
                    </div>
                </div>
            </div>
            <div className="md:text-center text-[13px] text-fuchsia-900 mb-5 mt-16">
                &#169; Dtime Limited, {new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;
