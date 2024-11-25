// Don't delete this file! This implementation should be in the real project, but leverage of Layouts to handle this better
import { Suspense } from "react";
import {
  ProtectedWithRedirect,
  ProtectedWithFallback,
} from "@repo/next-auth/protected";
import { getUserCountUsageForToday } from "@repo/firebase/userCount";
import { database } from "@/miscellaneous/firebaseConfig";
import { projectName, dailyLimit } from "@/miscellaneous/constants";
import { UserData } from "@repo/core-main/types";

import { IncrementUsageButton } from "./client-side";

const UserValidated = async ({ userData }: { userData: UserData }) => {
  const { id } = userData;
  const usageCount = await getUserCountUsageForToday({
    userId: id.toString(),
    database,
    project: projectName,
  });

  let forceFallback = false;
  let fallbackMessage = "";
  let dailyUsageOut = 0;

  if (!usageCount.success) {
    forceFallback = true;
    fallbackMessage = "Error fetching user limit";
  } else {
    dailyUsageOut = usageCount.result;
    if (dailyUsageOut > dailyLimit) {
      forceFallback = true;
      fallbackMessage = "User has reached the limit";
    }
  }

  return (
    // <ProtectedWithFallback
    //   fallback={fallbackMessage}
    //   forceFallback={forceFallback}
    // >
    <>
      <IncrementUsageButton userId={userData.id.toString()} />
      <p>{dailyUsageOut}</p>
    </>
    // </ProtectedWithFallback>
  );
};
const ProtectedPage = async () => {
  return (
    <ProtectedWithRedirect redirectTo="/api/auth/signin">
      {(userData) => {
        return (
          <Suspense fallback={<p>...Loading</p>}>
            <UserValidated userData={userData} />
          </Suspense>
        );
      }}
    </ProtectedWithRedirect>
  );
};

export default ProtectedPage;
