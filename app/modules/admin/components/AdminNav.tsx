import { Link, useMatches, useOutletContext } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { RxBorderWidth } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { OutletContext } from "~/lib/types";
import { cn } from "~/lib/utils";

const AdminNav = () => {
  const { session } = useOutletContext<OutletContext>();
  const matches = useMatches();
  const path = matches[matches.length - 1].pathname.split("/");
  const currentPath = path[path.length - 1];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      icon: RiDashboardFill,
      slugs: ["dashboard"],
      link: "/admin/dashboard",
    },
    {
      label: "Menu",
      icon: BiSolidFoodMenu,
      slugs: ["menu", "add"],
      link: "/admin/menu",
    },
    {
      label: "Orders",
      icon: RxBorderWidth,
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
      <div className="min-w-64 md:relative hidden md:block"></div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen bg-black/50 backdrop-blur-sm fixed top-0 left-0 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>
      <div
        className={cn(
          "bg-white w-64 p-3 flex min-h-screen z-20 justify-start  flex-col pt-4 fixed h-full  top-0 left-0 md:translate-x-0 -translate-x-full transition-all ease-in-out duration-300",
          {
            "translate-x-0": isMenuOpen,
          }
        )}
      >
        <div className="space-y-3">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={session?.user?.user_metadata?.picture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="font-primary overflow-hidden whitespace-nowrap relative">
              <div className="absolute top-0 right-0 h-full bg-gradient-to-r from-transparent to-white w-10"></div>
              <h1 className="font-semibold truncate overflow-hidden">
                {session?.user?.user_metadata?.user_name}
              </h1>
              <p className="text-sm text-secondary-text  truncate overflow-hidden">
                {session?.user?.user_metadata?.email}
              </p>
            </div>
          </div>
          <Separator />
          <ul className=" space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link to={item.link}>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "px-3 py-1 rounded-md flex text-black2 items-center gap-2 justify-start w-full",
                      {
                        "bg-orange-500/10 text-primary":
                          item.slugs.includes(currentPath),
                      }
                    )}
                  >
                    <item.icon size={20} />
                    <p className="mt-1 text-sm font-medium">{item.label}</p>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
