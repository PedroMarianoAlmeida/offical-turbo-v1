import { useState } from "react";
import { CameraIcon, Trash2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

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
import { resumeFlow, deleteFlow } from "@/server-actions/flow";

export const UserTable = ({ rows }: { rows: IncompleteFlowItem[] }) => {
  const [flowClicked, setFlowClicked] = useState("");
  const queryClient = useQueryClient();

  const handleResumeFlow = (flow: IncompleteFlowItem) => {
    setFlowClicked(flow.id);
    resumeFlow({ flow });
  };

  const handleDeleteFlow = async (flow: IncompleteFlowItem) => {
    setFlowClicked(flow.id);
    const response = await deleteFlow(flow.id);

    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ["user-incomplete-feed"] });
    } else {
      console.error("Error deleting flow:", response.message);
      // Optionally, display an error message to the user
    }

    setFlowClicked("");
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
            <TableCell className="text-center w-60">
              <LoadingButton
                className="w-6 h-6 p-1"
                onClick={() => handleResumeFlow(row)}
                loading={flowClicked === row.id}
              >
                <CameraIcon />
              </LoadingButton>
              <LoadingButton
                className="w-6 h-6 p-1 ml-2"
                onClick={() => handleDeleteFlow(row)}
                loading={flowClicked === row.id}
              >
                <Trash2Icon />
              </LoadingButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
