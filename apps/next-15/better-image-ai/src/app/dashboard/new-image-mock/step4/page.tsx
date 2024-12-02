export const maxDuration = 60;
import Image from "next/image";
import Link from "next/link";

import { Button } from "@repo/shadcn/button";

import { en } from "@/i18n/en";

export default async function Step4() {
  return (
    <main className="flex flex-col gap-10 items-center pb-4">
      <section className="flex gap-5">
        <div>
          <h2 className="text-center">{en.steps.step4.original}</h2>
          <Image
            src="/mock/betterimage1.webp"
            alt="Image"
            // Add based on size
            width={500}
            height={500}
          />
          <p>Original prompt from step 1</p>
        </div>
        <div>
          <h2 className="text-center">{en.steps.step4.final}</h2>
          <Image
            src="/mock/betterimage2.webp"
            alt="Image"
            width={500}
            height={500}
          />
          <p>Big prompt from Step 3</p>
        </div>
      </section>
      <Link href="/dashboard">
        <Button>{en.steps.step4.goBack}</Button>
      </Link>
    </main>
  );
}
