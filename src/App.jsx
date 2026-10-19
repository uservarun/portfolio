import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative transition-colors duration-200">
        {/* Whole-Page Dotted Background (Requested by user) */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 bg-dots opacity-[0.35] dark:opacity-[0.22]"
          aria-hidden="true"
        />

        {/* Content Layer */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
