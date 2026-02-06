import Hero from "@/components/Hero";
import Section from "@/components/Section";

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />

      <Section
        id="projects"
        title="Projects"
        subtitle="I build ML systems and clean full-stack apps. Here are a few."
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          Project cards go here.
        </div>
      </Section>

      <Section
        id="about"
        title="About"
        subtitle="Short bio / skills / what you’re looking for."
        delay={0.06}
      />

      <Section
        id="contact"
        title="Contact"
        subtitle="Email + links go here."
        delay={0.1}
      />
    </main>
  );
}
