import { useState } from "react";
import { CameraIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn/table";

import { LoadingButton } from "@repo/shadcn/loading-button";

import { IncompleteFlowItem } from "./index";
import { resumeFlow } from "@/server-actions/flow";

export const UserTable = ({ rows }: { rows: IncompleteFlowItem[] }) => {
  const [flowClicked, setFlowClicked] = useState("");

  const handleClick = (flow: IncompleteFlowItem) => {
    setFlowClicked(flow.id);
    resumeFlow({ flow });
  };

  if (rows.length === 0) return;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Initial Prompt</TableHead>
          <TableHead>Final Prompt</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.originalPrompt}</TableCell>
            <TableCell className="line-clamp-6">
              {row.userModifiedPrompt ?? row.aiGeneratedPrompt}
            </TableCell>
            <TableCell className="text-center">
              <LoadingButton
                className="w-6 h-6 p-1"
                onClick={() => handleClick(row)}
                loading={flowClicked === row.id}
              >
                <CameraIcon />
              </LoadingButton>
              {/* <Button>Delete</Button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
