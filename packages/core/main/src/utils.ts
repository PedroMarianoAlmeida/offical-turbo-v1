/** Transform a text in a urlSafe (it is not encryption) */
export function urlSafeBase64Encode(text: string) {
  const normalizedEmail = text.toLowerCase();

  return btoa(normalizedEmail)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
