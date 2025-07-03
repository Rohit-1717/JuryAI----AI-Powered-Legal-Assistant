import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0ecf8] to-[#ffffff] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        {/* Logo / Emoji */}
        <div className="flex justify-center items-center mb-6">
          <div className="text-5xl md:text-6xl">⚖️</div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          JuryAI
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Your AI-Powered Legal Assistant is on the way...
        </p>

        {/* Coming Soon Badge */}
        <div className="badge badge-primary text-base py-4 px-6 rounded-full shadow-md mb-8">
          🚀 JuryAI is Coming Soon...
        </div>

        {/* Optional: Email Notification or Contact */}
        <div className="flex flex-col gap-4 items-center">
          <div className="btn btn-outline btn-success rounded-md px-6 py-4">
            Stay tuned for our launch!
          </div>
        </div>
      </div>
    </div>
  );
}
