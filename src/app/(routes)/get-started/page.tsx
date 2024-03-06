import { PlantLogo } from "./plant-logo";
import { QuizForm } from "./quiz-form";

export default function GetStartedPage() {
  return (
    <section className="flex h-screen w-full items-center bg-background">
      <div className="mx-auto flex h-fit w-full max-w-md flex-col items-center justify-between gap-4 rounded-xl border bg-background p-12">
        <div className="flex items-center gap-4">
          <PlantLogo className="h-24" />
          <div className="flex w-full flex-col items-start justify-start">
            <h1 className="font-bold">Roadmap Quiz</h1>
            <p className="text-xs md:text-sm">
              Share your thoughts with us! Let us know how we can enhance your
              experience.
            </p>
          </div>
        </div>
        <QuizForm />
      </div>
    </section>
  );
}
