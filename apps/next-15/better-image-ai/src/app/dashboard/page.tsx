import Link from "next/link";

import { Button } from "@repo/shadcn/button";

import { Feed } from "@/components/feed";
import { UserIncompleteFlow } from "@/components/user-incomplete-flow";

const DashboardPage = async () => {
  return (
    <main className="flex flex-col items-center gap-5">
      <h1>Dashboard</h1>
      <Link href="dashboard/new-image/step1">
        <Button>Generate New Image</Button>
      </Link>
      <UserIncompleteFlow />
      <h2>Your completed images</h2>
      <Feed ownUser={true} />
    </main>
  );
};

export default DashboardPage;
