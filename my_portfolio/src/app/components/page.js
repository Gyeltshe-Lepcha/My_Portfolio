"use client";

import { useRef } from "react";
import Navbar from "./navbar/navbar";
import HomePage from "./home/home";
import Services from "./service/services";
import AboutMe from "./about_me/about_me";
import Projects from "./project/projects";
import Education from "./education/education";
import Gallery from "./gallery/gallery";
import Contact from "./contact/contact";
import AmbientMotion from "./animations/AmbientMotion";
import { useCinematicScrub } from "../hooks/useCinematicScrub";
import { useParallax } from "../hooks/useParallax";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

export default function ComponentsPage({ portfolio }) {
  const pageRef = useRef(null);

  useSmoothScroll();
  useScrollReveal(pageRef);
  useParallax(pageRef);
  useCinematicScrub(pageRef);

  return (
    <main ref={pageRef} className="cinematic-shell min-h-screen overflow-hidden">
      <AmbientMotion />
      <div className="cinematic-vignette" aria-hidden="true" />
      <div className="cinematic-light-leak cinematic-light-leak--top" aria-hidden="true" />
      <div className="cinematic-light-leak cinematic-light-leak--bottom" aria-hidden="true" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HomePage hero={portfolio?.hero} profile={portfolio?.profile} />

      {/*services*/}
      <Services services={portfolio?.services} />

      {/*About me */}
      <AboutMe about={portfolio?.about} />

      {/*Projects */}
      <Projects projects={portfolio?.projects} />

      {/*Education Journey */}
      <Education education={portfolio?.education} />

      {/*My Ghallery */}
      <Gallery gallery={portfolio?.gallery} profile={portfolio?.profile} />

      {/*Contact */}
      <Contact contact={portfolio?.contact} socialLinks={portfolio?.socialLinks} profile={portfolio?.profile} />
    </main>
  );
}
