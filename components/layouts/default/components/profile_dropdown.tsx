import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import AuthService from "services/auth.service";
import { RootState } from "store";

const ProfileDropdown = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Menu as="div" className="relative inline-block text-left ml-2">
      <Menu.Button aria-label="profile dropdown button" className="w-10">
        <Image
          src="/images/icons/profile/guest_Icon.svg"
          width="40"
          height="40"
          alt="profile dropdown"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-30 right-0 w-56 origin-top-right bg-white shadow-lg overflow-hidden border border-dtech-secondary-light">
          {user && (
            <>
              <MenuItem label="My Profile" link="/profile" />
              <MenuItem label="Log out" onClick={() => AuthService.logout()} />
            </>
          )}
          {!user && (
            <>
              <span className="text-sm font-medium mx-2 mt-2 -mb-2 block">Hi,</span>
              <span className="text-xs text-gray-600 mx-2">
                Log in or Create a new account
              </span>
              <br />
              <MenuItem label="Sign In" link="/signin" />
              <MenuItem label="Sign Up" link="/signup" />
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const MenuItem = ({
  label,
  link,
  onClick,
}:
  | {
      label: string;
      link: string;
      onClick?: () => void;
    }
  | {
      label: string;
      link?: string;
      onClick: () => void;
    }) => {
  if (onClick) {
    return (
      <Menu.Item>
        <button
          className={clsx(
            "hover:text-dtech-primary-dark block px-2.5 py-2 text-sm font-semibold text-gray-500"
          )}
          onClick={onClick}
        >
          {label}
        </button>
      </Menu.Item>
    );
  }
  if (link) {
    return (
      <Menu.Item>
        <Link href={link}>
          <a
            className={clsx(
              "hover:text-dtech-primary-dark block px-2.5 py-2 text-sm font-semibold text-gray-500"
            )}
          >
            {label}
          </a>
        </Link>
      </Menu.Item>
    );
  }
  return null;
};

export default ProfileDropdown;
