import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  Sprout, ArrowRight, ShieldCheck, Sparkles, IndianRupee,
  Users, CheckCircle2, Eye, Compass, Sunrise, Camera
} from 'lucide-react';
import './JanasevaHero.css';

/* ═══════════════════════════════════════════════════════════════
   JANASEVA AI — 8K 3D ROTATING CINEMATIC AGRICULTURAL ENVIRONMENT
   Features 8K Imagery with Real-Time 3D Cursor Tilt & Rotation,
   Wing-Flapping Birds, Wind-Swept Crops, and Camera Preset Angles
   ═══════════════════════════════════════════════════════════════ */

// 8K Ultra-High-Resolution Agricultural Photography Presets
const CAMERA_PRESETS = [
  {
    id: 'paddy',
    label: 'Sunrise Paddy Terraces',
    icon: Sunrise,
    image8k: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=3840&q=95',
    subtext: 'Photorealistic Indian Rice Terraces & Dawn Golden Hour',
  },
  {
    id: 'wheat',
    label: 'Golden Wheat Harvest',
    icon: Compass,
    image8k: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=3840&q=95',
    subtext: 'Golden Wheat Spikelets & Sunlit Horizon',
  },
  {
    id: 'valley',
    label: 'Highland Valleys & Mist',
    icon: Camera,
    image8k: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=3840&q=95',
    subtext: 'Lush Emerald Agriculture & Atmospheric Mountain Mist',
  },
];

// Vector Articulated Bird with 3D Wing Flapping
function KineticBird({ className, size = 26, color = '#0f172a' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.54}
      viewBox="0 0 50 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="wing-flap wing-flap--left"
        d="M25 15 C21 10, 11 3, 2 2 C7 8, 15 13, 25 15Z"
        fill={color}
        opacity="0.92"
      />
      <path
        className="wing-flap wing-flap--right"
        d="M25 15 C29 10, 39 3, 48 2 C43 8, 35 13, 25 15Z"
        fill={color}
        opacity="0.92"
      />
      <ellipse cx="25" cy="15" rx="3.6" ry="2.3" fill={color} opacity="0.96" />
      <path d="M22 16 L18 23 L25 17Z" fill={color} opacity="0.85" />
    </svg>
  );
}

// Stalk of Wheat with Golden Awns & Breeze Action
function SwayingWheatStalk({ x, height, delay = 0 }) {
  const style = {
    animationDelay: `${delay}s`,
    animationDuration: `${3.6 + Math.random() * 2}s`,
  };

  return (
    <g className="stalk-breeze" style={style} transform={`translate(${x}, 0)`}>
      <line
        x1="0" y1="0" x2="0" y2={-height}
        stroke="#15803d"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d={`M0 ${-height * 0.35} Q${10} ${-height * 0.45}, ${16} ${-height * 0.28}`}
        fill="none"
        stroke="#22c55e"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d={`M0 ${-height * 0.6} Q${-9} ${-height * 0.72}, ${-15} ${-height * 0.5}`}
        fill="none"
        stroke="#4ade80"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Grain Spikelet */}
      <g transform={`translate(0, ${-height})`}>
        <ellipse cx="0" cy="-4" rx="3.5" ry="8" fill="#FBBF24" opacity="0.95" />
        <line x1="-2" y1="-10" x2="-7" y2="-18" stroke="#D97706" strokeWidth="0.9" />
        <line x1="0" y1="-12" x2="0" y2="-21" stroke="#D97706" strokeWidth="0.9" />
        <line x1="2" y1="-10" x2="7" y2="-18" stroke="#D97706" strokeWidth="0.9" />
      </g>
    </g>
  );
}

