"use client";
import Link from "next/link";
import { PiPlantDuotone, PiHouseDuotone, PiChatDuotone } from "react-icons/pi";
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
      <div className="grid h-16 w-full grid-cols-3 place-items-center rounded-full bg-white shadow-md">
        {navlinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`flex flex-col items-center rounded-xl p-2 text-xs transition-all duration-150 ease-in-out ${link.href == path ? "bg-green-50 text-primary" : "text-muted-foreground hover:bg-green-50 hover:text-primary"}`}
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};
