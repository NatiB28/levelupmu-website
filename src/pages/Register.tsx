/* =============================================================
   LEVELUP - REGISTER PAGE
   Design: Celestial Glass Citadel
   ============================================================= */

import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Eye, EyeOff, UserPlus, Shield, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395669918/9pfs76ogq3ifCL2XhYksmg/logo-emblem-g5qF5tPcExDzYwcF9GvVJj.webp";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "Contains uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "Contains number", ok: /\d/.test(password) },
    { label: "Contains special character", ok: /[^a-zA-Z0-9]/.test(password) },
  ];
  const strength = checks.filter(c => c.ok).length;
  const colors = ["#EF4444", "#F59E0B", "#3B82F6", "#10B981"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i < strength ? colors[strength - 1] : "rgba(59,130,246,0.1)" }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          {checks.map(c => (
            <div key={c.label} className="flex items-center gap-1.5">
              {c.ok
                ? <CheckCircle size={10} className="text-green-400" />
                : <XCircle size={10} className="text-slate-600" />
              }
              <span className={`text-xs ${c.ok ? "text-green-400" : "text-slate-600"}`}>{c.label}</span>
            </div>
          ))}
        </div>
        {strength > 0 && (
          <span className="text-xs font-bold" style={{ color: colors[strength - 1] }}>
            {labels[strength - 1]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "", email: "", password: "", confirmPassword: "",
    securityQuestion: "", securityAnswer: "", agreeTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!form.agreeTerms) {
      toast.error("Please accept the terms of service");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    toast.success("Account created! Check your email to verify your account.");
    // In production: POST to /api/auth/register
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center relative pt-16 py-12">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(29,78,216,0.3) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 w-full max-w-lg mx-auto px-4">
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
              <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Join LevelUP
              </h1>
              <p className="text-slate-400 text-sm mt-1">Create your warrior account — it's free</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}>
                  Username *
                </label>
                <input
                  type="text"
                  className="input-lu"
                  placeholder="Choose a warrior name (4-12 chars)"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  minLength={4}
                  maxLength={12}
                  autoComplete="username"
                />
                <p className="text-xs text-slate-600 mt-1">This will be your in-game character name prefix</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  className="input-lu"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}>
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    className="input-lu pr-12"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    autoComplete="new-password"
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <PasswordStrength password={form.password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}>
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="input-lu pr-12"
                    placeholder="Repeat your password"
                    value={form.confirmPassword}
                    onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                    autoComplete="new-password"
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                )}
                {form.confirmPassword && form.password === form.confirmPassword && (
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <CheckCircle size={10} /> Passwords match
                  </p>
                )}
              </div>

              {/* Security Question */}
              <div>
                <label className="block text-sm font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}>
                  Security Question
                </label>
                <select
                  className="input-lu"
                  value={form.securityQuestion}
                  onChange={e => setForm({ ...form, securityQuestion: e.target.value })}
                  style={{ background: "rgba(10, 22, 40, 0.8)", color: form.securityQuestion ? "white" : "rgba(148,163,184,0.5)" }}
                >
                  <option value="" disabled>Select a security question</option>
                  <option value="pet">What was the name of your first pet?</option>
                  <option value="city">In what city were you born?</option>
                  <option value="school">What was the name of your first school?</option>
                  <option value="mother">What is your mother's maiden name?</option>
                </select>
              </div>

              {form.securityQuestion && (
                <div>
                  <label className="block text-sm font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}>
                    Security Answer
                  </label>
                  <input
                    type="text"
                    className="input-lu"
                    placeholder="Your answer"
                    value={form.securityAnswer}
                    onChange={e => setForm({ ...form, securityAnswer: e.target.value })}
                  />
                </div>
              )}

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 rounded flex-shrink-0"
                  style={{ accentColor: "#3B82F6" }}
                  checked={form.agreeTerms}
                  onChange={e => setForm({ ...form, agreeTerms: e.target.checked })}
                />
                <span className="text-sm text-slate-400 leading-relaxed">
                  I agree to the{" "}
                  <Link href="/info"><span className="text-blue-400 hover:text-blue-300 cursor-pointer">Terms of Service</span></Link>
                  {" "}and{" "}
                  <Link href="/info"><span className="text-blue-400 hover:text-blue-300 cursor-pointer">Server Rules</span></Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary-lu w-full py-3 text-base flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    Create Account — Free
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-6">
              Already have an account?{" "}
              <Link href="/login">
                <span className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer">
                  Sign in →
                </span>
              </Link>
            </p>

            {/* Perks */}
            <div
              className="mt-6 p-4 rounded-xl"
              style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.1)" }}
            >
              <p className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                New Account Bonus
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: "💎", label: "5,000 Credits" },
                  { icon: "⚔️", label: "Starter Kit" },
                  { icon: "🎁", label: "7-Day VIP" },
                ].map(b => (
                  <div key={b.label} className="text-center">
                    <div className="text-xl mb-1">{b.icon}</div>
                    <div className="text-xs text-slate-400">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
