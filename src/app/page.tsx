import { cn } from "@/lib/utils";
import { GridDotContainer } from "@/components/ui/grid-dot-container";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { BrandName } from "@/components/brand-name";

export default function Home() {
  return (
    <GridDotContainer>
      <BrandName />
      <p className="w-4/6 text-center text-sm text-muted-foreground lg:text-lg">
        Inspiring future farmers: Learn to micro-farm with{" "}
        <span className="font-semibold text-green-300">KidsWhoFarm</span>
      </p>
      <Link
        href={"/auth"}
        className={cn(buttonVariants({ size: "lg" }), "my-4 rounded-xl")}
      >
        Generate a Learning Path
      </Link>
    </GridDotContainer>
  );
}
