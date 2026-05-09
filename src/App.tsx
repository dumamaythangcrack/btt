/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plane, 
  Palmtree, 
  MapPin, 
  Heart, 
  Star,
  Wind,
  Volume2,
  VolumeX,
  Sparkles,
  Utensils
} from 'lucide-react';

// --- Constants ---

const SLIDES = [
  {
    id: 1,
    title: "My Favourite Country",
    subtitle: "Japan",
    type: "hero",
    bg: "radial-gradient(circle at 50% 50%, #fff0f5 0%, #ffd1dc 100%)",
    accent: "#ff8da1"
  },
  {
    id: 2,
    mainIdea: "Beautiful Country",
    keywords: ["Asia", "Beautiful", "Interesting"],
    type: "feature",
    bg: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
    accent: "#0ea5e9",
    icon: <MapPin className="w-16 h-16" />
  },
  {
    id: 3,
    mainIdea: "Delicious Food",
    keywords: ["Sushi", "Ramen", "Tasty"],
    type: "food",
    bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
    accent: "#d97706",
    icon: <Utensils className="w-16 h-16" />
  },
  {
    id: 4,
    mainIdea: "Famous Places",
    keywords: ["Tokyo", "Mount Fuji", "Modern City"],
    type: "places",
    bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    accent: "#0284c7",
    icon: <Palmtree className="w-16 h-16" />
  },
  {
    id: 5,
    mainIdea: "Culture & Entertainment",
    keywords: ["Anime", "Music", "Friendly People"],
    type: "culture",
    bg: "linear-gradient(135deg, #f5f3ff 0%, #ddd6fe 100%)",
    accent: "#7c3aed",
    icon: <Sparkles className="w-16 h-16" />
  },
  {
    id: 6,
    mainIdea: "My Dream",
    keywords: ["Visit Japan", "Family", "Friends"],
    type: "dream",
    bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    accent: "#a5b4fc",
    icon: <Plane className="w-16 h-16" />
  },
  {
    id: 7,
    mainIdea: "Conclusion",
    text: "Japan is beautiful, modern, and interesting.",
    closing: "Thank You!",
    type: "ending",
    bg: "radial-gradient(circle at 50% 50%, #111 0%, #000 100%)",
    accent: "#ffb7c5"
  }
];

// --- Sub-components ---

