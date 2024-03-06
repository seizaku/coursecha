type Props = {
  children?: React.ReactNode;
  fade?: boolean;
};

export const GridDotContainer = ({ children, fade = true }: Props) => {
  return (
    <main className="flex h-fit flex-col">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background">
        {fade && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        )}
        {children}
      </div>
    </main>
  );
};
