import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaTwitter, FaDiscord } from "react-icons/fa";
import FooterLink from "./components/footer_link";
import FooterSocialMediaItem from "./components/footer_social_media_item";

const Footer = ({ className = "" }: { className?: string }) => {
    return (
        <footer className={clsx("px-8 pt-11 pb-2",className)}>
            <div className="md:flex text-left justify-between items-center">
                <div className="flex justify-start items-center">
                    <div className="flex flex-col justify-center items-center mr-6">
                        <span className="text-lg text-dtech-main-grey mb-1">
                            Follow us on
                        </span>
                        <div className="space-x-2 ">
                            <FooterSocialMediaItem
                                icon={<FaLinkedinIn size="auto" />}
                                link="https://www.linkedin.com/showcase/dtechtive/"
                            />
                            <FooterSocialMediaItem
                                icon={<FaTwitter size="auto" />}
                                link="https://twitter.com/dtechtive"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-lg text-dtech-main-grey mb-1">
                            Join community
                        </span>
                        <div className="">
                            <FooterSocialMediaItem
                                icon={<FaDiscord size="auto" />}
                                link=" https://discord.gg/fg6qPfJhHb"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-start md:justify-end items-start space-x-4 my-2 md:my-0">
                    <div className="flex flex-col">
                        <FooterLink
                            label="Report a bug"
                            href="https://f7xcuekc9xt.typeform.com/to/ff4rGkXc"
                        />
                        <FooterLink label="FAQs" href="/faq" />
                    </div>
                    <div className="flex flex-col ">
                        <FooterLink
                            label="Suggest feature"
                            href="https://f7xcuekc9xt.typeform.com/to/Zpryygkm"
                        />
                        <FooterLink
                            label="Newsletter"
                            href="https://f7xcuekc9xt.typeform.com/to/BTegGr9w?typeform-source=www.google.com"
                        />
                    </div>
                    <div className="flex flex-col">
                        <FooterLink label="Contact Us" href="/contact-us" />
                        <FooterLink
                            label="Privacy Policy"
                            href="/data-privacy-policy"
                        />
                    </div>
                </div>
            </div>
            <div className="md:text-center text-[13px] text-dtech-main-grey mb-20">
                &#169; Dtime Limited, {new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;
