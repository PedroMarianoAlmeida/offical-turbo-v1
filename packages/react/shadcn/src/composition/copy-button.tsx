import { Clipboard } from "lucide-react";
import { Button } from "./../native-shadcn/button";
import { toast } from "sonner";

interface CopyButtonProps {
  textToCopy: string;
  copiedMessage?: string;
}

export const CopyButton = ({
  textToCopy,
  copiedMessage = "Copied to clipboard",
}: CopyButtonProps) => {
  const handleClick = () => {
    navigator.clipboard.writeText(textToCopy);
    toast(copiedMessage, {
      position: "top-center",
    });
  };
  return (
    <>
      <Button onClick={handleClick} type="button" variant="secondary">
        <span className="text-xs">Copy</span> <Clipboard />
      </Button>
    </>
  );
};
