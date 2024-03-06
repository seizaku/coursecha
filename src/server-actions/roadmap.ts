"use server";
import { db } from "@/config/firebase-config";

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { action } from "@/lib/safe-action";

import * as z from "zod";

const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  isCompleted: z.boolean(),
});

const RoadmapStageSchema = z.object({
  stage: z.string(),
  description: z.string(),
  tasks: z.array(TaskSchema),
});

const RoadmapSchema = z.object({
  uid: z.string(),
  roadmap_title: z.string(),
  description: z.string(),
  roadmap: z.array(RoadmapStageSchema),
});

export const CreateRoadmap = action(RoadmapSchema, async (data) => {
  const res = await addDoc(collection(db, "roadmap"), {
    uid: data.uid,
    roadmap_title: data.roadmap_title,
    description: data.description,
    roadmap: data.roadmap,
    date_created: new Date().toUTCString(),
  });
  console.log(res);
  return data;
});

const GetProjectSchema = z.object({
  uid: z.string(),
  // roadmap_id: z.string(),
  // access_token: z.string()
});

export const GetRoadmap: any = action(GetProjectSchema, async (data) => {
  const ref = collection(db, "roadmap");
  const roadmap = await getDocs(
    query(
      ref,
      // where(documentId(), "==", data.roadmap_id),
      where("uid", "==", data.uid),
    ),
  );
  return roadmap.docs[roadmap.docs.length - 1].data();
});