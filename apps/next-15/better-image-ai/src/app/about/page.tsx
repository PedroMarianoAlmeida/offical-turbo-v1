import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Better Image AI",
};

export default function About() {
  return (
    <main>
      <section className="my-3">
        <h1>About</h1>
        <p>
          Conceived and created by{" "}
          <span className="font-medium font-mono">Pedro Almeida</span>
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <ul className="list-disc">
          <li>
            <Link
              href="https://www.linkedin.com/in/pedroprogrammer/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Linkedin
            </Link>
          </li>
          <li>
            <Link
              href="https://pedroalmeidaprogrammer.vercel.app/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Official Website
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
