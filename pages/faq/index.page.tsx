import { Disclosure } from "@headlessui/react";
import { BiChevronUp } from "react-icons/bi";
import DefaultLayout from "components/layouts/default";

const FAQPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-4 md:mx-20 my-2">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-dtech-secondary-light rounded hover:bg-dtech-secondary-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>What is your refund policy?</span>
                <BiChevronUp
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you&rsquo;re unhappy with your purchase for any reason, email
                us within 90 days and we&rsquo;ll refund you in full, no
                questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-dtech-secondary-light rounded hover:bg-dtech-secondary-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Do you offer technical support?</span>
                <BiChevronUp
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </DefaultLayout>
  );
};

export default FAQPage;
