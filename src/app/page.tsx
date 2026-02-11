import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CareerTimeline from "@/components/CareerTimeline";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <Section
        id="career"
        title="My Career"
        subtitle="A quick timeline of roles and leadership."
      >
        <CareerTimeline />
      </Section>

      <Section
        id="projects"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          <ProjectsSection />
        </div>
      </Section>

      <Section
        id="about"
        title="About"
        subtitle="Machine Learning Engineer with experience architecting high-performance LLM pipelines, retrieval-augmented generation systems, and scalable deep learning models across research and industry. 
        Proven track record of optimizing model efficiency, accelerating inference, and delivering production-grade AI solutions using modern MLOps, cloud infrastructure, and data engineering best practices."
        delay={0.06}
      />

      <Section
        id="contact"
        subtitle="Links to my resume, LinkedIn, GitHub, and email are always available in the top right corner."
        delay={0.1}
      />
    </main>
  );
}
