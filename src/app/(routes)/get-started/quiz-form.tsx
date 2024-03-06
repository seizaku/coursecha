"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { CreateRoadmap } from "@/server-actions/roadmap";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SERVER_URL } from "@/config/site-url";

const FormSchema = z.object({
  experience: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select an experience level.",
  }),
  reason: z.enum(
    ["make a living", "hobby", "to sustain myself", "required to do so"],
    {
      required_error: "You need to select a reason.",
    },
  ),
  goal: z.enum(["soil. traditional", "hydroponic", "aeroponic"], {
    required_error: "You need to select your desired goal.",
  }),
});

export const QuizForm = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    console.log(
      `${SERVER_URL}/roadmap?data=${encodeURIComponent(JSON.stringify(data))}`,
    );
    const roadmap = await fetch(
      `${SERVER_URL}/roadmap?data=${encodeURIComponent(JSON.stringify(data))}`,
      {
        mode: "cors",
      },
    )
      .then((response) => response.json())
      .then((user) => {
        return user;
      });

    if (!roadmap)
      throw new Error("Invalid response was returned from gemini api.");

    roadmap.uid = sessionStorage.getItem("uid");
    const res = await CreateRoadmap(roadmap);
    console.log(res);
    toast({
      title: "Roadmap has been created!",
      description: "Thank you for your patience!",
    });
    setLoading(false);

    router.push("/roadmap");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>1. What is your current farming experience?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="beginner" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I'm a complete beginner
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="intermediate" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I know the basics
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="advanced" />
                    </FormControl>
                    <FormLabel className="font-normal">I'm an expert</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>2. Why do you want to farm?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="make a living" />
                    </FormControl>
                    <FormLabel className="font-normal">Make a living</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="hobby" />
                    </FormControl>
                    <FormLabel className="font-normal">Just a hobyy</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="to sustain myself" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      To sustain myself
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="required to do so" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I'm required to do so
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>3. What kind of farm do you want to start?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="soil. traditional" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Soil. Traditional (Recommended)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="hydroponic" />
                    </FormControl>
                    <FormLabel className="font-normal">Hydroponic</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="aeroponic" />
                    </FormControl>
                    <FormLabel className="font-normal">Aeroponic</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          type="submit"
          className="w-full gap-2 rounded-xl"
        >
          {!isLoading ? "Submit" : "Creating roadmap..."}
        </Button>
      </form>
    </Form>
  );
};
