import useAuth from "@/hooks/use-auth";
import { Button } from "./ui/button";
import { PiSignOutDuotone } from "react-icons/pi";

export const HeaderNav = () => {
  const { signOutUser } = useAuth();
  return (
    <div className="fixed top-0 flex h-16 w-full max-w-lg items-center bg-background px-4 ">
      <div className="flex h-full w-full items-center justify-between bg-background">
        <Button
          onClick={() => signOutUser()}
          size="icon"
          variant="ghost"
          className="rounded-full"
        >
          <PiSignOutDuotone className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
