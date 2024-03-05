import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const BrandName = ({ className }: Props) => {
  return (
    <p
      className={cn(
        "relative z-20 bg-gradient-to-r from-green-400 to-green-300 bg-clip-text py-2 text-4xl font-bold text-transparent sm:text-5xl lg:text-7xl",
        className,
      )}
    >
      C O U R S E C H A
    </p>
  );
};
