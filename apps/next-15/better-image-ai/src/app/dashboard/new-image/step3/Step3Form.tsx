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
import { Textarea } from "@repo/shadcn/textarea";
import { CopyButton } from "@repo/shadcn/copy-button";

import { setServerSideCookie } from "@/server-actions/cookies";
import { en } from "@/i18n/en";

const formSchema = z.object({
  revisedPrompt: z.string(),
  originalIdea: z.string(),
});
interface Step3Props {
  originalIdea: string;
  aiGeneratedPrompt: string;
  loading?: true;
}
export function Step3Form({
  aiGeneratedPrompt,
  originalIdea,
  loading,
}: Step3Props) {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
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
                <div {...field}>
                  {loading ? (
                    <div className="border rounded flex py-2 pl-3">
                      <Skeleton className="w-52 h-6 inline-block" />
                    </div>
                  ) : (
                    <Input {...field} disabled />
                  )}
                </div>
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
              <div className="mb-3 flex gap-5 items-center">
                <FormLabel>{en.steps.step3.form.newPrompt.label}</FormLabel>
                <CopyButton textToCopy={field.value} disabled={loading} />
              </div>
              <FormControl>
                <div {...field}>
                  {loading ? (
                    <div className="border rounded flex py-2 pl-3 gap-1 flex-wrap">
                      <Skeleton className="w-20 h-6 inline-block mb-2" />
                      <Skeleton className="w-12 h-6 inline-block mb-2" />
                      <Skeleton className="w-48 h-6 inline-block mb-2" />
                      <Skeleton className="w-32 h-6 inline-block mb-2" />
                      <Skeleton className="w-40 h-6 inline-block mb-2" />
                      <Skeleton className="w-16 h-6 inline-block mb-2" />
                      <Skeleton className="w-24 h-6 inline-block mb-2" />
                      <Skeleton className="w-28 h-6 inline-block mb-2" />
                      <Skeleton className="w-36 h-6 inline-block mb-2" />
                      <Skeleton className="w-44 h-6 inline-block mb-2" />
                      <Skeleton className="w-48 h-6 inline-block mb-2" />
                      <Skeleton className="w-32 h-6 inline-block mb-2" />
                      <Skeleton className="w-40 h-6 inline-block mb-2" />
                      <Skeleton className="w-16 h-6 inline-block mb-2" />
                      <Skeleton className="w-24 h-6 inline-block mb-2" />
                    </div>
                  ) : (
                    <Textarea {...field} />
                  )}
                </div>
              </FormControl>
              <FormDescription>
                {en.steps.step3.form.newPrompt.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          disabled={loading} // The state loading means the form is loading (so the button is disabled)
          loading={isPending} // The prop loading means the form is trigger and should show the "loading spinner"
        >
          {en.steps.step3.form.submit}
        </LoadingButton>
      </form>
    </Form>
  );
}
