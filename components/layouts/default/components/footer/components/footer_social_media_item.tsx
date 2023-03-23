import { ReactNode } from "react";

const FooterSocialMediaItem = ({
    icon,
    link,
}: {
    icon: ReactNode;
    link: string;
}) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="p-1 bg-fuchsia-900 w-5 h-5 hover:bg-dtech-secondary-dark inline-block text-white rounded"
        >
            {icon}
        </a>
    );
};

export default FooterSocialMediaItem;
