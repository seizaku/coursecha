import { cn } from "@/lib/utils";
import { GridDotContainer } from "@/components/ui/grid-dot-container";
import { BottomNav } from "@/components/bottom-nav";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function HomePage() {
  const getPosts = () => {};

  return (
    <GridDotContainer fade={false}>
      <section className="flex h-screen w-full items-center justify-center">
        <Link
          href={"/get-started"}
          className={cn(buttonVariants({ size: "lg" }), "my-4 rounded-xl")}
        >
          Create a new roadmap
        </Link>
      </section>
      <BottomNav />
    </GridDotContainer>
  );
}
