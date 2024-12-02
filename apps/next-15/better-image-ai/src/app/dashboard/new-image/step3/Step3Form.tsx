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
import { en } from "@/i18n/en";

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
        router.push("/dashboard/new-image/step4");
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
    mutateAsync({ key: "step3Question", value: revisedPrompt });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="originalIdea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{en.steps.step3.form.oldPrompt.label}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormDescription>
                {en.steps.step3.form.oldPrompt.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="revisedPrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{en.steps.step3.form.newPrompt.label}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                {en.steps.step3.form.newPrompt.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{en.steps.step3.form.submit}</Button>
      </form>
    </Form>
  );
}
