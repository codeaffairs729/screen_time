import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import FooterLink from "./components/footer_link";
import FooterSocialMediaItem from "./components/footer_social_media_item";

const Footer = ({ className = "" }: { className?: string }) => {
  return (
    <footer className={className}>
      <hr className="mx-8 my-4" />
      <div className="flex justify-between sm:mx-4">
        <div>
          <Link href="/">
            <a className="block max-w-[200px] p-2.5">
              <Image
                src="/images/logo_notagline.png"
                width="1000"
                height="250"
                alt="Dtechtive logo"
              />
            </a>
          </Link>
          <h5 className="text-sm font-light mb-0.5 text-gray-800">Follow us on</h5>
          <div className="flex space-x-2">
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
        <div className="flex flex-col m-4 space-y-1.5">
          <FooterLink label="FAQs" href="/faq" />
          <FooterLink
            label="Contact Us"
            onClick={() => {
              const email = "dtechtive@dtime.ai";
              const subject = "";
              const body = "";
              window.open(
                `mailto:${email}?subject=${subject}&body=${body}`,
                "_blank"
              );
            }}
          />
          <FooterLink label="Privacy Policy" href="/data-privacy-policy" />
          <FooterLink
            label="Report a Problem"
            onClick={() => {
              const email = "dtechtive@dtime.ai";
              const subject = "";
              const body =
                "Reporting a problem with the dtecthtive data search portal";
              window.open(
                `mailto:${email}?subject=${subject}&body=${body}`,
                "_blank"
              );
            }}
          />
        </div>
      </div>
      <div className="text-center text-xs text-gray-700 mb-1">
        Copyright &#169; {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
