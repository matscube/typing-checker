import clsx from "clsx";
import TypingGame from "./typing-game";

export default function Home() {
  return (
    <div
      className={clsx(
        "grid grid-rows-[20px_1fr_20px]",
        "items-center justify-items-center",
        "min-h-screen max-h-screen",
        "p-8 pb-20 gap-16 sm:p-20",
        "font-[family-name:var(--font-geist-sans)]"
      )}
    >
      <main
        className={clsx(
          "w-full flex flex-col gap-8 row-start-2 items-center sm:items-start"
        )}
      >
        <TypingGame />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>
          &copy; {new Date().getFullYear()} typing-checker. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
