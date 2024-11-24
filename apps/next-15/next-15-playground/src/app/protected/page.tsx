import { Protected } from "@repo/next-auth/protected";
import { getUserCountUsageForToday } from "@repo/firebase/userCount";
import { database } from "./../../../firebaseConfig";
import { IncrementUsageButton } from "./client-side";
import { projectName } from "@/constants";

const Test = async ({ userId }: { userId: string }) => {
  const usageCount = await getUserCountUsageForToday({
    userId,
    database,
    project: projectName,
  });
  // This logic should not be at page level, put inside protected component with fallback
  if (!usageCount) return <p>...Loading</p>;

  if (!usageCount.success) return <p>Something went wrong</p>;
  const { result: dailyUsage } = usageCount;

  return <p>{dailyUsage}</p>;
};
const ProtectedPage = async () => {
  return (
    <Protected redirectTo="/api/auth/signin">
      {(userData) => {
        return (
          <>
            <IncrementUsageButton userId={userData.id.toString()} />
            <Test userId={userData.id.toString()} />
          </>
        );
      }}
    </Protected>
  );
};

export default ProtectedPage;
