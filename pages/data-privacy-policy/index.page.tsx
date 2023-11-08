import clsx from "clsx";
import DefaultLayout from "components/layouts/default";
import Image from "next/image";
import { ReactNode } from "react";
import PrivacyPolicyImage from "public/images/privacy-policy.svg";

const DataPrivacyPolicy = () => {
    return (
        <DefaultLayout className="!bg-[#EBEBEB]" wrapperClass="!max-w-none">
            <div className="py-5 px-4 w-full   flex items-center md:bg-white bg-[#EBEBEB]">
                <span className="text-left text-xl md:text-[26px] font-semibold md:text-black">
                    Privacy Policy
                </span>
            </div>
            <div className="mx-4 md:my-8 md:mx-20 border-t !bg-white flex flex-col justify-center items-center md:px-[20%] px-[5%]">
                <div className="mt-10">
                    <Image src={PrivacyPolicyImage} width={500} height={400} />
                </div>
                <div className=" my-10">
                    <div className=" text-[#727272] font-normal text-[19px]">
                        <span>Last updated:</span>
                        <span>15 October 2023</span>
                    </div>
                    <H>Privacy</H>
                    <P>
                        This notice explains how we use any personal information
                        we collect about you when you use this website. The site
                        www.dtechtive.com is hosted and managed by Dtime
                        Limited. This privacy notice is kept under regular
                        review and any updates will appear on this page.
                    </P>
                    <P>
                        This privacy notice is kept under regular review and any
                        updates will appear on this page. This notice was last
                        updated on <Bold>15 October 2023</Bold>.
                    </P>
                    <H>What is collected and how is it used?</H>
                    <P>
                        When you browse the site, your IP address is collected
                        and cookies are used to monitor your session.
                        Additionally, if you register as a user you will be
                        required to provide your name, email address,
                        organisation and role. This information is used purely
                        for the purposes of maintaining the portal, improving it
                        based on how you use it, and notifying users of any
                        changes or service interruptions.
                    </P>
                    <P>
                        We will not share your information with other
                        organisations for commercial purposes and we won’t pass
                        on your details to other parties, unless required to do
                        so by law
                    </P>
                    <H>Access to your information</H>
                    <P>
                        You are entitled to view, amend, or delete the personal
                        information that we hold about you. For more information
                        on accessing the information we hold about you, please
                        contact us.
                    </P>
                    <P>
                        Be aware that most modern web browsers allow users to
                        control cookies through the browser settings. You may
                        also manage your cookies preferences at{" "}
                        <a
                            href="www.dtechtive.com/cookies"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0065BD] hover:underline"
                        >
                            www.dtechtive.com/cookies
                        </a>
                        . To find out more about cookies, including how to see
                        what cookies have been set and how to manage and delete
                        them, visit{" "}
                        <a
                            href="www.aboutcookies.org"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0065BD] hover:underline"
                        >
                            www.aboutcookies.org
                        </a>{" "}
                        or{" "}
                        <a
                            href="https://cookies.insites.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0065BD] hover:underline"
                        >
                            cookies.insites.com
                        </a>
                        .
                    </P>
                    <H>Contact us</H>
                    <P>
                        Please contact us via email at{" "}
                        <a
                            href="mailto:dtechtive@dtime.ai"
                            className="text-[#0065BD] hover:underline"
                        >
                            dtechtive@dtime.ai
                        </a>{" "}
                        if you have any questions with regards to your privacy
                        when using the Dtechtive portal or information we hold
                        about you.
                    </P>
                </div>
            </div>
        </DefaultLayout>
    );
};

const H = ({ children }: { children: ReactNode }) => {
    return (
        <h2 className="font-semibold text-2xl text-dtech-new-main-light mb-1.5 mt-4">
            {children}
        </h2>
    );
};

const P = ({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <p
            className={clsx(
                "text-gray-600 text-sm mb-1.5 font-normal leading-5",
                className
            )}
        >
            {children}
        </p>
    );
};

const Bold = ({ children }: { children: ReactNode }) => {
    return <b className="font-medium">{children}</b>;
};

export default DataPrivacyPolicy;
