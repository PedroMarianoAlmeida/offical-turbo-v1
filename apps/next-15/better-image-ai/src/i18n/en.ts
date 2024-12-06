export const en = {
  steps: {
    step1: {
      title: "Original Prompt",
      form: {
        initialDescriptionField: {
          errorMessage: "The idea should have at least 15 characters",
          label: "Initial Description",
          placeholder: "A boy riding a unicorn",
          description:
            "The first draft of your idea... be as specific as you can!",
        },
        submit: "Generate questions",
      },
    },
    step2: {
      title: "Refine Prompt",
      reference: "Need inspiration? Check the artwork(s):",
      note: "Note: Answering more questions is encouraged but not mandatory.",
      form: {
        desiredStyle: {
          label: "Do you have some style in mind?",
          description: "Desired style",
        },
        extraInfo: {
          label: "Any extra thoughts?",
          description:
            "Any extra information that came into your mind after the original prompt",
        },
        submit: "Create new prompt",
      },
    },
    step3: {
      title: "Revised Prompt",
      form: {
        oldPrompt: {
          label: "Old prompt",
          description: "The first draft of your idea",
        },
        newPrompt: {
          label: "New prompt",
          description:
            "Our brand new prompt, feel free to edit it (last chance)!",
        },
        submit: "Generate image",
      },
    },
    step4: {
      title: "Get your Images",
      original: "Original Prompt",
      final: "Final Prompt",
      goBack: "Go back to Dashboard",
    },
  },
};
