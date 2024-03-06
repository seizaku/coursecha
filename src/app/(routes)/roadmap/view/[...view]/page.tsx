"use client";
import { GridDotContainer } from "@/components/ui/grid-dot-container";
import { BottomNav } from "@/components/bottom-nav";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { GetRoadmap } from "@/server-actions/roadmap";
import { useEffect, useState } from "react";
import { Roadmap } from "../../page";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function ViewModulePage({ ...view }: any) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [roadmap, setRoadmap] = useState<Roadmap>();
  const [tutorials, setTutorials] = useState<any>(null);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [content, setContent] = useState<string>("");
  const { stage_key, task_key } = {
    stage_key: view.params.view[0],
    task_key: view.params.view[1],
  };

  const generateContent = async (roadmap: Roadmap) => {
    // Generate content
    const data = roadmap?.roadmap[stage_key].tasks[task_key];
    Promise.all([
      await fetch(
        `http://localhost:3001/content?data=${encodeURIComponent(JSON.stringify(data))}`,
        {
          mode: "cors",
        },
      )
        .then((response) => response.text())
        .then((res) => {
          setContent(res);
          setLoadingContent(false);
        }),
      await fetch(
        `http://localhost:3001/tutorials?data=${encodeURIComponent(JSON.stringify(data.keywords))}`,
        {
          mode: "cors",
        },
      )
        .then((response) => response.json())
        .then((tutorials) => {
          setTutorials(tutorials);
          setLoadingVideos(false);
        }),
    ]);
  };

  const getRoadmap = async () => {
    await GetRoadmap({
      uid: sessionStorage.getItem("uid")!,
      roadmap_id: sessionStorage.getItem("roadmap_id")!,
    }).then(({ data }: any) => {
      generateContent(data);
    });
  };

  useEffect(() => {
    getRoadmap();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      console.log("current");
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="flex justify-center">
      <section className="min-h-screen w-full max-w-sm md:max-w-lg">
        <div className="flex w-full justify-start">
          <Link
            href={"/roadmap"}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "group right-[11px] top-[11px] mt-4 gap-2 rounded-full transition-all duration-300 ease-in-out hover:w-36 hover:bg-secondary group-hover:rotate-90",
            )}
          >
            <ChevronLeft className="h-4 w-4 transition-all duration-300 ease-in-out" />
            <span className="hidden group-hover:flex">Go Back</span>
          </Link>
        </div>
        {!loadingVideos && (
          <>
            <Carousel setApi={setApi} className="mx-auto mt-6 w-full">
              <CarouselContent>
                {tutorials?.items.map((data: any, index: number) => (
                  <CarouselItem key={index}>
                    <div>
                      <iframe
                        className="my-4 h-64 w-full rounded-2xl bg-muted"
                        src={`https://www.youtube.com/embed/${data.link.slice(32)}`}
                      ></iframe>
                      <h1
                        className="my-2 text-sm font-medium"
                        dangerouslySetInnerHTML={{
                          __html: data.htmlTitle,
                        }}
                      ></h1>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
              Slide {current} of {count}
            </div>
          </>
        )}
        {!loadingContent && (
          <article
            className="prose prose-sm my-4"
            dangerouslySetInnerHTML={{
              __html: `${content}`,
            }}
          ></article>
        )}

        {loadingVideos && <Skeleton className="my-12 h-52 w-full"></Skeleton>}
        {loadingContent && (
          <>
            <Skeleton className="mt-6 h-12 w-full"></Skeleton>
            <Skeleton className="mt-2 h-6 w-4/5"></Skeleton>
            <Skeleton className="mt-6 h-6 w-1/4"></Skeleton>
            <Skeleton className="mt-3 h-24 w-full"></Skeleton>
            <Skeleton className="mt-2 h-6 w-4/5"></Skeleton>
            <Skeleton className="mt-6 h-6 w-1/4"></Skeleton>
            <Skeleton className="mt-2 h-6 w-4/5"></Skeleton>
            <Skeleton className="mt-3 h-24 w-full"></Skeleton>
          </>
        )}
      </section>
    </section>
  );
}
