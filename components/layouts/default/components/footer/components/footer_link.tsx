import Link from "next/link";

const FooterLink = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
}) => {
  const content = (
    <span className=" text-gray-600 hover:underline text-sm">{label}</span>
  );
  if (onClick) {
    return (
      <button className="text-left" onClick={onClick}>
        {content}
      </button>
    );
  }
  if (href) {
    return (
      <Link href={href}>
        <a target="_blank">{content}</a>
      </Link>
    );
  }
  throw new Error("Footer Link requires either href or onclick");
};

export default FooterLink;
