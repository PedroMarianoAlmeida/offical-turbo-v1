"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { WandSparkles } from "lucide-react";
import type { Question, Flow } from "@prisma/client";

import { Button } from "@repo/shadcn/button";
import { LoadingButton } from "@repo/shadcn/loading-button";
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
import { Skeleton } from "@repo/shadcn/skeleton";

import { en } from "@/i18n/en";
import { saveAnswers } from "@/server-actions/flow";

export const formSchema = z.object({
  suggestedStyle: z.string().optional(),
  // size: z.enum(Object.keys(sizeToResolution) as [SizeKey]),
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.string().optional(),
    })
  ),
  extraInformation: z.string().optional(),
});

interface Step2FormProps {
  questions: Question[];
  step1Prompt: Flow["originalPrompt"];
  suggestedStyles: Question | null;
  extraThought: Question | null;
  loading?: true;
}
export function Step2Form({
  // size,
  questions,
  suggestedStyles,
  step1Prompt,
  extraThought,
  loading,
}: Step2FormProps) {
  const router = useRouter();
  const questionsWithoutSuggested = questions.filter(
    ({ question }) => question !== ""
  );

  const { mutateAsync, isIdle } = useMutation({
    mutationFn: saveAnswers,
    onSuccess: (data) => {
      if (data.success) {
        router.push("/dashboard/new-image/step3");
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
      questions: questionsWithoutSuggested.map(({ question, answer }) => ({
        question,
        answer: answer ?? "",
      })),
      suggestedStyle: suggestedStyles?.answer ?? "",
      extraInformation: extraThought?.answer ?? "",
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateAsync({ ...values });
  }

  return (
    <Form {...form}>
      <div className="pb-6 flex flex-col gap-3">
        <p>{en.steps.step2.note}</p>
        <label className="flex gap-1 items-center py-3">
          Prompt:
          {loading ? (
            <Skeleton className="w-60 h-6 inline-block" />
          ) : (
            <span className="font-bold">{step1Prompt}</span>
          )}
        </label>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`questions.${index}.answer`}
            render={({ field }) => {
              return (
                <div className="grid lg:grid-cols-[90%_10%] gap-3 grid-cols-1">
                  <FormItem>
                    <FormLabel>
                      {loading ? (
                        <Skeleton
                          className={`${["w-40", "w-52", "w-32", "w-20", "w-48"][index]} h-6 inline-block`}
                        />
                      ) : (
                        questionsWithoutSuggested[index]?.question
                      )}
                    </FormLabel>
                    <FormControl>
                      <div {...field}>
                        {loading ? (
                          <div className="border rounded flex py-2 pl-3">
                            <Skeleton
                              className={`${["w-40", "w-52", "w-32", "w-20", "w-48"][4 - index]} h-6 inline-block`}
                            />
                          </div>
                        ) : (
                          <Input
                            {...field}
                            placeholder={
                              questionsWithoutSuggested[index]?.placeholder ||
                              "Your answer here"
                            }
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  {questionsWithoutSuggested[index]?.placeholder ? (
                    <Button
                      type="button"
                      className="self-end"
                      variant="secondary"
                      onClick={() =>
                        form.setValue(
                          `questions.${index}.answer`,
                          questionsWithoutSuggested[index].placeholder ?? ""
                        )
                      }
                      disabled={loading}
                    >
                      Keep Suggestion
                    </Button>
                  ) : null}
                </div>
              );
            }}
          />
        ))}
        <FormField
          control={form.control}
          name="suggestedStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{en.steps.step2.form.desiredStyle.label}</FormLabel>
              <FormControl>
                <div {...field}>
                  {loading ? (
                    <div className="border rounded flex py-2 pl-3">
                      <Skeleton className="w-40 h-6 inline-block" />
                    </div>
                  ) : (
                    <Input
                      {...field}
                      placeholder={suggestedStyles?.placeholder}
                    />
                  )}
                </div>
              </FormControl>
              <FormDescription>
                {en.steps.step2.form.desiredStyle.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="extraInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{en.steps.step2.form.extraInfo.label}</FormLabel>
              <FormControl>
                <div {...field}>
                  {loading ? (
                    <div className="border rounded flex py-2 pl-3">
                      <Skeleton className="w-52 h-6 inline-block" />
                    </div>
                  ) : (
                    <Input {...field} placeholder={extraThought?.placeholder} />
                  )}
                </div>
              </FormControl>
              <FormDescription>
                {en.steps.step2.form.extraInfo.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          className="w-full lg:w-42"
          disabled={loading} // The state loading means the form is loading (so the button is disabled)
          loading={!isIdle} // The prop loading means the form is trigger and should show the "loading spinner"
        >
          <WandSparkles />
          <span className="px-2">{en.steps.step2.form.submit}</span>
          <WandSparkles />
        </LoadingButton>
      </form>
    </Form>
  );
}

export default Step2Form;
