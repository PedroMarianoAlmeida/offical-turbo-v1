import { UserData } from "@repo/core-main/types";
import {
  ProtectedWithRedirect,
  ProtectedWithFallback,
} from "@repo/next-auth/protected";
import { getUserCountUsageForToday } from "@repo/firebase/userCount";
import { database } from "@/configs/firebaseConfig";

const UserValidated = async ({
  userData,
  children,
}: {
  userData: UserData;
  children: React.ReactNode;
}) => {
  const { id } = userData;
  const usageCount = await getUserCountUsageForToday({
    userId: id.toString(),
    database,
    project: process.env.PROJECT_NAME,
  });

  let forceFallback = false;
  let fallbackMessage = "";
  let dailyUsageOut = 0;

  if (!usageCount.success) {
    forceFallback = true;
    fallbackMessage = "Error fetching user limit";
  } else {
    dailyUsageOut = usageCount.result;
    if (dailyUsageOut > Number(process.env.DAILY_LIMIT)) {
      forceFallback = true;
      fallbackMessage = "User has reached the limit";
    }
  }

  return (
    <ProtectedWithFallback
      fallback={fallbackMessage}
      forceFallback={forceFallback}
    >
      {children}
    </ProtectedWithFallback>
  );
};

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedWithRedirect>
      {(userData) => {
        return (
          <>
            <h1>Dashboard</h1>
            <h2>Helo, {userData.name ?? "Visitor"}</h2>
            <UserValidated userData={userData}>{children}</UserValidated>
          </>
        );
      }}
    </ProtectedWithRedirect>
  );
};

export default DashboardLayout;
