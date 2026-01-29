import Navbar from "./navbar/navbar";
import HomePage from "./home/home";
import Services from "./service/services";

export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HomePage />

      {/*services*/}
      <Services/>
    </main>
  );
}
