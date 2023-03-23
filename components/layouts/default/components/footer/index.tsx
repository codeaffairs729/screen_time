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
        <footer className={clsx("px-8 pt-11 pb-2", className)}>
            <div className="shadow w-[70%] ml-12 border-2 my-5 bg-dtech-main-dark px-5 md:w-[87%]">
            </div>
            <div className="md:ml-5 flex text-left justify-between items-center max-w-site mx-auto  ">
                <div className="flex flex-wrap justify-start items-center space-x-12 ">
                    <div className="flex ml-12 justify-center items-center mr-6 text-fuchsia-900 space-x-1">
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
                    <div className="flex  justify-center items-center space-x-2  ">
                        <span className="text-lg  mb-1 text-fuchsia-900 hover:underline text-[17px] ">
                            Join our community
                        </span>
                        <FooterSocialMediaItem
                            icon={<FaDiscord size="auto" />}
                            link=" https://discord.gg/fg6qPfJhHb"
                        />
                    </div>
                    <FooterLink
                        label="Privacy Policy"
                        href="/data-privacy-policy"
                    />
                    <FooterLink label="FAQs" href="/faq" />
                    <FooterLink
                        label="Report a bug"
                        href="https://f7xcuekc9xt.typeform.com/to/ff4rGkXc"
                    />
                    <FooterLink
                        label="Suggest feature"
                        href="https://f7xcuekc9xt.typeform.com/to/Zpryygkm"
                    />
                    <FooterLink
                        label="Newsletter"
                        href="https://f7xcuekc9xt.typeform.com/to/BTegGr9w?typeform-source=www.google.com"
                    />
                    <FooterLink label="Contact Us" href="/contact-us" />
                </div>
                <div className="flex flex-row justify-start md:justify-end items-start space-x-4 my-2 md:my-0 ">
                    <div className="flex flex-col text-fuchsia-900"></div>
                    <div className="flex flex-col "></div>
                    <div className="flex flex-col text-fuchsia-900"></div>
                </div>
            </div>
            <div className="md:text-center text-[13px] text-fuchsia-900 mb-5 mt-16">
                &#169; Dtime Limited, {new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;
