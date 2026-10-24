import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Download,
  Share2,
  X,
  Maximize2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Video,
  CheckCircle2,
  Activity,
  Layers,
  Building2,
  ShieldCheck,
  Clock,
  Award
} from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: "MediQueue: Healthcare Simplified",
    subtitle: "Smart India Hackathon 2024 • Transforming Outpatient Department Queues",
    image: "/images/mediqueue_pitch_banner.jpg",
    badge: "🏆 Hackathon Presentation Pitch",
    duration: 12,
    script: "Welcome to MediQueue. A revolutionary digital healthcare queue management system designed to eliminate agonizing hospital waiting times for one point four billion Indian citizens.",
    bulletPoints: [
      "Inspired by the speed and simplicity of Groww",
      "Unified National Health Authority (ABHA / ABDM) Integration",
      "Real-time token positions and live queue telemetry"
    ]
  },
  {
    id: 2,
    title: "The Crisis: 4 to 6 Hours Wasted in OPD Queues",
    subtitle: "Over 2.5 million patients visit Indian OPDs daily with zero queue transparency",
    image: "/images/mediqueue_problem_solution.jpg",
    badge: "⚠️ The Critical Problem",
    duration: 14,
    script: "In Indian hospitals today, patients wake up at five a.m., travel hundreds of kilometers, and wait four to six hours in crowded, chaotic waiting halls. Crowding creates frustration, overburdens doctors, and fuels hospital-acquired infections.",
    bulletPoints: [
      "70% of patient hospital time is lost purely standing in lines",
      "Zero visibility into doctor consultation delays",
      "Overwhelmed reception staff dealing with manual paperwork"
    ]
  },
  {
    id: 3,
    title: "The Solution: Real-Time Live Token Telemetry",
    subtitle: "Track your doctor, your token, and wait time from home",
    image: "/images/mediqueue_pitch_banner.jpg",
    badge: "💡 The Innovation",
    duration: 13,
    script: "MediQueue solves this with live token queues. Patients book an instant token, monitor exactly how many patients are ahead of them from their phone, and arrive just ten minutes before their turn.",
    bulletPoints: [
      "Live token tracker: 'Now Serving A-19 • Your Token A-24 • 15 Mins Wait'",
      "Automated SMS and WhatsApp alerts when 3 patients remain",
      "Dynamic clinical triage prioritizing emergency acute cases"
    ]
  },
  {
    id: 4,
    title: "40,000+ Hospitals & Free Govt OPD Nationwide",
    subtitle: "Connected directly to OpenStreetMap India and National Health Facility Registry",
    image: "/images/mediqueue_architecture.jpg",
    badge: "🇮🇳 All India Coverage",
    duration: 15,
    script: "MediQueue maps over forty thousand hospitals across all twenty-eight Indian states and eight Union Territories. From apex institutes like AIIMS and PGIMER to rural Primary Health Centres, every citizen can access free government OPD consultations with zero cost.",
    bulletPoints: [
      "Real-time GPS routing to nearest available hospital",
      "78+ Premier State Medical Colleges and AIIMS institutes",
      "₹0 Free OPD token booking under Ayushman Bharat PM-JAY"
    ]
  },
  {
    id: 5,
    title: "Dual-Sided Portal: Patients & Receptionists",
    subtitle: "A seamless operational command center for front-desk hospital staff",
    image: "/images/mediqueue_architecture.jpg",
    badge: "⚙️ Complete Operations",
    duration: 14,
    script: "For hospital administration, MediQueue provides a comprehensive counter dashboard. Receptionists can call next tokens with one tap, register walk-in patients, manage doctor OPD queues, and track daily counter cash and digital UPI collections.",
    bulletPoints: [
      "One-tap counter token calling with automated chime audio",
      "Walk-in patient check-in with emergency priority triage",
      "Real-time revenue and daily footfall analytics"
    ]
  },
  {
    id: 6,
    title: "Digital India Vision: Ready to Scale Nationwide",
    subtitle: "DPDP Act 2023 Compliant • Microservices Architecture • 100% Impact",
    image: "/images/mediqueue_pitch_banner.jpg",
    badge: "🚀 Future Roadmap",
    duration: 12,
    script: "MediQueue is fully compliant with the Digital Personal Data Protection Act of 2023 and the Ayushman Bharat Digital Mission. It is ready for nationwide deployment to make Indian healthcare accessible, dignified, and queue-free. Thank you, respected judges.",
    bulletPoints: [
      "Encrypted under DPDP Act 2023 & NHA Security Guidelines",
      "Zero app download required: Progressive Responsive Web Architecture",
      "Ready for Smart India Hackathon Grand Finale Implementation"
    ]
  }
];

