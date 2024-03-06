"use client";

import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { AppendChat } from "@/server-actions/chat";
import { useState } from "react";
import { PiArrowUpBold } from "react-icons/pi";
import { SERVER_URL } from "@/config/site-url";

export type ChatDataType = {
  uid: string;
  user: string;
  coursecha: string;
  date_created: string;
};

type Props = {
  chat_data?: ChatDataType[];
};

export const MessageInput = ({ chat_data }: Props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const askGemini = async () => {
    try {
      setLoading(true);

      const chat_history = chat_data?.map((value, index) => {
        return `\nUser: ${value.user}\nCoursecha: ${value.coursecha}`;
      });
      const chat_context = `${chat_history?.join(" ")} \nUser: ${message}`;
      const res = await fetch(
        `${SERVER_URL}/chat?message=${encodeURIComponent(chat_context)}`,
        {
          mode: "cors",
        },
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });

      if (!res.response) return;
      console.log({
        uid: sessionStorage.getItem("uid")!,
        user: message,
        coursecha: res.response,
      });
      await AppendChat({
        uid: sessionStorage.getItem("uid")!,
        user: message,
        coursecha: res.response,
      });
      setLoading(false);
      setMessage("");
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const checkKeyPress = (e: any) => {
    const { key, keyCode } = e;
    console.log(key, keyCode);
    if (keyCode === 13) {
      alert(message);
    }
  };

  return (
    <div className="fixed bottom-0 z-20 w-full max-w-lg p-4 md:bottom-12">
      <div className="relative h-16 w-full overflow-hidden rounded-full border bg-background p-2 shadow-md">
        <textarea
          onChange={handleInputChange}
          onKeyDown={checkKeyPress}
          placeholder="Type something here.."
          className="h-full w-full resize-none place-items-center rounded-full border border-secondary bg-background pl-4 pt-3 text-sm outline-muted-foreground"
        >
          {message}
        </textarea>
        <Button
          disabled={loading || !message}
          onClick={() => askGemini()}
          variant="ghost"
          size="icon"
          className="group absolute right-[11px] top-[11px] gap-2 rounded-full transition-all duration-300 ease-in-out hover:w-24 hover:bg-secondary group-hover:rotate-90"
        >
          <span className="hidden group-hover:flex">Send</span>
          {loading ? (
            <AiOutlineLoading className="h-4 w-4 animate-spin transition-all duration-300 ease-in-out group-hover:rotate-90" />
          ) : (
            <PiArrowUpBold className="h-4 w-4 transition-all duration-300 ease-in-out group-hover:rotate-90" />
          )}
        </Button>
      </div>
    </div>
  );
};
