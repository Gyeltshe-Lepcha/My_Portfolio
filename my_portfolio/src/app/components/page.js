import Navbar from "./navbar/navbar";
import HomePage from "./home/home";
import Services from "./service/services";
import AboutMe from "./about_me/about_me";
import Projects from "./project/projects";
import Education from "./education/education";
import Gallery from "./gallery/gallery";
import Contact from "./contact/contact";

export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HomePage />

      {/*services*/}
      <Services/>

      {/*About me */}
      <AboutMe/>

      {/*Projects */}
      <Projects/>

      {/*Education Journey */}
      <Education/>

      {/*My Ghallery */}
      <Gallery/>

      {/*Contact */}
      <Contact/>
    </main>
  );
}
