import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";

const SignupDropdown = () => {
    return (
        <Menu as="div" className="relative inline-block text-left ml-2">
            <Menu.Button
                aria-label="profile dropdown button"
                data-selector="profile-dropdown-button"
                className="font-semibold text-sm text-gray-600 m-3 hover:text-dtech-secondary-dark whitespace-nowrap underline-offset-4 decoration-dtech-secondary-dark decoration-4"
            >
                Sign Up
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
                <Menu.Items
                    aria-label="profile dropdown menu"
                    className="absolute z-30 right-0 w-56 origin-top-right bg-white shadow-lg overflow-hidden border border-dtech-secondary-light"
                >
                    <MenuItem
                        label="Individual"
                        link="signup?signup_type=individual"
                    />
                    <MenuItem
                        label="Organisation Admin"
                        link="signup?signup_type=org_admin"
                    />
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

const MenuItem = ({ label, link }: { label: string; link: string }) => {
    return (
            <Link href={link}>
                <a
                    className={clsx(
                        "hover:text-dtech-primary-dark block px-2.5 py-2 text-sm font-semibold text-gray-500"
                    )}
                >
                    {label}
                </a>
            </Link>
    );
};

export default SignupDropdown;
