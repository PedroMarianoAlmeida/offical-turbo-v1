import { Protected } from "@repo/next-auth/protected";
import { getUserCountUsageForToday, incrementUserCountUsage } from "@repo/firebase/userCount";
import { database } from "./../../../firebaseConfig";

const Test = async ({ userId }: { userId: string }) => {
  const usageCount = await getUserCountUsageForToday({ userId, database });
  if (!usageCount) return <p>...Loading</p>;

  if (!usageCount.success) return <p>Something went wrong</p>;
  const { result: dailyUsage } = usageCount;

  console.log({ dailyUsage });

  return <p>{dailyUsage}</p>;
};
const ProtectedPage = async () => {
  return (
    <Protected redirectTo="/api/auth/signin">
      {(userData) => {
        return (
          <>
            
            <Test userId={userData.id.toString()} />
          </>
        );
      }}
    </Protected>
  );
};

export default ProtectedPage;
