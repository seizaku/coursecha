"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImReply } from "react-icons/im";
import { ChatDataType, MessageInput } from "./message-input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { GetChatHistory } from "@/server-actions/chat";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatPage() {
  const [conversation, setConversation] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getConversation = async () => {
    const chat = await GetChatHistory({ uid: sessionStorage.getItem("uid")! });
    setConversation(chat.data);
  };

  useEffect(() => {
    setLoading(true);
    getConversation();
    setLoading(false);
  }, [conversation]);

  return (
    <section className="flex justify-center">
      <section className="flex min-h-screen w-full items-center p-4 pb-44">
        <ScrollArea className="relative mx-auto h-screen w-full max-w-lg p-4 pt-6">
          <div className="flex w-full justify-between">
            <Link
              href={"/roadmap"}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "group right-[11px] top-[11px] gap-2 rounded-full transition-all duration-300 ease-in-out hover:w-36 hover:bg-secondary group-hover:rotate-90",
              )}
            >
              <ChevronLeft className="h-4 w-4 transition-all duration-300 ease-in-out" />
              <span className="hidden group-hover:flex">Go Back</span>
            </Link>
          </div>
          {!loading &&
            conversation?.map((chat: ChatDataType, index: number) => (
              <div key={`chat-${index}`} className="border-b p-4 pb-4">
                <h1 className="text-lg font-bold">{chat.user}</h1>
                <div className="my-2 flex gap-2 text-sm">
                  <ImReply /> Answer
                </div>
                {/* Response here */}
                <article
                  dangerouslySetInnerHTML={{ __html: `${chat.coursecha}` }}
                  className="prose prose-sm dark:prose-invert"
                ></article>
              </div>
            ))}
          {loading && (
            <>
              <Skeleton className="mt-4 h-16 w-full" />
              <Skeleton className="mt-2 h-4 w-1/4" />
              <Skeleton className="mt-2 h-6 w-4/12" />
              <Skeleton className="mt-2 h-6 w-4/6" />
              <Skeleton className="mb-4 mt-2 h-6 w-4/5" />
              <Skeleton className="mt-4 h-16 w-full" />
              <Skeleton className="mt-2 h-4 w-1/4" />
              <Skeleton className="mt-2 h-6 w-4/12" />
              <Skeleton className="mt-2 h-6 w-4/6" />
              <Skeleton className="mt-2 h-6 w-4/5" />
              <Skeleton className="mt-4 h-16 w-full" />
              <Skeleton className="mt-2 h-4 w-1/4" />
              <Skeleton className="mt-2 h-6 w-4/12" />
              <Skeleton className="mt-2 h-6 w-4/6" />
              <Skeleton className="mt-2 h-6 w-4/5" />
            </>
          )}
        </ScrollArea>
      </section>
      <MessageInput chat_data={conversation} />
    </section>
  );
}
