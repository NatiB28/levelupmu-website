/* =============================================================
   LEVELUP - LOGIN PAGE
   Design: Celestial Glass Citadel
   ============================================================= */

import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Eye, EyeOff, LogIn, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395669918/9pfs76ogq3ifCL2XhYksmg/hero-bg-gVepYqFiXLoSGpvaxMch2M.webp";
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395669918/9pfs76ogq3ifCL2XhYksmg/logo-emblem-g5qF5tPcExDzYwcF9GvVJj.webp";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Login successful! Welcome back, warrior.");
    // In production: handle JWT token, redirect to dashboard
  };

  return (
    <Layout>
      <div
        className="min-h-screen flex items-center justify-center relative pt-16"
        style={{ minHeight: "100vh" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(29,78,216,0.15) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12">
          {/* Card */}
          <div
            className="glass-card p-8 rounded-2xl"
            style={{
              background: "rgba(8, 16, 32, 0.85)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.08)",
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <img src={LOGO_URL} alt="LevelUP" className="w-16 h-16 object-contain mx-auto mb-4" />
              <h1
                className="text-3xl font-black text-white"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Welcome Back
              </h1>
              <p className="text-slate-400 text-sm mt-1">Sign in to your LevelUP account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-sm font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Username
                </label>
                <input
                  type="text"
                  className="input-lu"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  autoComplete="username"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    className="input-lu pr-12"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded"
                    style={{ accentColor: "#3B82F6" }}
                    checked={form.remember}
                    onChange={e => setForm({ ...form, remember: e.target.checked })}
                  />
                  <span className="text-sm text-slate-400">Remember me</span>
                </label>
                <Link href="/forgot-password">
                  <span className="text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                    Forgot password?
                  </span>
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary-lu w-full py-3 text-base flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px" style={{ background: "rgba(59,130,246,0.15)" }} />
              <span className="text-xs text-slate-600 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px" style={{ background: "rgba(59,130,246,0.15)" }} />
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link href="/register">
                <span className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer">
                  Create one free →
                </span>
              </Link>
            </p>

            {/* Security Note */}
            <div
              className="mt-6 p-3 rounded-lg flex items-start gap-3"
              style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.1)" }}
            >
              <Shield size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Your connection is secured with SSL encryption. Never share your password with anyone, including staff members.
              </p>
            </div>
          </div>

          {/* Server Status */}
          <div className="mt-4 text-center">
            <span className="status-online text-sm">Server Online</span>
            <span className="text-slate-600 mx-2">·</span>
            <span className="text-sm text-slate-500">1,247 players online</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
