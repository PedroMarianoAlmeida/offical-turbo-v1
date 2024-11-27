import { ProtectedWithRedirect } from "@repo/next-auth/protected";

// It is possible pass the userData to the page?
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
            {children}
          </>
        );
      }}
    </ProtectedWithRedirect>
  );
};

export default DashboardLayout;
