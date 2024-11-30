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

import { setServerSideCookie } from "@/server-actions/cookies";

const formSchema = z.object({
  originalIdea: z.string().min(20, {
    message: "The idea should have at least 20 characters",
  }),
});

export function Step1() {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: setServerSideCookie,
    onSuccess: (data) => {
      if (data.success) {
        router.push("/dashboard/new-image/step2");
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
      originalIdea: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { originalIdea } = values;
    mutateAsync({ key: "step1Question", value: originalIdea });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="originalIdea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Description</FormLabel>
              <FormControl>
                <Input placeholder="A boy riding a unicorn" {...field} />
              </FormControl>
              <FormDescription>
                The first draft of your idea... Be as specific that you can!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default Step1;
