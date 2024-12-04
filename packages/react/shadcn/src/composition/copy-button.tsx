import { Clipboard } from "lucide-react";
import { Button } from "./../native-shadcn/button";
import { toast } from "sonner";

interface CopyButtonProps {
  textToCopy: string;
  copiedMessage?: string;
  disabled?: boolean;
}

export const CopyButton = ({
  textToCopy,
  copiedMessage = "Copied to clipboard",
  disabled = false,
}: CopyButtonProps) => {
  const handleClick = () => {
    navigator.clipboard.writeText(textToCopy);
    toast(copiedMessage, {
      position: "top-center",
    });
  };
  return (
    <>
      <Button
        onClick={handleClick}
        type="button"
        variant="secondary"
        disabled={disabled}
      >
        <span className="text-xs">Copy</span> <Clipboard />
      </Button>
    </>
  );
};
