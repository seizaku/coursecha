import { cn } from "@/lib/utils";
import { GridDotContainer } from "@/components/ui/grid-dot-container";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <GridDotContainer>
      <p className="relative z-20 bg-gradient-to-r from-green-400 to-green-300 bg-clip-text py-2 text-4xl font-bold text-transparent sm:text-5xl lg:text-7xl">
        C O U R S E C H A
      </p>
      <p className="w-4/6 text-center text-sm text-muted-foreground lg:text-lg">
        Cultivate your future: Learn to micro-farm with{" "}
        <span className="font-semibold text-green-300">KidsWhoFarm</span>
      </p>
      <Link
        href={"/get-started"}
        className={cn(buttonVariants({ size: "lg" }), "my-4 rounded-full")}
      >
        Generate a Learning Path
      </Link>
    </GridDotContainer>
  );
}
