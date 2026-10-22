import { MotionConfig } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SpotlightSection from "./components/Spotlight";
import Footer from "./components/Footer";
import MobileOrderBar from "./components/MobileOrderBar";
import About from "./sections/About";
import MeetTheArchitect from "./sections/MeetTheArchitect";
import Menu from "./sections/Menu";
import Gallery from "./sections/Gallery";
import QuoteCTA from "./sections/QuoteCTA";
import Social from "./sections/Social";
import Reviews from "./sections/Reviews";
import FAQ from "./sections/FAQ";
import { REVIEWS } from "./lib/content";

// The reviews section appears once at least one real (non-sample) review is in REVIEWS.
const SHOW_REVIEWS = REVIEWS.some((r) => !r.sample);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="eyebrow sr-only z-[70] rounded-full bg-ink px-5 py-3 text-off-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <SpotlightSection />
        <Gallery />
        {SHOW_REVIEWS && <Reviews />}
        <About />
        <MeetTheArchitect />
        <Menu />
        <FAQ />
        <QuoteCTA />
        <Social />
      </main>
      <Footer />
      <MobileOrderBar />
    </MotionConfig>
  );
}
