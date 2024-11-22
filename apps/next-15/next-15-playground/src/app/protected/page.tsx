import { Protected } from "@repo/next-auth/protected";

const ProtectedPage = () => {
  return (
    <Protected redirectTo="/api/auth/signin">
      <p>Protected Page</p>
    </Protected>
  );
};

export default ProtectedPage;
