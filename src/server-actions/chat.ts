"use server";
import { db } from "@/config/firebase-config";

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { action } from "@/lib/safe-action";

import * as z from "zod";

const GetChatSchema = z.object({
  uid: z.string(),
  user: z.string(),
  coursecha: z.string(),
});

export const AppendChat = action(GetChatSchema, async (data) => {
  const res = await addDoc(collection(db, "chat"), {
    uid: data.uid,
    user: data.user,
    coursecha: data.coursecha,
    date_created: new Date().toUTCString(),
  });
  console.log(res);
  return data;
})

const GetConversationSchema = z.object({
  uid: z.string(),
});
export const GetChatHistory = action(GetConversationSchema, async (data) => {
  if (!data.uid) return;
  const chat = await getDocs(
    query(collection(db, "chat"), where("uid", "==", data?.uid), orderBy("date_created", "asc")),
  );

  return chat.docs.map((doc) => {
    const data = doc.data();
    return {
      user: data.user,
      coursecha: data.coursecha,
    };
  });
})