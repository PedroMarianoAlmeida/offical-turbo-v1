import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn/table";

import { getUserHistory } from "@/server-actions/flow";

export const UserHistory = async () => {
  const { rows } = await getUserHistory();

  if (rows.length === 0) return;
  return (
    <Table>
      <TableCaption>All your previous prompts</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Initial Prompt</TableHead>
          <TableHead>Initial Prompt Image</TableHead>
          <TableHead>Final Prompt</TableHead>
          <TableHead>Final Prompt Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(
          ({
            aiGeneratedPrompt,
            finalPromptImage,
            originalPrompt,
            originalPromptImage,
            userModifiedPrompt,
            id,
          }) => (
            <TableRow key={id}>
              <TableCell>{originalPrompt}</TableCell>
              <TableCell>
                {originalPromptImage ? (
                  <Image
                    src={originalPromptImage}
                    width={500}
                    height={500}
                    alt={originalPrompt}
                  />
                ) : null}
              </TableCell>
              <TableCell>{userModifiedPrompt ?? aiGeneratedPrompt}</TableCell>
              <TableCell>
                {finalPromptImage ? (
                  <Image
                    src={finalPromptImage}
                    width={500}
                    height={500}
                    alt={originalPrompt}
                  />
                ) : null}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