// Macro Botanical Leaf with Visible Lateral Veins
function MacroBotanicalLeaf({ x, y, scale = 1, rotation = 0, delay = 0 }) {
  return (
    <g
      className="macro-leaf-breeze"
      transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}
      style={{ animationDelay: `${delay}s` }}
    >
      <path
        d="M0 0 Q20 -28 7 -60 Q-3 -42 -12 -20Z"
        fill="url(#macroLeafGlowGrad)"
        opacity="0.92"
        filter="drop-shadow(0 6px 14px rgba(0,0,0,0.6))"
      />
      {/* Midrib */}
      <path d="M0 0 Q7 -22 5 -52" fill="none" stroke="#064e3b" strokeWidth="1.4" opacity="0.8" />
      {/* Veins */}
      <path d="M2 -14 L11 -20" fill="none" stroke="#064e3b" strokeWidth="0.8" opacity="0.55" />
      <path d="M1 -26 L10 -33" fill="none" stroke="#064e3b" strokeWidth="0.8" opacity="0.55" />
      <path d="M3 -18 L-6 -23" fill="none" stroke="#064e3b" strokeWidth="0.8" opacity="0.55" />
      <path d="M4 -32 L-5 -38" fill="none" stroke="#064e3b" strokeWidth="0.8" opacity="0.55" />
      {/* Sunlit Rim */}
      <path d="M0 0 Q20 -28 7 -60" fill="none" stroke="rgba(253, 230, 138, 0.65)" strokeWidth="0.8" />
    </g>
  );
}

