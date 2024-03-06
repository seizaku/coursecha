"use client";
import { GridDotContainer } from "@/components/ui/grid-dot-container";
import { BrandName } from "@/components/brand-name";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/google-icon";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GetStartedPage() {
  const { user, signInUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/get-started");
    }
  }, [user]);

  return (
    <GridDotContainer>
      <div className="mx-auto flex h-fit w-full max-w-sm flex-col items-center justify-between gap-4 rounded-xl bg-secondary p-2 shadow-md">
        <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-background p-12">
          <BrandName className="text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl" />
          <Button
            onClick={() => signInUser()}
            className="w-full gap-2 rounded-xl border bg-background text-foreground hover:bg-secondary"
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
        </div>
      </div>
    </GridDotContainer>
  );
}
