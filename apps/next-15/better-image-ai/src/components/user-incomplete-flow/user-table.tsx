import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn/table";
// import { Button } from "@repo/shadcn/button";

import { IncompleteFlowItem } from "./index";

export const UserTable = ({ rows }: { rows: IncompleteFlowItem[] }) => {
  if (rows.length === 0) return;
  return (
    <Table>
      <TableCaption>You doesn't create the images for those</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Initial Prompt</TableHead>
          <TableHead>Final Prompt</TableHead>
          {/* <TableHead>Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(
          ({ aiGeneratedPrompt, originalPrompt, userModifiedPrompt, id }) => (
            <TableRow key={id}>
              <TableCell>{originalPrompt}</TableCell>
              <TableCell className="line-clamp-6">
                {userModifiedPrompt ?? aiGeneratedPrompt}
              </TableCell>
              {/* <TableCell>
                <Button>Continue</Button>
                <Button>Delete</Button>
              </TableCell> */}
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
