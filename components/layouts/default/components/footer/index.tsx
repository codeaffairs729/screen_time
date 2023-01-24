import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaTwitter, FaDiscord } from "react-icons/fa";
import FooterLink from "./components/footer_link";
import FooterSocialMediaItem from "./components/footer_social_media_item";

const Footer = ({ className = "" }: { className?: string }) => {
    return (
        <footer className={className}>
            <div className="flex justify-between items-center mx-8 mt-5">
                <div className="flex justify-start items-center">
                    <div className="flex flex-col justify-center items-center mr-6">
                        <span className="text-sm text-gray-600 my-1">
                            Follow us on
                        </span>
                        <div className="space-x-2 ">
                            <FooterSocialMediaItem
                                icon={<FaLinkedinIn />}
                                link="https://www.linkedin.com/company/dtime-ai/"
                            />
                            <FooterSocialMediaItem
                                icon={<FaTwitter />}
                                link="https://twitter.com/dtime_ai"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-sm text-gray-600 my-1">
                            Join community
                        </span>
                        <div className="">
                            <FooterSocialMediaItem
                                icon={<FaDiscord />}
                                link=" https://discord.gg/fg6qPfJhHb"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-start ">
                    <div className="flex flex-col mx-4">
                        <FooterLink
                            label="Report bug"
                            href="https://f7xcuekc9xt.typeform.com/to/ff4rGkXc"
                        />
                        <FooterLink label="FAQs" href="/faq" />
                    </div>
                    <div className="flex flex-col mx-4 ">
                        <FooterLink
                            label="Suggest feature"
                            href="https://f7xcuekc9xt.typeform.com/to/Zpryygkm"
                        />
                        <FooterLink
                            label="Newsletter"
                            href="https://f7xcuekc9xt.typeform.com/to/BTegGr9w?typeform-source=www.google.com"
                        />
                    </div>
                    <div className="flex flex-col mx-4">
                        <FooterLink label="Contact Us" href="/contact-us" />
                        <FooterLink
                            label="Privacy Policy"
                            href="/data-privacy-policy"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-start text-xs text-gray-700 mb-1 mt-[-17px]">
                &#169; Dtime Limited, {new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;
