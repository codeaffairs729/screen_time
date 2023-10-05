import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

export type MenuItemType =
  | {
      label: string;
      link: string;
      onClick?: () => void;
    }
  | {
      label: string;
      link?: string;
      onClick: () => void;
    };

const NavMenuDropdown = ({
  label,
  menuItems,
}: {
  label: string;
  menuItems: MenuItemType[];
}) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const isCurrentRoute = menuItems
    .map((m) => m.link)
    .filter((l) => l)
    .includes(currentRoute);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={clsx(
          "font-semibold text-sm text-gray-600 m-3 hover:text-dtech-secondary-dark whitespace-nowrap underline-offset-4 decoration-dtech-secondary-dark decoration-4",
          { underline: isCurrentRoute }
        )  }
      >
        {label}
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
          className="absolute z-30 left-0 w-56 origin-top-right bg-white bg-opacity-90 backdrop-blur-sm rounded shadow-lg overflow-hidden border"
        >
          {menuItems.map((m, i) => (
            <MenuItem key={i} {...m} />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const MenuItem = ({ label, link, onClick }: MenuItemType) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  if (onClick) {
    return (
      <Menu.Item>
        <button
          className={clsx(
            "hover:text-dtech-primary-dark block px-2.5 py-2 text-sm font-semibold text-gray-500 underline-offset-2 decoration-2 decoration-dtech-secondary-dark",
          { underline: currentRoute == link }

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
              "hover:text-dtech-primary-dark block px-2.5 py-2 text-sm font-semibold text-gray-500 underline-offset-2 decoration-2 decoration-dtech-secondary-dark",
          { underline: currentRoute == link }

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

export default NavMenuDropdown;