export default function AiVideoPitchModal({ isOpen, onClose }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState(null);

  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const speechUtteranceRef = useRef(null);

  const currentSlide = SLIDES[currentSlideIndex];

  // Voice narration helper
  const speakCurrentSlide = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isMuted) return;

    const textToSpeak = currentSlide.script;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    speechUtteranceRef.current = utterance;

    // Try finding Indian English or friendly clear voice
    const voices = window.speechSynthesis.getVoices();
    const indVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('hi') || v.name.includes('India')) ||
                     voices.find(v => v.name.includes('Natural') || v.name.includes('Google UK English Female') || v.lang.includes('en'));
    
    if (indVoice) utterance.voice = indVoice;
    utterance.rate = 1.0;
    utterance.pitch = 1.02;

    utterance.onend = () => {
      // If playing, auto-advance to next slide after speaking
      if (isPlaying) {
        setTimeout(() => {
          handleNextSlide();
        }, 1200);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Handle slide change
  useEffect(() => {
    setProgress(0);
    if (isPlaying && isOpen) {
      speakCurrentSlide();
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentSlideIndex, isPlaying, isOpen, isMuted]);

  // Slide progress bar timer
  useEffect(() => {
    let interval = null;
    if (isPlaying && isOpen) {
      const stepMs = 100;
      const totalMs = currentSlide.duration * 1000;
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + (stepMs / totalMs) * 100;
          if (next >= 100) {
            return 100;
          }
          return next;
        });
      }, stepMs);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen, currentSlideIndex]);

  const handleNextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setProgress(100);
      if (isRecording) {
        stopRecording();
      }
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else {
      setIsPlaying(true);
      if (progress >= 100 && currentSlideIndex === SLIDES.length - 1) {
        setCurrentSlideIndex(0);
      }
    }
  };

  const handleRestart = () => {
    setCurrentSlideIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (next && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      } else if (!next && isPlaying) {
        speakCurrentSlide();
      }
      return next;
    });
  };

  // In-browser Canvas Video Recording
  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      alert("Canvas video recorder initializing. Please try again in 2 seconds.");
      return;
    }

    try {
      const stream = canvas.captureStream(30); // 30 FPS stream
      const options = { mimeType: 'video/webm;codecs=vp9' };
      let mediaRecorder;

      try {
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e) {
        mediaRecorder = new MediaRecorder(stream);
      }

      recordedChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedBlobUrl(url);

        // Auto download
        const a = document.createElement('a');
        a.href = url;
        a.download = `MediQueue_Hackathon_AI_Video_Pitch.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      mediaRecorder.start(250);
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);

      // Start presentation from beginning
      handleRestart();
    } catch (err) {
      console.error("Recording error:", err);
      alert("Browser video recording started. If download doesn't trigger automatically, use Chrome or Edge for full WebM support.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Continuous Canvas Drawing for Recording & Crisp Video Output
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    const img = new Image();
    img.src = currentSlide.image;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Dark background
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, width, height);

      // Draw presentation image
      if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, 0, 0, width, height);
      }

      // Dark gradient overlay on bottom for text readability
      const gradient = ctx.createLinearGradient(0, height * 0.4, 0, height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.85)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Top Title Bar
      ctx.fillStyle = '#00D09C';
      ctx.font = 'bold 32px Inter, sans-serif';
      ctx.fillText(currentSlide.badge, 60, 70);

      // Slide Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px Inter, sans-serif';
      ctx.fillText(currentSlide.title, 60, height - 200);

      // Slide Subtitle / Narration caption
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '24px Inter, sans-serif';
      ctx.fillText(currentSlide.subtitle, 60, height - 150);

      // Sub narration box
      ctx.fillStyle = 'rgba(0, 208, 156, 0.15)';
      ctx.fillRect(60, height - 120, width - 120, 70);
      ctx.strokeStyle = '#00D09C';
      ctx.lineWidth = 2;
      ctx.strokeRect(60, height - 120, width - 120, 70);

      ctx.fillStyle = '#00D09C';
      ctx.font = 'italic 20px Inter, sans-serif';
      ctx.fillText(`🎙️ AI Narration: "${currentSlide.script.slice(0, 95)}..."`, 80, height - 76);

      // Progress bar at very bottom
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(0, height - 10, width, 10);
      ctx.fillStyle = '#00D09C';
      ctx.fillRect(0, height - 10, (width * progress) / 100, 10);

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrame);
  }, [currentSlide, progress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-4xl bg-[#0F172A] text-white rounded-3xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden max-h-[96vh]">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00D09C] to-[#5367FF] flex items-center justify-center shadow-lg">
              <Video className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  MediQueue • Hackathon AI Video Pitch
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#00D09C]/20 text-[#00D09C] border border-[#00D09C]/40">
                  AI Narrated
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Automated 2-minute pitch presentation for Hackathon Judges
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Record / Download Video Button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-[#00D09C] text-slate-950 hover:bg-[#00B386]'
              }`}
              title="Record and export real video file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isRecording ? "Stop & Save Video" : "Download Video (.webm)"}</span>
            </button>

            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsPlaying(false);
                onClose();
              }}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Container (16:9 Aspect Ratio) */}
        <div className="relative bg-black flex items-center justify-center overflow-hidden aspect-video max-h-[58vh]">
          {/* Hidden Canvas for High-Res Recording */}
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="hidden"
          />

          {/* Slide Visual Display */}
          <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 overflow-hidden select-none">
            {/* Background Presentation Image */}
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-700 scale-100 hover:scale-105"
            />

            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            {/* Slide Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-[#00D09C]/40 text-[#00D09C] text-xs font-bold shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentSlide.badge}</span>
              </span>

              <span className="text-xs font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                Scene {currentSlideIndex + 1} of {SLIDES.length}
              </span>
            </div>

            {/* Slide Bottom Text Overlays */}
            <div className="relative z-10 space-y-3">
              <div>
                <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {currentSlide.title}
                </h1>
                <p className="text-xs sm:text-base text-slate-300 mt-1 drop-shadow">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentSlide.bulletPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 text-[11px] sm:text-xs text-slate-200 flex items-center space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00D09C] flex-shrink-0" />
                    <span className="line-clamp-2">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Live AI Narration Subtitle Box */}
              <div className="p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-[#00D09C]/50 flex items-center space-x-3 shadow-xl">
                <div className="w-7 h-7 rounded-lg bg-[#00D09C]/20 border border-[#00D09C] flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-[#00D09C] animate-pulse" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold text-[#00D09C] tracking-wider block">
                    AI Voiceover Script (Synchronized Speech):
                  </span>
                  <p className="text-xs text-slate-200 italic line-clamp-2">
                    "{currentSlide.script}"
                  </p>
                </div>
                {isPlaying && (
                  <div className="flex items-center space-x-0.5">
                    <span className="w-1 h-3 bg-[#00D09C] rounded-full animate-bounce" />
                    <span className="w-1 h-5 bg-[#00D09C] rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1 h-2 bg-[#00D09C] rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Central Play Overlay Button if paused */}
          {!isPlaying && (
            <button
              onClick={handlePlayPause}
              className="absolute z-20 w-16 h-16 rounded-full bg-[#00D09C] text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          )}
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="p-4 bg-slate-900 space-y-3 border-t border-slate-800">
          
          {/* Progress Bar & Scene Dots */}
          <div className="space-y-1.5">
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative cursor-pointer">
              <div
                className="h-full bg-gradient-to-r from-[#00D09C] to-emerald-400 rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <div className="flex items-center space-x-1">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setCurrentSlideIndex(idx);
                      setProgress(0);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentSlideIndex
                        ? 'w-6 bg-[#00D09C]'
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`Jump to Scene ${idx + 1}`}
                  />
                ))}
              </div>
              <span>
                Slide {currentSlideIndex + 1} / {SLIDES.length} ({currentSlide.duration}s)
              </span>
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Play / Pause */}
              <button
                onClick={handlePlayPause}
                className="p-2.5 rounded-xl bg-white text-slate-950 hover:bg-[#00D09C] transition-all font-bold shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              {/* Prev / Next */}
              <button
                onClick={handlePrevSlide}
                disabled={currentSlideIndex === 0}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextSlide}
                disabled={currentSlideIndex === SLIDES.length - 1}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Restart */}
              <button
                onClick={handleRestart}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
                title="Restart presentation from beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Mute / Unmute Voiceover */}
              <button
                onClick={toggleMute}
                className={`p-2 rounded-xl border transition-all ${
                  isMuted
                    ? 'border-rose-500/50 bg-rose-950/40 text-rose-400'
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title={isMuted ? "Unmute AI Voiceover" : "Mute AI Voiceover"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Quick Demo Jump Pills for Judges */}
            <div className="hidden sm:flex items-center space-x-1.5 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold">Jump to:</span>
              <button
                onClick={() => setCurrentSlideIndex(1)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px]"
              >
                The Crisis
              </button>
              <button
                onClick={() => setCurrentSlideIndex(2)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px]"
              >
                Live Token
              </button>
              <button
                onClick={() => setCurrentSlideIndex(3)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px]"
              >
                40k Hospitals
              </button>
              <button
                onClick={() => setCurrentSlideIndex(4)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px]"
              >
                Counter Kiosk
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
