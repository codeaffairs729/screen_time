import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ProfileDropdown from "./profile_dropdown";

const Nav = ({
  content,
  showLogo = true,
}: {
  content?: ReactNode;
  showLogo?: boolean;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="flex p-2 h-[var(--nav-height)] items-center">
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
      {content}
      <div className="ml-auto flex items-center">
        <NavItem label="Home" link="/" />
        <NavItem
          label="API"
          link="https://api.dtective.dtime.ai/docs"
          openInNewTab={true}
        />
        {!user && <NavItem label="Sign Up" link="/signup" />}
        {!user && <NavItem label="Login" link="/signin" />}
        <ProfileDropdown />
      </div>
    </nav>
  );
};

const NavItem = ({
  label,
  link,
  openInNewTab = false,
}: {
  label: string;
  link: string;
  openInNewTab?: boolean;
}) => {
  return (
    <Link href={link}>
      <a
        target={openInNewTab ? "_blank" : "_self"}
        className="font-semibold text-sm text-gray-600 m-3 hover:text-dtech-secondary-dark whitespace-nowrap"
      >
        {label}
      </a>
    </Link>
  );
};

export default Nav;
