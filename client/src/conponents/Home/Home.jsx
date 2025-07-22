import { FiSend } from "react-icons/fi";
import Navbar from "../Nav/Nav";
import Footer from "../Footer/Footer";
import TypewriterPlaceholder from "../Typewriter/TypewriterPlaceholder"; // Make sure path is correct
import { useState } from "react";

const Home = () => {
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

  const extraTwinklingStars = Array.from({ length: 80 }, (_, i) => (
    <div
      key={i}
      className="absolute rounded-full bg-white opacity-80 animate-twinkle pointer-events-none"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 0.5}px`,
        height: `${Math.random() * 2 + 0.5}px`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${Math.random() * 5 + 3}s`,
      }}
    />
  ));

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Stars Background */}
        <div className="stars"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="absolute inset-0 z-0">{extraTwinklingStars}</div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold max-w-5xl">
            Simplify Legal Jargons with{" "}
            <span className="text-violet-500">JuryAI</span>
          </h1>
          <p className="mt-4 text-gray-300 text-base md:text-lg max-w-xl">
            Let AI simplify legal jargon, provide contract insights, and deliver
            faster legal understanding.
          </p>

          {/* Search Box */}
          <div className="mt-10 w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg px-4 py-3 sm:px-6 flex items-center space-x-2 transition-all">
            <input
              type="text"
              placeholder={typedPlaceholder}
              className="flex-grow bg-transparent text-white placeholder-gray-300 text-sm focus:outline-none"
            />
            <TypewriterPlaceholder onUpdate={setTypedPlaceholder} />
            <button className="btn btn-sm btn-circle bg-violet-500 hover:bg-[#4f2a9c] border-none text-white transition">
              <FiSend size={18} />
            </button>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center text-sm text-gray-300">
            {[
              "⚖️ Case Summarization",
              "📜 Contract Simplification",
              "🧠 Legal AI Assistant",
              "🔍 Law Query Answering",
            ].map((tag, i) => (
              <button
                key={i}
                className="btn btn-xs lg:btn-sm bg-white/10 border-none backdrop-blur-md hover:bg-white/20 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
