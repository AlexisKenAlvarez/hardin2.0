import { Link, useMatches } from "@remix-run/react";
import {
  ArrowLeftToLine,
  BookOpenCheck,
  ClipboardList,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

const AdminNav = () => {
  const matches = useMatches();
  const path = matches[matches.length - 1].pathname.split("/");
  const currentPath = path[path.length - 1];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      slugs: ["dashboard"],
      link: "/admin/dashboard",
    },
    {
      label: "Menu",
      icon: ClipboardList,
      slugs: ["menu", "add"],
      link: "/admin/menu",
    },
    {
      label: "Orders",
      icon: BookOpenCheck,
      slugs: ["orders"],
      link: "/admin/orders",
    },
  ];

  return (
    <>
      <button
        className="rounded-tr-full rounded-br-full p-2 bg-primary fixed top-3 z-10"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu stroke="white" size={30} />
      </button>
      <div className="w-20 md:relative hidden md:block"></div>
      <div
        className={cn(
          "bg-primary w-20 p-2 flex min-h-screen z-20 justify-start items-center flex-col pt-4 fixed h-full  top-0 left-0 md:translate-x-0 -translate-x-full transition-all ease-in-out duration-300",
          {
            "translate-x-0": isMenuOpen,
          }
        )}
      >
        <button
          className="block md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <ArrowLeftToLine
            stroke="white"
            size={28}
            className={cn(
              "-rotate-180 transition-all ease-in-out duration-300",
              {
                "rotate-0": isMenuOpen,
              }
            )}
          />
        </button>

        <button className="md:block hidden">
          <Menu stroke="white" size={30} />
        </button>

        <ul className="mt-14 space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={item.link}>
                      <button
                        className={cn("p-3 rounded-md", {
                          "bg-active": item.slugs.includes(currentPath),
                        })}
                      >
                        <item.icon stroke="white" size={30} />
                      </button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="pointer-events-none">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminNav;
