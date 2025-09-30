import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Statistics from "./components/Statistics";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ContactPage from "./components/ContactPage";

// مكون الصفحة الرئيسية
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <HowItWorks />
      <Footer />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