export default function JanasevaHero({ onOpenEligibility, onExploreSchemes }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const backdropRef = useRef(null);
  const foregroundRef = useRef(null);
  const cropsRef = useRef(null);
  const animFrame = useRef(null);

  const [activePreset, setActivePreset] = useState(CAMERA_PRESETS[0]);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Normalized mouse coords [-1.0 to 1.0]
  const mouseCoord = useRef({ x: 0, y: 0 });
  const smoothCoord = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Normalize from -1.0 to +1.0
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    mouseCoord.current = {
      x: Math.max(-1, Math.min(1, nx)),
      y: Math.max(-1, Math.min(1, ny)),
    };
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    mouseCoord.current = { x: 0, y: 0 };
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (reducedMotion) return;
    const touch = e.touches[0];
    if (!touch) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const nx = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((touch.clientY - rect.top) / rect.height) * 2 - 1;

    mouseCoord.current = {
      x: Math.max(-1, Math.min(1, nx)),
      y: Math.max(-1, Math.min(1, ny)),
    };
  }, [reducedMotion]);

  // Real-time 3D Rotation Animation Loop
  useEffect(() => {
    if (reducedMotion) return;

    const LERP_SPEED = 0.055;
    const lerp = (a, b, t) => a + (b - a) * t;

    function render3D() {
      smoothCoord.current.x = lerp(smoothCoord.current.x, mouseCoord.current.x, LERP_SPEED);
      smoothCoord.current.y = lerp(smoothCoord.current.y, mouseCoord.current.y, LERP_SPEED);

      const sx = smoothCoord.current.x;
      const sy = smoothCoord.current.y;

      // 3D Rotation angles:
      // X-tilt rotates when mouse moves up/down (rotateX)
      // Y-tilt rotates when mouse moves left/right (rotateY)
      const rotX = -sy * 5.5; // Up to ±5.5 degrees
      const rotY = sx * 7.0;  // Up to ±7.0 degrees

      if (stageRef.current) {
        stageRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      // Parallax translation for the 8K backdrop
      if (backdropRef.current) {
        backdropRef.current.style.transform = `translateZ(-60px) scale(1.12) translate(${sx * 20}px, ${sy * 14}px)`;
      }

      // Midground crops
      if (cropsRef.current) {
        cropsRef.current.style.transform = `translateZ(25px) scale(1.03) translate(${sx * 30}px, ${sy * 20}px)`;
      }

      // Opposing foreground macro leaves
      if (foregroundRef.current) {
        foregroundRef.current.style.transform = `translateZ(80px) scale(1.05) translate(${-sx * 22}px, ${-sy * 15}px)`;
      }

      animFrame.current = requestAnimationFrame(render3D);
    }

    animFrame.current = requestAnimationFrame(render3D);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [reducedMotion]);

  // Flock of 5 natural birds
  const flockBirds = useMemo(() => [
    { id: 'fb1', x: '60%', y: '15%', size: 30, cls: 'bird--traj-1', color: '#09131e' },
    { id: 'fb2', x: '68%', y: '19%', size: 23, cls: 'bird--traj-2', color: '#132130' },
    { id: 'fb3', x: '64%', y: '22%', size: 19, cls: 'bird--traj-3', color: '#09131e' },
    { id: 'fb4', x: '73%', y: '13%', size: 15, cls: 'bird--traj-4', color: '#1a2e42' },
    { id: 'fb5', x: '55%', y: '20%', size: 14, cls: 'bird--traj-5', color: '#132130' },
  ], []);

  // Midground crop stalks
  const wheatFieldStalks = useMemo(() => {
    return Array.from({ length: 38 }, (_, i) => ({
      key: i,
      x: 10 + i * 28 + (Math.random() * 8 - 4),
      height: 48 + Math.random() * 30,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <section
      ref={containerRef}
      className="janaseva-hero-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      role="banner"
      aria-label="Janaseva AI — 8K 3D Interactive Government Platform"
    >
      {/* ─── Shared Botanical Gradient ─── */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="macroLeafGlowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15803d" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#044e3b" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* ─── 3D ROTATING VIEWPORT STAGE ─── */}
      <div ref={stageRef} className="hero-3d-stage">
        {/* Plane 1: 8K High-Definition Panoramic Backdrop Canvas */}
        <div
          ref={backdropRef}
          className="hero-8k-backdrop"
          style={{ backgroundImage: `url('${activePreset.image8k}')` }}
        />

        {/* Plane 2: Volumetric Golden Sunray & Atmospheric Mist */}
        <div className="sunburst-ray" />
        <div className="luminous-mist" />

        {/* Plane 3: Articulated Flying Flock of Birds */}
        <div className="bird-flock-stage">
          {flockBirds.map((b) => (
            <div
              key={b.id}
              className={`bird-flight ${b.cls}`}
              style={{ left: b.x, top: b.y }}
            >
              <KineticBird size={b.size} color={b.color} />
            </div>
          ))}
        </div>

        {/* Plane 4: Swaying Midground Wheat/Rice Crops */}
        <div ref={cropsRef} className="depth-plane depth-plane--crops">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1100 500"
            preserveAspectRatio="xMidYMax slice"
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '48%' }}
          >
            {wheatFieldStalks.map((s) => (
              <SwayingWheatStalk key={s.key} x={s.x} height={s.height} delay={s.delay} />
            ))}
          </svg>
        </div>

        {/* Plane 5: Foreground Macro Botanical Foliage (Opposing Parallax) */}
        <div ref={foregroundRef} className="depth-plane depth-plane--foreground">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 650 450"
            preserveAspectRatio="xMinYMax slice"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '42%', height: '54%' }}
          >
            <MacroBotanicalLeaf x={35} y={420} scale={2.7} rotation={-12} delay={0} />
            <MacroBotanicalLeaf x={105} y={435} scale={2.2} rotation={5} delay={0.35} />
            <MacroBotanicalLeaf x={185} y={425} scale={1.9} rotation={-6} delay={0.75} />
            <MacroBotanicalLeaf x={255} y={420} scale={2.4} rotation={8} delay={0.5} />
            <MacroBotanicalLeaf x={345} y={435} scale={1.6} rotation={-14} delay={1.1} />
          </svg>

          <svg
            width="100%"
            height="100%"
            viewBox="0 0 450 450"
            preserveAspectRatio="xMaxYMax slice"
            style={{ position: 'absolute', bottom: 0, right: 0, width: '32%', height: '46%', filter: 'blur(3.5px)', opacity: 0.68 }}
          >
            <MacroBotanicalLeaf x={110} y={420} scale={3.2} rotation={16} delay={0.4} />
            <MacroBotanicalLeaf x={220} y={430} scale={2.7} rotation={-8} delay={0.9} />
            <MacroBotanicalLeaf x={325} y={425} scale={3.0} rotation={14} delay={0.25} />
          </svg>
        </div>

        {/* Plane 6: Floating Gold Pollen & Ambient Particles */}
        <div className="particle-stage">
          {Array.from({ length: 24 }, (_, idx) => (
            <div
              key={idx}
              className={`gold-particle ${idx % 3 === 0 ? 'gold-particle--dust' : ''}`}
              style={{
                left: `${4 + (idx * 4.2) % 92}%`,
                top: `${10 + (idx * 7.5) % 75}%`,
                width: `${2 + (idx % 3) * 1.4}px`,
                height: `${2 + (idx % 3) * 1.4}px`,
                animationDuration: `${7 + (idx % 6) * 1.8}s`,
                animationDelay: `${(idx % 5) * 1.2}s`,
                '--dx': `${-30 + (idx % 8) * 12}px`,
                '--dy': `${-70 - (idx % 6) * 16}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Streaming Grade Vignette & Contrast Overlays ─── */}
      <div className="hero-overlay hero-overlay--vignette" />
      <div className="hero-overlay hero-overlay--left-shadow" />
      <div className="hero-overlay hero-overlay--bottom-blend" />

      {/* ─── Left Headline & Content Layer ─── */}
      <div className="hero-content-layer">
        {/* Animated Badge Pill */}
        <div className="hero-badge-pill">
          <span className="hero-pill-ping" />
          <Sprout style={{ width: 14, height: 14 }} />
          National Benefits & Agricultural Welfare Mission
        </div>

        {/* Big Headline */}
        <h1 className="hero-headline-title">
          <span className="hero-gold-text">JANASEVA</span> AI
        </h1>

        {/* Tagline */}
        <p className="hero-subquote">
          "Government Benefits. Within Your Reach."
        </p>

        {/* Supporting Copy */}
        <p className="hero-paragraph-copy">
          Discover government schemes, farmer loans, agricultural subsidies,
          scholarships and citizen services in Telugu and English.
        </p>

        {/* Action Buttons */}
        <div className="hero-btn-row">
          <button
            onClick={onExploreSchemes}
            className="hero-prime-btn"
          >
            <Sparkles style={{ width: 17, height: 17 }} />
            Explore Government Schemes
            <ArrowRight style={{ width: 17, height: 17 }} />
          </button>

          <button
            onClick={onOpenEligibility}
            className="hero-glass-btn"
          >
            <ShieldCheck style={{ width: 17, height: 17 }} />
            Check My Eligibility
          </button>
        </div>

        {/* Streaming Platform Metric Indicators */}
        <div className="flex flex-wrap gap-8 sm:gap-12 mt-12 pt-6 border-t border-slate-200">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono block">
              2,500+
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Central & State Schemes
            </span>
          </div>

          <div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono block">
              ₹1.2L Cr+
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Direct DBT Disbursed
            </span>
          </div>

          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono block">
              12.4M+
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Citizens Empowered
            </span>
          </div>
        </div>
      </div>

      {/* ─── 8K Panoramic Camera Preset Switcher Bar ─── */}
      <div className="camera-switcher-bar">
        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 px-2 font-bold flex items-center gap-1">
          <Camera className="w-3.5 h-3.5" /> 8K Viewport:
        </span>
        {CAMERA_PRESETS.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => setActivePreset(p)}
              className={`camera-preset-btn flex items-center gap-1.5 ${
                activePreset.id === p.id ? 'active' : ''
              }`}
              title={p.subtext}
            >
              <Icon className="w-3 h-3" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
