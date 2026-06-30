import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Projects } from "@/components/Projects/Projects";
import { Career } from "@/components/Career/Career";
import { Contact } from "@/components/Contact/Contact";
import { SmoothScroll } from "@/components/Common/SmoothScroll/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Career />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
