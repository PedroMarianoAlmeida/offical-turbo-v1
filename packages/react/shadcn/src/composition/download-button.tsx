import { FileDown } from "lucide-react";
import { Button } from "../native-shadcn/button";
import { download } from "@repo/core-main/utils";
import { toast } from "sonner";

export interface DownloadButtonProps {
  url: string;
  filename: string;
  disabled?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const DownloadButton = ({
  disabled = false,
  filename,
  url,
  errorMessage = "Download failed",
  successMessage = "Downloaded successfully",
}: DownloadButtonProps) => {
  const handleClick = async () => {
    const result = await download(url, filename);

    if (!result.success) {
      toast.error(errorMessage, {
        position: "top-center",
      });
      return;
    }

    toast.success(successMessage, {
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
        <span className="text-xs">Download</span> <FileDown />
      </Button>
    </>
  );
};
