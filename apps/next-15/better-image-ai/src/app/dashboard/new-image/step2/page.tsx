import { cookies } from "next/headers";

export default async function Step2() {
  const cookieStore = await cookies();
  const step1 = cookieStore.get("step1")?.value;

  return <>{step1}</>;
}
