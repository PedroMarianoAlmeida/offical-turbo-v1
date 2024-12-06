import { asyncWrapper, AsyncWrapperResponse } from "./asyncWrapper";

/** Transform a text in a urlSafe (it is not encryption) */
export function urlSafeBase64Encode(text: string) {
  const normalizedEmail = text.toLowerCase();

  return btoa(normalizedEmail)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function download(
  url: string,
  filename: string
): Promise<AsyncWrapperResponse<void>> {
  return asyncWrapper(async () => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  });
}
