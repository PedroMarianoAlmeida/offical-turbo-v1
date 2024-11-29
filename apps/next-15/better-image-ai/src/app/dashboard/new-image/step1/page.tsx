"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@repo/shadcn/textarea";

const formSchema = z.object({
  originalIdea: z.string().min(20, {
    message: "The idea should have at least 20 characters",
  }),
});

export function Step1() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalIdea: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                <Textarea placeholder="A boy riding a unicorn" {...field} />
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
