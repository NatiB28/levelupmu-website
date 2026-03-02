/* =============================================================
   LEVELUP - HOME PAGE
   Design: Celestial Glass Citadel
   Sections: Hero, Stats, News, Features, Daily Rewards, Events
   ============================================================= */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import {
  Sword, Shield, Zap, Trophy, Users, Star, Clock, Gift,
  ChevronRight, Play, Download, MessageSquare, Calendar,
  TrendingUp, Award, Target, Flame, Crown, ArrowRight
} from "lucide-react";
import { toast } from "sonner";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395669918/9pfs76ogq3ifCL2XhYksmg/hero-mu-online-epic-MLM7jacyriCvHv4Z6sNs7d.webp";
const CHARACTER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395669918/9pfs76ogq3ifCL2XhYksmg/character-showcase-SorPMDpYQB2jBm7H6cY6uo.webp";

// ===== COUNTER HOOK =====
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

// ===== NEWS DATA =====
const newsItems = [
  {
    id: 1,
    badge: "update",
    badgeLabel: "UPDATE",
    title: "Season 20 Part 2 — Full Launch",
    excerpt: "The complete Season 20 Part 2 content is now live. New maps, new items, and the legendary Illusion Temple rework await you.",
    date: "Mar 01, 2024",
    views: 2847,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
  },
  {
    id: 2,
    badge: "event",
    badgeLabel: "EVENT",
    title: "Blood Castle Season Championship",
    excerpt: "Compete in the grand Blood Castle tournament this weekend. Top 3 players win exclusive Ancient Set items and premium credits.",
    date: "Feb 28, 2024",
    views: 1923,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80",
  },
  {
    id: 3,
    badge: "hot",
    badgeLabel: "HOT",
    title: "Grand Reset System Revamped",
    excerpt: "The Grand Reset system has been completely overhauled with new bonuses, exclusive titles, and special Grand Reset rewards.",
    date: "Feb 25, 2024",
    views: 3156,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80",
  },
];

// ===== FEATURES DATA =====
const features = [
  { icon: Zap, title: "9999x EXP Rate", desc: "Reach max level fast and focus on endgame content, PvP, and competitive play.", color: "#3B82F6" },
  { icon: Shield, title: "Anti-Cheat System", desc: "Advanced protection ensures fair play for all players. Zero tolerance for hacks.", color: "#10B981" },
  { icon: Trophy, title: "Weekly Tournaments", desc: "Compete in Blood Castle, Devil Square, and Chaos Castle for exclusive rewards.", color: "#F59E0B" },
  { icon: Crown, title: "Grand Reset System", desc: "Unique Grand Reset progression with exclusive titles and permanent bonuses.", color: "#A855F7" },
  { icon: Users, title: "Active Community", desc: "1,200+ active players daily. Guilds, alliances, and community events every week.", color: "#EF4444" },
  { icon: Star, title: "Premium Items", desc: "Exclusive LevelUP items, custom wings, and seasonal cosmetics unavailable elsewhere.", color: "#60A5FA" },
];

// ===== DAILY REWARDS =====
const dailyRewards = [
  { day: 1, reward: "500 Credits", icon: "💎", claimed: true },
  { day: 2, reward: "Chaos Jewel x5", icon: "🔮", claimed: true },
  { day: 3, reward: "1000 Credits", icon: "💎", claimed: true },
  { day: 4, reward: "Bless Jewel x10", icon: "✨", claimed: false, today: true },
  { day: 5, reward: "2000 Credits", icon: "💎", claimed: false, locked: true },
  { day: 6, reward: "Ancient Item Box", icon: "📦", claimed: false, locked: true },
  { day: 7, reward: "VIP Wings", icon: "🪽", claimed: false, locked: true },
];

// ===== EVENTS =====
const events = [
  { time: "12:00", name: "Blood Castle", type: "pvp", desc: "Levels 200-400", recurring: "Every 2h" },
  { time: "14:00", name: "Devil Square", type: "pve", desc: "All levels welcome", recurring: "Every 3h" },
  { time: "16:00", name: "Chaos Castle", type: "pvp", desc: "Solo battle royale", recurring: "Every 2h" },
  { time: "18:00", name: "Illusion Temple", type: "special", desc: "Team vs Team", recurring: "Daily" },
  { time: "20:00", name: "Castle Siege", type: "pvp", desc: "Guild war event", recurring: "Weekly" },
  { time: "22:00", name: "Happy Hour", type: "special", desc: "2x EXP & Drop", recurring: "Daily" },
];

