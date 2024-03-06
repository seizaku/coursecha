"use client";
import { GridDotContainer } from "@/components/ui/grid-dot-container";
import { BottomNav } from "@/components/bottom-nav";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrandName } from "@/components/brand-name";
import { GetRoadmap } from "@/server-actions/roadmap";
import { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { HeaderNav } from "@/components/header-nav";

export type Task = {
  title: string;
  description: string;
  keywords: string[];
  isCompleted: boolean;
};

export type RoadmapStage = {
  stage: string;
  description: string;
  tasks: Task[];
};

export type Roadmap = {
  uid: string;
  roadmap_title: string;
  description: string;
  roadmap: RoadmapStage[];
};

export default function RoadmapPage() {
  const [data, setRoadmap] = useState<DocumentData>();
  const router = useRouter();

  useEffect(() => {
    GetRoadmap({
      uid: sessionStorage.getItem("uid")!,
      // roadmap_id: sessionStorage.getItem("roadmap_id")!,
    }).then(({ data }: any) => {
      setRoadmap(data);
    });
  }, []);

  return (
    <GridDotContainer fade={false}>
      <HeaderNav />
      <section className="mt-12 flex w-full items-start p-4 pb-24">
        <ScrollArea className="mx-auto w-full max-w-md p-4 pb-2">
          {data?.roadmap.map(
            (
              { stage, description, tasks }: RoadmapStage,
              stage_index: number,
            ) => (
              <div key={`stage-${stage_index}`} className="mb-8">
                <h1 className="text-lg font-bold text-primary">{stage}</h1>
                <p className="mb-4 text-sm text-muted-foreground">
                  {description}
                </p>
                <div>
                  {tasks.map((task, task_index) => (
                    <div
                      onClick={() =>
                        router.push(
                          `/roadmap/view/${stage_index}/${task_index}`,
                        )
                      }
                      key={`task-${task_index}`}
                      className="my-2 cursor-pointer rounded-xl p-4 hover:bg-muted/50"
                    >
                      <h3 className="text-sm font-semibold sm:text-sm">
                        {task.title}
                      </h3>
                      <p className="mb-4 text-sm font-normal text-muted-foreground sm:text-sm">
                        {task.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {task.keywords.map((keyword, index) => (
                          <Badge
                            variant="secondary"
                            key={`keyword-${index}`}
                            className="text-xs"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </ScrollArea>
      </section>
      <BottomNav />
    </GridDotContainer>
  );
}
