import Link from "next/link";

export default function About() {
  return (
    <main>
      <section className="my-3">
        <h1 className="font-bold">About</h1>
        <p>
          Conceived and created by{" "}
          <span className="font-medium font-mono">Pedro Almeida</span>
        </p>
      </section>
      <section>
        <h2 className="font-bold">Contact</h2>
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
