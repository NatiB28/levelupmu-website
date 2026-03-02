/* =============================================================
   LEVELUP - FORGOT PASSWORD PAGE
   Design: Celestial Glass Citadel
   ============================================================= */

import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Mail, ArrowLeft, KeyRound, Shield } from "lucide-react";
import { toast } from "sonner";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395669918/9pfs76ogq3ifCL2XhYksmg/logo-emblem-g5qF5tPcExDzYwcF9GvVJj.webp";

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "code" | "reset" | "done">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep("code");
    toast.success("Recovery code sent to your email!");
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) { toast.error("Please enter the 6-digit code"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStep("reset");
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep("done");
    toast.success("Password reset successfully!");
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center relative pt-16 py-12">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(29,78,216,0.3) 0%, transparent 60%)" }}
        />

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div
            className="glass-card p-8 rounded-2xl"
            style={{
              background: "rgba(8, 16, 32, 0.85)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="text-center mb-8">
              <img src={LOGO_URL} alt="LevelUP" className="w-14 h-14 object-contain mx-auto mb-4" />
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {step === "done" ? "Password Reset!" : "Account Recovery"}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {step === "email" && "Enter your email to receive a recovery code"}
                {step === "code" && `We sent a code to ${email}`}
                {step === "reset" && "Create your new password"}
                {step === "done" && "Your password has been updated successfully"}
              </p>
            </div>

            {/* Progress Steps */}
            {step !== "done" && (
              <div className="flex items-center gap-2 mb-8">
                {["email", "code", "reset"].map((s, i) => {
                  const steps = ["email", "code", "reset"];
                  const current = steps.indexOf(step);
                  const isActive = i <= current;
                  return (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                        style={{
                          background: isActive ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.05)",
                          border: `1px solid ${isActive ? "rgba(59,130,246,0.6)" : "rgba(59,130,246,0.15)"}`,
                          color: isActive ? "#60A5FA" : "#475569",
                          fontFamily: "'Orbitron', monospace",
                        }}
                      >
                        {i + 1}
                      </div>
                      {i < 2 && (
                        <div
                          className="flex-1 h-px"
                          style={{ background: i < current ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.1)" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step: Email */}
            {step === "email" && (
              <form onSubmit={handleEmailSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="input-lu pl-10"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary-lu w-full py-3 flex items-center justify-center gap-2">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Mail size={18} />}
                  {loading ? "Sending..." : "Send Recovery Code"}
                </button>
              </form>
            )}

            {/* Step: Code */}
            {step === "code" && (
              <form onSubmit={handleCodeSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}>
                    6-Digit Code
                  </label>
                  <input
                    type="text"
                    className="input-lu text-center text-2xl tracking-widest"
                    placeholder="000000"
                    value={code}
                    onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  />
                  <p className="text-xs text-slate-500 mt-1 text-center">Code expires in 15 minutes</p>
                </div>
                <button type="submit" disabled={loading || code.length < 6} className="btn-primary-lu w-full py-3 flex items-center justify-center gap-2">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <KeyRound size={18} />}
                  {loading ? "Verifying..." : "Verify Code"}
                </button>
                <button type="button" className="w-full text-sm text-slate-500 hover:text-slate-300 transition-colors" onClick={() => toast.info("New code sent!")}>
                  Resend code
                </button>
              </form>
            )}

            {/* Step: Reset */}
            {step === "reset" && (
              <form onSubmit={handleResetSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'Rajdhani', sans-serif" }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    className="input-lu"
                    placeholder="Minimum 8 characters"
                    value={newPass}
                    onChange={e => setNewPass(e.target.value)}
                    minLength={8}
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary-lu w-full py-3 flex items-center justify-center gap-2">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Shield size={18} />}
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}

            {/* Step: Done */}
            {step === "done" && (
              <div className="text-center space-y-4">
                <div className="text-5xl">🎉</div>
                <p className="text-slate-300">Your password has been successfully reset. You can now log in with your new password.</p>
                <Link href="/login">
                  <button className="btn-primary-lu w-full py-3">Go to Login</button>
                </Link>
              </div>
            )}

            {step !== "done" && (
              <div className="mt-6 text-center">
                <Link href="/login">
                  <span className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer flex items-center justify-center gap-1">
                    <ArrowLeft size={14} /> Back to Login
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
