"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@repo/shadcn/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/shadcn/form";
import { Input } from "@repo/shadcn/input";
import { Textarea } from "@repo/shadcn/textarea";

import { setServerSideCookie } from "@/server-actions/cookies";

const formSchema = z.object({
  revisedPrompt: z.string(),
  originalIdea: z.string(),
});
interface Step3Props {
  originalIdea: string;
  aiGeneratedPrompt: string;
}
export function Step3Form({ aiGeneratedPrompt, originalIdea }: Step3Props) {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: setServerSideCookie,
    onSuccess: (data) => {
      if (data.success) {
        //router.push("/dashboard/new-image/step2");
      } else {
      }
    },
    onError: () => {
      console.log("ERROR");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      revisedPrompt: aiGeneratedPrompt,
      originalIdea,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { revisedPrompt } = values;
    // mutateAsync({ key: "step1Question", value: originalIdea });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="originalIdea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old prompt</FormLabel>
              <FormControl>
                <Input
                  placeholder="A boy riding a unicorn"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormDescription>The first draft of your idea</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="revisedPrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New prompt</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Our brand new prompt, feel free to edit it (last chance)!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate Image</Button>
      </form>
    </Form>
  );
}
