import clsx from "clsx";
import DefaultLayout from "components/layouts/default";
import { ReactNode } from "react";

const DataPrivacyPolicy = () => {
  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto px-7">
        <H>Privacy</H>
        <P>
          This notice explains how we use any personal information we collect
          about you when you use this website. The site dtechtive.dtime.ai is
          hosted and managed by Dtime Limited.
        </P>
        <P>
          This privacy notice is kept under regular review and any updates will
          appear on this page. This notice was last updated on{" "}
          <Bold>November 9th, 2021</Bold>.
        </P>
        <H>What is collected and how is it used?</H>
        <P>
          When you browse the site, your <Bold>IP address</Bold> is collected
          and cookies are used to monitor your session. Additionally, if you
          register as a user you will be required to provide your{" "}
          <Bold>name</Bold>, <Bold>email address</Bold>,{" "}
          <Bold>organisation</Bold> and <Bold>role</Bold>. This information is
          used purely for the purposes of maintaining the portal, improving it
          based on how you use it, and notifying users of any changes or service
          interruptions.
        </P>
        <P>
          We will not share your information with other organisations for
          commercial purposes and we won’t pass on your details to other
          parties, unless required to do so by law.
        </P>
        <H>Access to your information</H>
        <P>
          You are entitled to view, amend, or delete the personal information
          that we hold about you. For more information on accessing the
          information we hold about you, please contact us.
        </P>
        <P>
          Be aware that most modern web browsers allow users to control cookies
          through the browser settings. To find out more about cookies,
          including how to see what cookies have been set and how to manage and
          delete them, visit{" "}
          <a
            href="www.aboutcookies.org"
            target="_blank"
            rel="noreferrer"
            className="text-dtech-secondary-light hover:underline"
          >
            www.aboutcookies.org
          </a>{" "}
          or{" "}
          <a
            href="https://cookies.insites.com/"
            target="_blank"
            rel="noreferrer"
            className="text-dtech-secondary-light hover:underline"
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
            className="text-dtech-secondary-light hover:underline"
          >
            dtechtive@dtime.ai
          </a>{" "}
          if you have any questions with regards to your privacy when using the
          Dtechtive portal or information we hold about you.
        </P>
      </div>
    </DefaultLayout>
  );
};

const H = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="font-semibold text-2xl text-gray-600 mb-1.5 mt-4">
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
    <p className={clsx("text-gray-600 text-sm mb-1.5", className)}>
      {children}
    </p>
  );
};

const Bold = ({ children }: { children: ReactNode }) => {
  return <b className="font-medium">{children}</b>;
};

export default DataPrivacyPolicy;
