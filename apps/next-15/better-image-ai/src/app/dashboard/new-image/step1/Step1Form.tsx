"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { WandSparkles } from "lucide-react";

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
import { Checkbox } from "@repo/shadcn/checkbox";

import { startFlowWithPrompt } from "@/server-actions/flow";
import { en } from "@/i18n/en";
import { maxCharacters } from "@/prompts";

const formSchema = z.object({
  originalIdea: z
    .string()
    .min(15, {
      message: en.steps.step1.form.initialDescriptionField.errorMessage,
    })
    .max(maxCharacters.step1),
  acceptTermsAndConditions: z.boolean(),
});

export function Step1Form({ loading }: { loading?: true }) {
  const router = useRouter();

  const { mutateAsync, isIdle } = useMutation({
    mutationFn: startFlowWithPrompt,
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
      acceptTermsAndConditions: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { originalIdea } = values;
    mutateAsync({ originalPrompt: originalIdea });
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
        <FormField
          control={form.control}
          name="acceptTermsAndConditions"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="flex gap-2">
                  <FormLabel>Accept terms and conditions</FormLabel>
                  <FormControl>
                    {loading ? (
                      <div className="border rounded flex py-2 pl-3">
                        <Skeleton className="w-4 h-6 inline-block" />
                      </div>
                    ) : (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        name={field.name}
                        ref={field.ref}
                      />
                    )}
                  </FormControl>
                </div>
                <FormDescription>
                  Please accept the terms and conditions to proceed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <LoadingButton
          type="submit"
          disabled={loading || !form.watch("acceptTermsAndConditions")} // The state loading means the form is loading (so the button is disabled)
          loading={!isIdle} // The prop loading means the form is trigger and should show the "loading spinner"
        >
          <WandSparkles />
          <span className="px-2">{en.steps.step1.form.submit}</span>
          <WandSparkles />
        </LoadingButton>
      </form>
    </Form>
  );
}
