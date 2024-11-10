import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";

const HardinLogo = ({
  link,
  className,
}: {
  link: string;
  className?: string;
}) => {
  return (
    <Link to={link}>
      <img
        src="/logo.webp"
        alt="Logo"
        width={800}
        height={800}
        className={cn("w-16", className)}
      />
    </Link>
  );
};

export default HardinLogo;
