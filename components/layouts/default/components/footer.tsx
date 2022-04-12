import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

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

const FooterLink = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
}) => {
  const content = (
    <span className="text-dtech-primary-dark underline text-sm">{label}</span>
  );
  if (onClick) {
    return (
      <button className="text-left" onClick={onClick}>
        {content}
      </button>
    );
  }
  if (href) {
    return (
      <Link href={href}>
        <a>{content}</a>
      </Link>
    );
  }
  throw new Error("Footer Link requires either href or onclick");
};

export default Footer;
