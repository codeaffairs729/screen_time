import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import ProfileDropdown from "./profile_dropdown";

const Nav = ({
  content,
  showLogo = true,
}: {
  content?: ReactNode;
  showLogo?: boolean;
}) => {
  return (
    <nav className="flex p-2">
      {showLogo && (
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
      )}
      <div>{content}</div>
      <div className="ml-auto flex items-center">
        <NavItem label="Home" link="/" />
        <NavItem label="API" link="/" />
        <NavItem label="Sign Up" link="/" />
        <NavItem label="Login" link="/" />
        <ProfileDropdown />
      </div>
    </nav>
  );
};

const NavItem = ({ label, link }: { label: string; link: string }) => {
  return (
    <Link href={link}>
      <a className="font-semibold text-sm text-gray-600 m-3">{label}</a>
    </Link>
  );
};

export default Nav;
