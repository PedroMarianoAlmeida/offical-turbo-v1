"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { LoadingButton } from "@repo/shadcn/loading-button";
import { Skeleton } from "@repo/shadcn/skeleton";
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
import { maxCharacters } from "@/prompts";

const formSchema = z.object({
  originalIdea: z
    .string()
    .min(15, {
      message: en.steps.step1.form.initialDescriptionField.errorMessage,
    })
    .max(maxCharacters.step1),
});

export function Step1Form({ loading }: { loading?: true }) {
  const router = useRouter();

  const { mutateAsync, isIdle } = useMutation({
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { originalIdea } = values;
    mutateAsync({ key: "step1Question", value: originalIdea });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="originalIdea"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  {en.steps.step1.form.initialDescriptionField.label}
                </FormLabel>
                <FormControl>
                  <div {...field}>
                    {loading ? (
                      <div className="border rounded flex py-2 pl-3">
                        <Skeleton className="w-52 h-6 inline-block" />
                      </div>
                    ) : (
                      <Input
                        placeholder={
                          en.steps.step1.form.initialDescriptionField
                            .placeholder
                        }
                        maxLength={maxCharacters.step1}
                        {...field}
                      />
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  {maxCharacters.step1 - field.value.length} characters
                  remaining
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <LoadingButton
          type="submit"
          disabled={loading} // The state loading means the form is loading (so the button is disabled)
          loading={!isIdle} // The prop loading means the form is trigger and should show the "loading spinner"
        >
          {en.steps.step1.form.submit}
        </LoadingButton>
      </form>
    </Form>
  );
}