const SakuraPetal = ({ delay, ...props }: { delay: number, [key: string]: any }) => {
  const [randomX] = useState(Math.random() * 100);
  const [randomDuration] = useState(10 + Math.random() * 15);
  const [randomRotation] = useState(Math.random() * 360);

  return (
    <motion.div
      {...props}
      className="sakura-petal fixed pointer-events-none"
      initial={{ top: -20, left: `${randomX}%`, opacity: 0, rotate: randomRotation }}
      animate={{ 
        top: '110%', 
        left: `${randomX + (Math.random() * 20 - 10)}%`,
        rotate: randomRotation + 720,
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: randomDuration, 
        delay: delay, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      style={{ width: 15, height: 10 }}
    />
  );
};

const FujiDecor = ({ color }: { color: string }) => (
  <svg viewBox="0 0 1000 400" className="absolute bottom-0 w-full opacity-30 select-none pointer-events-none">
    <path d="M0 400 L400 100 L500 130 L600 50 L1000 400 Z" fill={color} />
    <path d="M400 100 L430 120 L470 125 L500 130 L450 110 Z" fill="white" />
    <path d="M600 50 L630 80 L585 75 Z" fill="white" />
  </svg>
);

const ToriiDecor = ({ color }: { color: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute bottom-10 right-10 w-32 h-32 opacity-20 pointer-events-none"
  >
    <svg viewBox="0 0 100 100">
      <rect x="20" y="20" width="60" height="8" rx="2" fill={color} />
      <rect x="15" y="10" width="70" height="8" rx="2" fill={color} />
      <rect x="30" y="18" width="8" height="82" fill={color} />
      <rect x="62" y="18" width="8" height="82" fill={color} />
      <rect x="25" y="45" width="50" height="6" fill={color} />
    </svg>
  </motion.div>
);

function VisualDecoration({ type, accent }: { type: string, accent: string }) {
  if (type === 'places') {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-full h-32 flex gap-4 p-8 items-end">
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
            <div key={i} className="flex-1 bg-slate-900 transition-all duration-1000" style={{ height: `${scale * 100}%` }} />
          ))}
        </div>
      </div>
    );
  }
  
  if (type === 'food') {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        {[1, 2, 3, 4].map(i => (
          <div 
            key={i} 
            className="absolute rounded-full border-2 border-dashed border-orange-500" 
            style={{ 
              width: i * 100, 
              height: i * 100, 
              top: '50%', 
              left: '50%', 
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)` 
            }} 
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute -inset-10 opacity-10 pointer-events-none">
      <div className="w-full h-full border-2 border-dashed border-slate-400 rounded-full animate-[spin_20s_linear_infinite]" />
    </div>
  );
}

function getEmojiForType(type: string) {
  switch(type) {
    case 'hero': return '🇯🇵';
    case 'feature': return '🌸';
    case 'food': return '🍣';
    case 'places': return '🗼';
    case 'culture': return '🎮';
    case 'dream': return '✈️';
    case 'ending': return '👋';
    default: return '📍';
  }
}

function SlideContent({ slide }: { slide: typeof SLIDES[0] | any }) {
  if (slide.type === 'hero') {
    return (
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-9xl font-display font-bold text-slate-900 tracking-tighter leading-none mb-4">
            My Favourite Country
          </h1>
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-slate-900/20" />
            <h2 className="text-2xl md:text-4xl font-rounded font-bold text-pink-500 uppercase tracking-[0.4em]">
              Japan
            </h2>
            <div className="h-px w-12 bg-slate-900/20" />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 bg-pink-400 blur-3xl opacity-20 -z-10" />
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-red-600 shadow-2xl flex items-center justify-center text-white text-5xl border-4 border-white">
            🇯🇵
          </div>
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'ending') {
    return (
      <div className="text-center space-y-12">
        <div className="space-y-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/60 font-rounded uppercase tracking-[0.3em] text-lg"
          >
            Conclusion
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-display font-bold text-white max-w-2xl mx-auto leading-tight"
          >
            "{slide.text}"
          </motion.h2>
        </div>

        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.6 }}
          className="bg-white text-black py-8 px-16 rounded-[2rem] inline-block shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-pink-500" />
          <h1 className="text-6xl md:text-8xl font-display font-bold">
            {slide.closing}
          </h1>
          <motion.div 
            className="absolute -right-4 -bottom-4 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={80} />
          </motion.div>
        </motion.div>
        
        <div className="flex justify-center gap-8 mt-12 opacity-50">
          <Heart className="text-white fill-white animate-pulse" />
          <Star className="text-white fill-white animate-bounce" />
          <Wind className="text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-8"
      >
        <div className="inline-block p-4 rounded-3xl bg-white shadow-xl text-slate-800" style={{ color: slide.accent }}>
          {slide.icon}
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900">
            {slide.mainIdea}
          </h1>
          <div className="h-2 w-24 bg-current rounded-full" style={{ color: slide.accent }} />
        </div>

        <div className="flex flex-wrap gap-4">
          {slide.keywords.map((kw: string, i: number) => (
            <motion.span
              key={kw}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="px-6 py-3 rounded-2xl bg-white/50 backdrop-blur-md border border-white font-rounded font-bold text-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              # {kw}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="relative aspect-square flex items-center justify-center"
      >
        <div 
          className="absolute inset-0 rounded-[3rem] blur-3xl opacity-20"
          style={{ background: slide.accent }}
        />
        <div className="w-full h-full bg-white/40 backdrop-blur-xl rounded-[4rem] border-2 border-white p-12 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
          <VisualDecoration type={slide.type} accent={slide.accent} />
          <div className="relative text-center space-y-4">
            <span className="text-8xl md:text-[10rem] block animate-bounce">
              {getEmojiForType(slide.type)}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAudioOn, setIsAudioOn] = useState(false);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const current = SLIDES[currentSlide];

  return (
    <div 
      className="relative w-full h-[100dvh] overflow-hidden transition-colors duration-1000"
      style={{ background: current.bg }}
    >
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <SakuraPetal key={i} delay={i * 2} />
        ))}
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
        <FujiDecor color={current.accent} />
        {current.type === 'hero' && <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-red-500/20 blur-3xl animate-pulse" />}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 md:p-12">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 }
            }}
            className="w-full max-w-6xl"
          >
            <SlideContent slide={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-0 w-full px-8 md:px-16 flex items-center justify-between z-20">
        <div className="flex-1 max-w-2xl mx-auto h-1.5 bg-black/10 rounded-full overflow-hidden backdrop-blur-xs hidden md:block">
          <motion.div 
            className="h-full bg-black/60"
            initial={false}
            animate={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
          />
        </div>

        <div className="flex gap-4 items-center ml-auto">
          <button 
            onClick={() => setIsAudioOn(!isAudioOn)}
            className="p-4 rounded-full bg-black/5 backdrop-blur-md border border-black/5 text-slate-800 hover:bg-black/10 transition-all"
            title="Toggle Audio"
          >
            {isAudioOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <span className="font-rounded font-bold text-slate-600 text-sm tracking-widest uppercase bg-white/50 px-4 py-2 rounded-full backdrop-blur-md shadow-sm">
            {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>
      </div>
      
      <ToriiDecor color={current.accent} />
    </div>
  );
}
