import ComicRoot from "@/components/comic/ComicRoot";
import Hero from "@/components/comic/Hero";
import Career from "@/components/comic/Career";
import WorkDivider from "@/components/comic/WorkDivider";
import Projects from "@/components/comic/Projects";
import About from "@/components/comic/About";
import Contact from "@/components/comic/Contact";

export default function Home() {
  return (
    <main>
      <ComicRoot>
        <Hero />
        <Career />
        <WorkDivider text="THE WORK ▸▸▸" angle={115} />
        <Projects />
        <WorkDivider text="◂◂◂ WHO IS THIS GUY?!" angle={-115} reverse />
        <About />
        <Contact />
      </ComicRoot>
    </main>
  );
}
