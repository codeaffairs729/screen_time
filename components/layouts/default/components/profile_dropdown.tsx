import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const ProfileDropdown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button aria-label="profile dropdown button text-red-500">
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
          <MenuItem label="Jane Doe" link="/profile" />
          <MenuItem label="My Profile" link="/profile" />
          <MenuItem label="My Favourites" link="/profile" />
          <MenuItem label="Log out" link="/profile" />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const MenuItem = ({
  // active,
  label,
  link,
}: {
  // active: boolean;
  label: string;
  link: string;
}) => {
  return (
    <Menu.Item>
      <Link href={link}>
        <a
          className={clsx(
            "hover:text-dtech-primary-dark block px-2.5 py-2 text-sm font-semibold text-gray-500"
          )}
        >
          {label}
          {/* {JSON.stringify(active)} */}
        </a>
      </Link>
    </Menu.Item>
  );
};

export default ProfileDropdown;
