import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />

      {/* Placeholder sections so buttons scroll somewhere */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-2xl font-semibold text-white">Projects</h2>
        <p className="mt-3 text-white/70">
          Next we’ll build the projects grid/cards.
        </p>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-2xl font-semibold text-white">Contact</h2>
        <p className="mt-3 text-white/70">
          Next we’ll build a clean contact block.
        </p>
      </section>
    </main>
  );
}
