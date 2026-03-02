/* =============================================================
   LEVELUP - LAYOUT COMPONENT
   Design: Celestial Glass Citadel
   Sticky glass nav + particle background + footer
   ============================================================= */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Sword, Trophy, Search, ShoppingBag, Download, Users, MessageSquare, Info, Home, LogIn, UserPlus, Zap, Star, Shield } from "lucide-react";
import { toast } from "sonner";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395669918/9pfs76ogq3ifCL2XhYksmg/logo-emblem-g5qF5tPcExDzYwcF9GvVJj.webp";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Rankings", href: "/rankings", icon: Trophy },
  { label: "Search", href: "/character-search", icon: Search },
  { label: "Shop", href: "/donation", icon: ShoppingBag },
  { label: "Downloads", href: "/downloads", icon: Download },
  { label: "Community", href: "/community", icon: Users },
  { label: "Forum", href: "/forum", icon: MessageSquare },
  { label: "Info", href: "/info", icon: Info },
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{x: number; y: number; vx: number; vy: number; size: number; opacity: number}> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serverPlayers] = useState(1247);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-cosmos relative" style={{ backgroundColor: "#060D1F" }}>
      <ParticleCanvas />

      {/* NAVIGATION */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(6, 13, 31, 0.95)"
            : "rgba(6, 13, 31, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(59, 130, 246, 0.25)"
            : "1px solid rgba(59, 130, 246, 0.1)",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <img
                    src={LOGO_URL}
                    alt="LevelUP"
                    className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div
                    className="font-black text-xl leading-none"
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      background: "linear-gradient(135deg, #FFFFFF 0%, #93C5FD 60%, #3B82F6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    LEVEL<span style={{ color: "#3B82F6", WebkitTextFillColor: "#3B82F6" }}>UP</span>
                  </div>
                  <div
                    className="text-xs leading-none mt-0.5"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: "rgba(148, 163, 184, 0.6)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    MU ONLINE S20P2
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`nav-link ${location === item.href ? "active" : ""}`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Server Status */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                }}
              >
                <span className="status-online text-xs">ONLINE</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#10B981", fontFamily: "'Orbitron', monospace" }}
                >
                  {serverPlayers.toLocaleString()}
                </span>
              </div>

              <Link href="/login">
                <button className="btn-secondary-lu text-sm py-1.5 px-4">Login</button>
              </Link>
              <Link href="/register">
                <button className="btn-primary-lu text-sm py-1.5 px-4">Play Now</button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
              style={{ background: "rgba(59, 130, 246, 0.08)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mobile-menu lg:hidden">
            <div className="container py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        location === item.href
                          ? "bg-blue-500/15 text-blue-300"
                          : "text-slate-400 hover:text-white hover:bg-blue-500/08"
                      }`}
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}
                    >
                      <Icon size={18} />
                      {item.label}
                    </div>
                  </Link>
                );
              })}
              <div className="pt-3 flex gap-3">
                <Link href="/login" className="flex-1">
                  <button className="btn-secondary-lu w-full text-sm">Login</button>
                </Link>
                <Link href="/register" className="flex-1">
                  <button className="btn-primary-lu w-full text-sm">Play Now</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* FOOTER */}
      <footer
        className="relative z-10 mt-20"
        style={{
          background: "rgba(4, 9, 20, 0.95)",
          borderTop: "1px solid rgba(59, 130, 246, 0.15)",
        }}
      >
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={LOGO_URL} alt="LevelUP" className="w-10 h-10 object-contain" />
                <div>
                  <div
                    className="font-black text-lg"
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      background: "linear-gradient(135deg, #FFFFFF, #60A5FA)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    LEVELUP
                  </div>
                  <div className="text-xs text-slate-500" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    MU ONLINE S20P2
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                The premier MU Online Season 20 Part 2 private server. Join thousands of warriors in the ultimate MMORPG experience.
              </p>
              <div className="flex gap-3 mt-4">
                {["Discord", "Facebook", "YouTube"].map(s => (
                  <button
                    key={s}
                    onClick={() => toast.info(`${s} link coming soon`)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                    style={{ background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.15)" }}
                    title={s}
                  >
                    {s === "Discord" ? "💬" : s === "Facebook" ? "📘" : "▶"}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Quick Links
              </h5>
              <ul className="space-y-2">
                {[
                  { label: "Rankings", href: "/rankings" },
                  { label: "Character Search", href: "/character-search" },
                  { label: "Donation Shop", href: "/donation" },
                  { label: "Downloads", href: "/downloads" },
                  { label: "Forum", href: "/forum" },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      <span className="text-sm text-slate-400 hover:text-blue-400 transition-colors cursor-pointer">
                        → {l.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Server Info */}
            <div>
              <h5 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Server Info
              </h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex justify-between">
                  <span>Season</span>
                  <span className="text-blue-400 font-semibold">20 Part 2</span>
                </li>
                <li className="flex justify-between">
                  <span>EXP Rate</span>
                  <span className="text-blue-400 font-semibold">9999x</span>
                </li>
                <li className="flex justify-between">
                  <span>Drop Rate</span>
                  <span className="text-blue-400 font-semibold">50%</span>
                </li>
                <li className="flex justify-between">
                  <span>Max Level</span>
                  <span className="text-blue-400 font-semibold">400</span>
                </li>
                <li className="flex justify-between">
                  <span>Max Resets</span>
                  <span className="text-blue-400 font-semibold">100</span>
                </li>
                <li className="flex justify-between">
                  <span>Status</span>
                  <span className="status-online">ONLINE</span>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h5 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Community
              </h5>
              <ul className="space-y-2">
                {[
                  { label: "Server Rules", href: "/info" },
                  { label: "Beginner Guide", href: "/info" },
                  { label: "Events Calendar", href: "/community" },
                  { label: "Daily Rewards", href: "/" },
                  { label: "Support", href: "/community" },
                ].map(l => (
                  <li key={l.label}>
                    <Link href={l.href}>
                      <span className="text-sm text-slate-400 hover:text-blue-400 transition-colors cursor-pointer">
                        → {l.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(59, 130, 246, 0.1)" }}
          >
            <p className="text-xs text-slate-600">
              © 2024 LevelUP MU Online. This is a private server and is not affiliated with Webzen Inc.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
