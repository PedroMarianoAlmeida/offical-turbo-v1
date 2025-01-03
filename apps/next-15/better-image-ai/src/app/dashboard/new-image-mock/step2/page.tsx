import { Step2Form } from "@/app/dashboard/new-image/step2/Step2Form";

export default async function Step2() {
  return (
    <Step2Form
      step1Prompt="Original prompt from step 1"
      questions={[
        {
          question: "What time of year is the scene set in?",
          answer: "Summer in July",
          placeholder: "Summer in July",
        },
        {
          question: "What specific beach location is Santa Claus visiting?",
          answer: "Bondi Beach in Australia",
          placeholder: "Summer in July",
        },
        {
          question: "What mood or atmosphere should the image convey?",
          answer: "Joyful and Relaxed",
          placeholder: "Summer in July",
        },
        {
          question:
            "Should Santa be interacting with any people or objects on the beach?",
          answer: "Playing beach volleyball with children",
          placeholder: "",
        },
        {
          question:
            "Are there any specific colors or patterns you want on Santa's beach suit?",
          answer: "Bright red with white and green tropical patterns",
          placeholder: "",
        },
      ]}
      suggestedStyles={{
        question:
          "Are there any specific colors or patterns you want on Santa's beach suit?",
        answer: "Bright red with white and green tropical patterns",
        placeholder: "",
      }}
      extraThought={{
        question:
          "Are there any specific colors or patterns you want on Santa's beach suit?",
        answer: "Bright red with white and green tropical patterns",
        placeholder: "",
      }}
      // loading
    />
  );
}
