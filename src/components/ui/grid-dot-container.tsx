type Props = {
  children?: React.ReactNode;
  fade?: boolean;
};

export const GridDotContainer = ({ children, fade = true }: Props) => {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-white bg-grid-small-black/[0.2] dark:bg-black dark:bg-grid-small-white/[0.2]">
        {fade && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        )}
        {children}
      </div>
    </main>
  );
};
