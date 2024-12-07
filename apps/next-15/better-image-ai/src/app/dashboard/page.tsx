import Link from "next/link";
import { Button } from "@repo/shadcn/button";

const DashboardPage = () => {
  return (
    <main className="flex flex-col items-center gap-5">
      <h1>Dashboard</h1>
      <Link href="dashboard/new-image/step1">
        <Button>Generate New Image</Button>
      </Link>
    </main>
  );
};

export default DashboardPage;
