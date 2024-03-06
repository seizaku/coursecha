"use client";
import Link from "next/link";
import {
  PiPlantDuotone,
  PiHouseDuotone,
  PiChatDuotone,
  PiNewspaperClippingDuotone,
} from "react-icons/pi";
import { usePathname } from "next/navigation";

type navlinksType = {
  href: string;
  icon: React.ReactNode;
};

const navlinks: navlinksType[] = [
  {
    href: "/home",
    icon: <PiHouseDuotone className="h-5 w-5" />,
  },
  // {
  //   href: "/blog",
  //   icon: <PiNewspaperClippingDuotone className="h-5 w-5" />,
  // },
  {
    href: "/roadmap",
    icon: <PiPlantDuotone className="h-5 w-5" />,
  },
  {
    href: "/chat",
    icon: <PiChatDuotone className="h-5 w-5" />,
  },
];

export const BottomNav = () => {
  const path = usePathname();
  return (
    <div className="fixed bottom-0 z-20 w-full max-w-sm p-4 md:bottom-12">
      <div className="grid h-16 w-full grid-cols-3 place-items-center rounded-full border bg-background">
        {navlinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`flex flex-col items-center rounded-xl p-2 text-xs transition-all duration-150 ease-in-out ${link.href == path ? "bg-muted text-green-400" : "text-muted-foreground hover:bg-muted hover:text-green-400"}`}
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};
