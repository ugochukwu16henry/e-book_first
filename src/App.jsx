import React, { useState } from 'react';
import { Download, BookOpen, User } from 'lucide-react';
import './App.css';

const modules = [
  { title: 'Chapter 1: The Foundation', desc: 'Understanding the core principles of premarital readiness.' },
  { title: 'Chapter 2: Communication', desc: 'Mastering healthy communication patterns.' },
  { title: 'Chapter 3: Conflict Resolution', desc: 'Tools for resolving disagreements constructively.' },
  { title: 'Chapter 4: Shared Values', desc: 'Identifying and aligning core values.' },
  { title: 'Chapter 5: Commitment', desc: 'Building lasting commitment and trust.' },
];

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate download
  };

  return (
    <div className="min-h-screen bg-white text-[#2E3A8C] flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 pt-16 pb-8 bg-[#2E3A8C] text-white rounded-b-3xl shadow-lg">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Premarital Readiness Blueprint</h1>
          <p className="text-lg md:text-xl mb-6">A modern guide to building a strong foundation for marriage.</p>
          <button
            className="sticky bottom-8 z-50 flex items-center gap-2 bg-white text-[#2E3A8C] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition disabled:opacity-60"
            onClick={handleDownload}
            disabled={loading}
          >
            <Download className="w-5 h-5" />
            {loading ? 'Preparing PDF...' : 'Download PDF'}
          </button>
        </div>
        <div className="flex-1 flex justify-center mt-8 md:mt-0">
          {/* 3D Book Cover Placeholder */}
          <div className="w-48 h-64 bg-gradient-to-br from-[#2E3A8C] to-blue-400 rounded-lg shadow-2xl flex items-center justify-center">
            <BookOpen className="w-20 h-20 text-white opacity-80" />
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      <section className="max-w-3xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Course Modules</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((mod, i) => (
            <div key={i} className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-2 text-[#2E3A8C]">{mod.title}</h3>
              <p className="text-gray-700">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About the Author Section */}
      <section className="max-w-2xl mx-auto mt-20 mb-16 px-4 flex flex-col items-center text-center">
        <User className="w-12 h-12 mb-4 text-[#2E3A8C]" />
        <h2 className="text-xl font-bold mb-2">About the Author</h2>
        <p className="text-gray-700 mb-2">Henry Ugochukwu holds a degree in Marriage and Family Studies and Software Engineering from BYU-Idaho. He is passionate about helping couples build strong, lasting relationships through faith, research, and technology.</p>
      </section>
    </div>
  );
}
