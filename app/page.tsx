import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="w-125 h-125 rounded-full object-cover "
          src="/sunny_&_clear.jpg"
          alt="Next.js logo"
          width={400}
          height={400}

          priority
        />


      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://mastrymedia.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to mastrymedia.net →
        </a>
      </footer>
    </div>
  );
}
