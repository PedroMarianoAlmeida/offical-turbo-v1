"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { en } from "@/i18n/en";

const formSchema = z.object({
  originalIdea: z.string().min(15, {
    message: en.steps.step1.form.initialDescriptionField.errorMessage,
  }),
});

function Step1() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalIdea: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { originalIdea } = values;
    const data = await setServerSideCookie({
      key: "step1Question",
      value: originalIdea,
    });
    if (data.success) {
      router.push("/dashboard/new-image/step2");
    } else {
      // Handle error
      console.error("Error setting cookie");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="originalIdea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {en.steps.step1.form.initialDescriptionField.label}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    en.steps.step1.form.initialDescriptionField.placeholder
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {en.steps.step1.form.initialDescriptionField.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"> {en.steps.step1.form.submit}</Button>
      </form>
    </Form>
  );
}

export default Step1;
