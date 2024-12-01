"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@repo/shadcn/select";
// import { SizeKey, sizeToResolution } from "@repo/openai/imageGeneration";

import { setServerSideCookie } from "@/server-actions/cookies";
import { receivingStep1Format } from "@/prompts";

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

export function Step2Form({
  // size,
  questions,
  suggestedReference,
  suggestedStyles,
}: Omit<z.infer<typeof receivingStep1Format>, "isValidPrompt">) {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: setServerSideCookie,
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
      // size: size,
      questions: questions.map(({ question }) => ({
        question,
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateAsync({ key: "step2Question", value: JSON.stringify(values) });
  }

  return (
    <Form {...form}>
      <div>
        <p>Need inspiration to answer the questions? Check those art works:</p>{" "}
        {suggestedReference.map(({ artName, artistName }) => (
          <Link
            href={`https://www.google.com/search?q=artwork+${artName}+by+${artistName}`}
            rel="noopener noreferrer"
            target="_blank"
            key={`${artName}-${artistName}`}
          >
            <Button variant="link">
              {artName} by {artistName}
            </Button>
          </Link>
        ))}
        <p>
          Note: You don&apos;t need to answer ALL the questions, but more information
          means a Better Image =D
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`questions.${index}.answer`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{questions[index]?.question}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={questions[index]?.answer || "Your answer here"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name="suggestedStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have some style in mind?</FormLabel>
              <FormControl>
                <Input {...field} placeholder={suggestedStyles.join(", ")} />
              </FormControl>
              <FormDescription>Desired style</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {size === "notDefined"
                  ? "Do you have some resolution in mind?"
                  : "Do you want to change the resolution?"}
              </FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Resolution</SelectLabel>
                      {Object.entries(sizeToResolution)
                        .filter(([key]) => key !== "notDefined")
                        .map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {`${key} (${value})`}
                          </SelectItem>
                        ))}
                      <SelectItem value="not-defined">
                        Leave for AI decide
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Resolution of image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="extraInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Any extra thoughts?</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Any extra information that came into your mind after the
                original prompt
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

export default Step2Form;
