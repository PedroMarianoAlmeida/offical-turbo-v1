import Link from "next/link";
import { Button } from "@repo/shadcn/button";

const DashboardPage = () => {
  return (
    <main>
      <h2>Dashboard Page</h2>
      <Link href="dashboard/new-image/step1">
        <Button>Generate New Image</Button>
      </Link>
    </main>
  );
};

export default DashboardPage;