// ===== TOP PLAYERS =====
const topPlayers = [
  { rank: 1, name: "DarkLord_X", class: "DL", resets: 87, level: 400 },
  { rank: 2, name: "ShadowMage", class: "SM", resets: 82, level: 400 },
  { rank: 3, name: "BladeKnight", class: "BK", resets: 79, level: 400 },
  { rank: 4, name: "ElvenArcher", class: "ELF", resets: 75, level: 400 },
  { rank: 5, name: "RageFighter", class: "RF", resets: 71, level: 400 },
];

// ===== COUNTDOWN TIMER HOOK =====
function useCountdown(targetDate: Date) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        setTime({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return time;
}

// ===== FEATURED SYSTEMS =====
const systems = [
  { icon: "🔮", title: "Capsule System", desc: "Unlock powerful abilities and passive bonuses through the advanced Capsule system." },
  { icon: "🔄", title: "Reset System", desc: "Endless progression with 50+ resets. Each reset grants permanent stat bonuses." },
  { icon: "💰", title: "Economy", desc: "Dynamic market system with player trading, crafting, and wealth building opportunities." },
  { icon: "⚔️", title: "Endgame Content", desc: "Castle Siege, Illusion Temple, and exclusive Grand Reset dungeons await." },
];

const classColors: Record<string, string> = {
  DL: "#A855F7", SM: "#3B82F6", BK: "#EF4444", ELF: "#10B981",
  RF: "#F59E0B", MG: "#EC4899", SUM: "#8B5CF6", GL: "#F97316",
};

export default function Home() {
  const { count: playerCount, ref: playerRef } = useCounter(1247);
  const { count: accountCount, ref: accountRef } = useCounter(8432);
  const { count: guildCount, ref: guildRef } = useCounter(312);
  const { count: uptimeCount, ref: uptimeRef } = useCounter(99);
  
  // Next event countdown (example: next Blood Castle in 2 hours)
  const nextEventDate = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const countdown = useCountdown(nextEventDate);
  
  // Particle animation effect
  useEffect(() => {
    const canvas = document.getElementById('hero-particles') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: any[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        life: Math.random() * 200 + 100,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p: any, idx: number) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) {
          particles[idx] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            life: Math.random() * 200 + 100,
          };
        }
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity * (p.life / 150)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section-immersive" style={{ height: "100vh", overflow: "hidden" }}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        
        {/* Dark Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(6,13,31,0.85) 0%, rgba(6,13,31,0.7) 50%, rgba(6,13,31,0.6) 100%)",
          }}
        />
        
        {/* Animated Particles Canvas */}
        <canvas
          id="hero-particles"
          className="absolute inset-0 z-5"
          style={{ display: "block" }}
        />
        
        {/* Radial Glow Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Centered Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-4xl animate-fade-in">
            {/* Season Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                animation: "float-up 0.8s ease forwards",
              }}
            >
              <Zap size={14} className="text-blue-400" />
              <span
                className="text-xs font-semibold text-blue-300 uppercase tracking-widest"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Season 20 Part 2 — Now Live
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6"
              style={{
                fontFamily: "'Exo 2', sans-serif",
                animation: "float-up 1s ease forwards 0.1s both",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #93C5FD 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 40px rgba(59,130,246,0.4)",
                  filter: "drop-shadow(0 0 20px rgba(59,130,246,0.3))",
                }}
              >
                LEVELUP
              </span>
            </h1>

            {/* Subtitle */}
            <div
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.15em",
                animation: "float-up 1s ease forwards 0.2s both",
              }}
            >
              MU ONLINE
            </div>
            
            <p
              className="text-sm sm:text-base md:text-lg text-slate-200 mb-10 leading-relaxed max-w-2xl mx-auto px-2"
              style={{
                animation: "float-up 1s ease forwards 0.3s both",
              }}
            >
              Experience the ultimate competitive PvP adventure with 9999x EXP, custom content, weekly tournaments, and a thriving community of elite warriors. Dominate the leaderboards and become a legend.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
              style={{
                animation: "float-up 1s ease forwards 0.4s both",
              }}
            >
              <Link href="/downloads">
                <button
                  className="btn-glow-primary px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold flex items-center justify-center gap-2 sm:gap-3 rounded-lg w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                    border: "2px solid rgba(96,165,250,0.5)",
                    boxShadow: "0 0 30px rgba(59,130,246,0.5), inset 0 0 20px rgba(255,255,255,0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 50px rgba(59,130,246,0.8), inset 0 0 30px rgba(255,255,255,0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(59,130,246,0.5), inset 0 0 20px rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Download size={20} />
                  Download Now
                </button>
              </Link>
              <a href="https://discord.gg/levelup" target="_blank" rel="noopener noreferrer">
                <button
                  className="btn-glow-secondary px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold flex items-center justify-center gap-2 sm:gap-3 rounded-lg w-full sm:w-auto"
                  style={{
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "2px solid rgba(96,165,250,0.6)",
                    color: "#60A5FA",
                    boxShadow: "0 0 20px rgba(59,130,246,0.3), inset 0 0 15px rgba(96,165,250,0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 40px rgba(59,130,246,0.6), inset 0 0 25px rgba(96,165,250,0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(59,130,246,0.3), inset 0 0 15px rgba(96,165,250,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
                  }}
                >
                  <MessageSquare size={20} />
                  Join Discord
                </button>
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ===== STATS BAR ===== */}
      <section
        className="relative z-10 py-8"
        style={{
          background: "rgba(6, 13, 31, 0.95)",
          borderTop: "1px solid rgba(59, 130, 246, 0.15)",
          borderBottom: "1px solid rgba(59, 130, 246, 0.15)",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Players Online", ref: playerRef, count: playerCount, suffix: "", icon: Users, color: "#10B981" },
              { label: "Registered Accounts", ref: accountRef, count: accountCount, suffix: "+", icon: Shield, color: "#3B82F6" },
              { label: "Active Guilds", ref: guildRef, count: guildCount, suffix: "", icon: Crown, color: "#F59E0B" },
              { label: "Uptime", ref: uptimeRef, count: uptimeCount, suffix: "%", icon: Zap, color: "#A855F7" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} ref={stat.ref} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div
                      className="text-2xl font-bold leading-none"
                      style={{ fontFamily: "'Orbitron', monospace", color: stat.color }}
                    >
                      {stat.count.toLocaleString()}{stat.suffix}
                    </div>
                    <div className="text-xs text-slate-500 mt-1" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em" }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== NEWS SECTION ===== */}
      <section className="section-padding">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-subtitle mb-2">Latest Updates</div>
              <h2 className="section-title">News & Announcements</h2>
              <div className="section-divider mt-3" />
            </div>
            <Link href="/forum">
              <button className="btn-secondary-lu text-sm hidden md:flex items-center gap-2">
                View All <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((news, i) => (
              <div
                key={news.id}
                className="news-card cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => toast.info("Full article coming soon")}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(6,13,31,0.9) 0%, transparent 60%)" }}
                  />
                  <span className={`badge-lu badge-${news.badge} absolute top-3 left-3`}>
                    {news.badgeLabel}
                  </span>
                </div>
                <div className="p-5">
                  <h3
                    className="text-white font-bold text-lg mb-2 leading-tight"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {news.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{news.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{news.date}</span>
                    <span>{news.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section
        className="section-padding"
        style={{
          background: "rgba(4, 9, 20, 0.6)",
          borderTop: "1px solid rgba(59, 130, 246, 0.08)",
          borderBottom: "1px solid rgba(59, 130, 246, 0.08)",
        }}
      >
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-subtitle mb-2">Why LevelUP?</div>
            <h2 className="section-title">Server Features</h2>
            <div className="section-divider mt-3 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="glass-card p-6">
                  <div className="feature-icon-wrap mb-4" style={{ borderColor: `${feat.color}30`, background: `${feat.color}10` }}>
                    <Icon size={24} style={{ color: feat.color }} />
                  </div>
                  <h3
                    className="text-white font-bold text-lg mb-2"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== DAILY REWARDS + TOP PLAYERS ===== */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Rewards */}
            <div>
              <div className="section-subtitle mb-2">Loyalty System</div>
              <h2 className="section-title text-3xl mb-2">Daily Rewards</h2>
              <div className="section-divider mb-6" />
              <p className="text-slate-400 text-sm mb-6">
                Log in every day to claim escalating rewards. Don't break your streak!
              </p>

              <div className="grid grid-cols-7 gap-2 mb-6">
                {dailyRewards.map((reward, idx) => (
                  <div
                    key={reward.day}
                    className={`reward-day group hover:scale-110 transition-transform duration-300 ${reward.claimed ? "claimed" : ""} ${reward.today ? "today" : ""} ${reward.locked ? "locked" : ""}`}
                    style={{
                      animationDelay: `${idx * 0.05}s`,
                    }}
                  >
                    <div className="text-xs text-slate-500 mb-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      Day {reward.day}
                    </div>
                    <div className="text-3xl mb-1 group-hover:scale-125 transition-transform">{reward.icon}</div>
                    <div className="text-xs text-slate-300 font-semibold leading-tight">{reward.reward}</div>
                    {reward.claimed && (
                      <div className="text-xs text-green-400 mt-1">✓ Claimed</div>
                    )}
                    {reward.today && (
                      <button
                        className="text-xs mt-1 px-2 py-1 rounded font-bold hover:bg-blue-600 transition-colors"
                        style={{ background: "rgba(59,130,246,0.3)", color: "#60A5FA", border: "1px solid rgba(96,165,250,0.4)" }}
                        onClick={() => toast.success("Daily reward claimed! +1000 Credits")}
                      >
                        CLAIM
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(59, 130, 246, 0.06)",
                  border: "1px solid rgba(59, 130, 246, 0.15)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300 font-semibold">Login Streak</span>
                  <span className="text-sm font-bold" style={{ color: "#F59E0B", fontFamily: "'Orbitron', monospace" }}>
                    3 Days 🔥
                  </span>
                </div>
                <div className="progress-bar-lu">
                  <div className="progress-fill-lu" style={{ width: "43%" }} />
                </div>
                <div className="text-xs text-slate-500 mt-1">4 more days until VIP Wings reward</div>
              </div>
            </div>

            {/* Top Players */}
            <div>
              <div className="section-subtitle mb-2">Leaderboard</div>
              <h2 className="section-title text-3xl mb-2">Top Warriors</h2>
              <div className="section-divider mb-6" />

              <div className="space-y-2">
                {topPlayers.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer"
                    style={{
                      background: "rgba(10, 22, 40, 0.5)",
                      border: "1px solid rgba(59, 130, 246, 0.12)",
                    }}
                    onClick={() => toast.info(`Viewing ${player.name}'s profile`)}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        background: player.rank === 1 ? "rgba(245,158,11,0.15)" : player.rank === 2 ? "rgba(148,163,184,0.1)" : player.rank === 3 ? "rgba(180,83,9,0.1)" : "rgba(59,130,246,0.08)",
                        color: player.rank === 1 ? "#F59E0B" : player.rank === 2 ? "#94A3B8" : player.rank === 3 ? "#B45309" : "#64748B",
                        border: `1px solid ${player.rank === 1 ? "rgba(245,158,11,0.3)" : player.rank === 2 ? "rgba(148,163,184,0.2)" : player.rank === 3 ? "rgba(180,83,9,0.2)" : "rgba(59,130,246,0.1)"}`,
                      }}
                    >
                      {player.rank === 1 ? "👑" : player.rank}
                    </div>

                    <div
                      className="class-icon flex-shrink-0 text-sm font-bold"
                      style={{
                        color: classColors[player.class] || "#60A5FA",
                        borderColor: `${classColors[player.class]}40` || "rgba(59,130,246,0.3)",
                      }}
                    >
                      {player.class}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm truncate" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        {player.name}
                      </div>
                      <div className="text-xs text-slate-500">Lvl {player.level}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: "#60A5FA", fontFamily: "'Orbitron', monospace" }}>
                        {player.resets}
                      </div>
                      <div className="text-xs text-slate-500">Resets</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/rankings">
                <button className="btn-secondary-lu w-full mt-4 flex items-center justify-center gap-2">
                  Full Rankings <Trophy size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEXT EVENT COUNTDOWN ===== */}
      <section className="section-padding" style={{ background: "rgba(4, 9, 20, 0.8)", borderTop: "1px solid rgba(59, 130, 246, 0.15)" }}>
        <div className="container">
          <div className="glass-card p-8 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(10,22,40,0.9) 0%, rgba(29,78,216,0.15) 50%, rgba(10,22,40,0.9) 100%)", border: "1px solid rgba(59,130,246,0.3)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="section-subtitle mb-2">Next Event</div>
                <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>Blood Castle</h2>
                <p className="text-slate-400 mb-4">Prepare your best gear. The next Blood Castle event starts in:</p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Mins", value: countdown.minutes },
                  { label: "Secs", value: countdown.seconds },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ fontFamily: "'Orbitron', monospace", color: "#60A5FA" }}
                    >
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-slate-500 uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED SYSTEMS ===== */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-subtitle mb-2">Server Highlights</div>
            <h2 className="section-title">Featured Systems</h2>
            <div className="section-divider mt-3 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {systems.map((sys) => (
              <div key={sys.title} className="glass-card p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3">{sys.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  {sys.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{sys.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOP 5 RANKINGS PREVIEW ===== */}
      <section
        className="section-padding"
        style={{
          background: "rgba(4, 9, 20, 0.6)",
          borderTop: "1px solid rgba(59, 130, 246, 0.08)",
        }}
      >
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-subtitle mb-2">Leaderboard</div>
              <h2 className="section-title">Top 5 Warriors</h2>
              <div className="section-divider mt-3" />
            </div>
            <Link href="/rankings">
              <button className="btn-secondary-lu text-sm hidden md:flex items-center gap-2">
                View All <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          <div className="space-y-2">
            {topPlayers.map((player) => (
              <div
                key={player.rank}
                className="flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-blue-500/10 cursor-pointer"
                style={{
                  background: "rgba(10, 22, 40, 0.6)",
                  border: "1px solid rgba(59, 130, 246, 0.15)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    background: player.rank === 1 ? "rgba(245,158,11,0.15)" : player.rank === 2 ? "rgba(148,163,184,0.1)" : player.rank === 3 ? "rgba(180,83,9,0.1)" : "rgba(59,130,246,0.08)",
                    color: player.rank === 1 ? "#F59E0B" : player.rank === 2 ? "#94A3B8" : player.rank === 3 ? "#B45309" : "#64748B",
                    border: `1px solid ${player.rank === 1 ? "rgba(245,158,11,0.3)" : player.rank === 2 ? "rgba(148,163,184,0.2)" : player.rank === 3 ? "rgba(180,83,9,0.2)" : "rgba(59,130,246,0.1)"}`,
                  }}
                >
                  {player.rank === 1 ? "👑" : player.rank}
                </div>

                <div
                  className="class-icon flex-shrink-0 text-sm font-bold"
                  style={{
                    color: classColors[player.class] || "#60A5FA",
                    borderColor: `${classColors[player.class]}40` || "rgba(59,130,246,0.3)",
                  }}
                >
                  {player.class}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    {player.name}
                  </div>
                  <div className="text-xs text-slate-500">Level {player.level}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold" style={{ color: "#60A5FA", fontFamily: "'Orbitron', monospace" }}>
                    {player.resets}
                  </div>
                  <div className="text-xs text-slate-500">Resets</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EVENTS SCHEDULE ===== */}
      <section
        className="section-padding"
        style={{
          background: "rgba(4, 9, 20, 0.6)",
          borderTop: "1px solid rgba(59, 130, 246, 0.08)",
        }}
      >
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-subtitle mb-2">Today's Schedule</div>
              <h2 className="section-title">Event Calendar</h2>
              <div className="section-divider mt-3" />
            </div>
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              <Clock size={14} className="text-blue-400" />
              <span className="text-sm text-blue-300 font-semibold" style={{ fontFamily: "'Orbitron', monospace" }}>
                {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.name}
                className={`event-card ${event.type === "pvp" ? "event-pvp" : event.type === "special" ? "event-special" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className="text-white font-bold text-base"
                      style={{ fontFamily: "'Exo 2', sans-serif" }}
                    >
                      {event.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{event.desc}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-sm font-bold"
                      style={{ fontFamily: "'Orbitron', monospace", color: event.type === "pvp" ? "#EF4444" : event.type === "special" ? "#F59E0B" : "#10B981" }}
                    >
                      {event.time}
                    </div>
                    <div className="text-xs text-slate-500">{event.recurring}</div>
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className={`badge-lu ${event.type === "pvp" ? "badge-hot" : event.type === "special" ? "badge-event" : "badge-new"}`}
                  >
                    {event.type.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section-padding">
        <div className="container">
          <div
            className="relative rounded-2xl overflow-hidden p-10 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(10,22,40,0.9) 0%, rgba(29,78,216,0.2) 50%, rgba(10,22,40,0.9) 100%)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: "radial-gradient(ellipse at center, rgba(59,130,246,0.4) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="text-5xl mb-4">⚔️</div>
              <h2
                className="text-4xl font-black text-white mb-4"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Ready to Ascend?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                Join over 8,000 registered warriors. Create your account now and start your journey in the most competitive MU Online server.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/register">
                  <button className="btn-primary-lu text-lg px-10 py-3">
                    Create Account — Free
                  </button>
                </Link>
                <Link href="/downloads">
                  <button className="btn-secondary-lu text-lg px-10 py-3">
                    Download Game
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
