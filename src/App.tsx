import { MotionConfig } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SpotlightSection from "./components/Spotlight";
import Footer from "./components/Footer";
import MobileOrderBar from "./components/MobileOrderBar";
import About from "./sections/About";
import MeetTheArchitect from "./sections/MeetTheArchitect";
import Menu from "./sections/Menu";
import Occasions from "./sections/Occasions";
import Gallery from "./sections/Gallery";
import OrderProcess from "./sections/OrderProcess";
import WhyChoose from "./sections/WhyChoose";
import QuoteCTA from "./sections/QuoteCTA";
import Social from "./sections/Social";

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
        <About />
        <MeetTheArchitect />
        <Menu />
        <Occasions />
        <OrderProcess />
        <WhyChoose />
        <QuoteCTA />
        <Social />
      </main>
      <Footer />
      <MobileOrderBar />
    </MotionConfig>
  );
}
