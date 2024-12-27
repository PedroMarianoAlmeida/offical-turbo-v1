import { Step3Form } from "@/app/dashboard/new-image/step3/Step3Form";

export default async function Step3Loading() {
  return (
    <Step3Form
      originalIdea="A monkey in a forest"
      aiGeneratedPrompt="Create a cartoon image of a chimpanzee in a Chinese forest during twilight. The chimpanzee is depicted eating a banana, but it looks really upset. Additionally, in the background, there is a wreck of a crashed airplane."
      userModifiedPrompt=""
      loading
    />
  );
}
