/* =============================================================
   LEVELUP - DOWNLOADS PAGE
   Design: Celestial Glass Citadel
   Features: Game client, patches, installation guide
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { Download, HardDrive, FileArchive, BookOpen, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Monitor, Cpu, MemoryStick } from "lucide-react";
import { toast } from "sonner";

const downloads = [
  {
    id: 1,
    name: "LevelUP Full Client",
    version: "Season 20 Part 2",
    size: "4.2 GB",
    type: "main",
    icon: "🎮",
    desc: "Complete game client. Download this if you're new to LevelUP or want a fresh installation.",
    mirrors: ["Mirror 1 (EU)", "Mirror 2 (US)", "Mirror 3 (ASIA)"],
    checksum: "SHA256: a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5",
  },
  {
    id: 2,
    name: "LevelUP Patch v2.4.1",
    version: "Latest Patch",
    size: "128 MB",
    type: "patch",
    icon: "🔧",
    desc: "Latest patch with Season 20 Part 2 content. Apply this if you already have the base client installed.",
    mirrors: ["Mirror 1 (EU)", "Mirror 2 (US)"],
    checksum: "SHA256: b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9",
  },
  {
    id: 3,
    name: "LevelUP Launcher",
    version: "v1.2.0",
    size: "45 MB",
    type: "launcher",
    icon: "🚀",
    desc: "Auto-updating launcher that keeps your client up to date automatically. Recommended for all players.",
    mirrors: ["Mirror 1 (EU)", "Mirror 2 (US)"],
    checksum: "SHA256: c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
  },
];

const guideSteps = [
  { step: 1, title: "Download the Client", desc: "Download the LevelUP Full Client (4.2 GB) or the Launcher from the links above. The Launcher is recommended as it auto-updates.", icon: "📥" },
  { step: 2, title: "Extract Files", desc: "Extract the downloaded archive to a folder of your choice (e.g., C:\\LevelUP). Make sure you have at least 8 GB of free space.", icon: "📂" },
  { step: 3, title: "Run as Administrator", desc: "Right-click on LevelUP.exe and select 'Run as Administrator'. This is required for proper file access.", icon: "🛡️" },
  { step: 4, title: "Configure Settings", desc: "On first launch, configure your resolution, graphics quality, and sound settings. We recommend at least Medium quality.", icon: "⚙️" },
  { step: 5, title: "Create Account", desc: "If you don't have an account yet, click 'Register' on the login screen or create one on this website.", icon: "👤" },
  { step: 6, title: "Enter the World", desc: "Log in with your credentials and select your server. Choose 'LevelUP S20P2' and start your adventure!", icon: "⚔️" },
];

const systemReqs = {
  minimum: [
    { label: "OS", value: "Windows 7 SP1 (64-bit)" },
    { label: "CPU", value: "Intel Core i3-4th Gen" },
    { label: "RAM", value: "4 GB" },
    { label: "GPU", value: "NVIDIA GTX 660 / AMD R9 270" },
    { label: "Storage", value: "8 GB HDD" },
    { label: "DirectX", value: "Version 11" },
  ],
  recommended: [
    { label: "OS", value: "Windows 10/11 (64-bit)" },
    { label: "CPU", value: "Intel Core i5-8th Gen or better" },
    { label: "RAM", value: "8 GB" },
    { label: "GPU", value: "NVIDIA GTX 1060 / AMD RX 580" },
    { label: "Storage", value: "8 GB SSD" },
    { label: "DirectX", value: "Version 12" },
  ],
};

export default function Downloads() {
  const [expandedGuide, setExpandedGuide] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<Record<number, number>>({});

  const handleDownload = (id: number, name: string, mirror: string) => {
    toast.success(`Starting download: ${name} (${mirror})`);
    setDownloadProgress(prev => ({ ...prev, [id]: 0 }));
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setDownloadProgress(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
          toast.success(`${name} download complete!`);
        }, 500);
      }
      setDownloadProgress(prev => ({ ...prev, [id]: Math.min(100, Math.floor(progress)) }));
    }, 300);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="pt-24 pb-10">
        <div className="container text-center">
          <div className="section-subtitle mb-2">Get Started</div>
          <h1 className="section-title text-5xl mb-3">Download Center</h1>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-slate-400 max-w-lg mx-auto">
            Download the LevelUP game client and start your adventure. All files are virus-scanned and verified.
          </p>
        </div>
      </div>

      <div className="container pb-16">
        {/* Download Cards */}
        <div className="space-y-5 mb-12">
          {downloads.map(dl => (
            <div key={dl.id} className="download-card">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                {/* Icon & Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{
                      background: dl.type === "main" ? "rgba(59,130,246,0.1)" : dl.type === "patch" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                      border: `1px solid ${dl.type === "main" ? "rgba(59,130,246,0.3)" : dl.type === "patch" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                    }}
                  >
                    {dl.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                        {dl.name}
                      </h3>
                      <span
                        className="badge-lu"
                        style={{
                          background: dl.type === "main" ? "rgba(59,130,246,0.1)" : dl.type === "patch" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                          color: dl.type === "main" ? "#60A5FA" : dl.type === "patch" ? "#10B981" : "#F59E0B",
                          border: `1px solid ${dl.type === "main" ? "rgba(59,130,246,0.3)" : dl.type === "patch" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                        }}
                      >
                        {dl.version}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{dl.desc}</p>
                    <div className="text-xs text-slate-600 mt-1 font-mono">{dl.checksum}</div>
                  </div>
                </div>

                {/* Size & Download */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <HardDrive size={14} className="text-slate-500" />
                    <span
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: "'Orbitron', monospace" }}
                    >
                      {dl.size}
                    </span>
                  </div>

                  {/* Mirror Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {dl.mirrors.map(mirror => (
                      <button
                        key={mirror}
                        className="btn-primary-lu text-xs py-1.5 px-3 flex items-center gap-1.5"
                        onClick={() => handleDownload(dl.id, dl.name, mirror)}
                      >
                        <Download size={12} />
                        {mirror}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {downloadProgress[dl.id] !== undefined && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Downloading...</span>
                    <span style={{ fontFamily: "'Orbitron', monospace" }}>{downloadProgress[dl.id]}%</span>
                  </div>
                  <div className="progress-bar-lu">
                    <div className="progress-fill-lu" style={{ width: `${downloadProgress[dl.id]}%` }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* System Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { title: "Minimum Requirements", data: systemReqs.minimum, color: "#64748B" },
            { title: "Recommended Requirements", data: systemReqs.recommended, color: "#3B82F6" },
          ].map(req => (
            <div
              key={req.title}
              className="glass-card rounded-xl p-6"
              style={{ background: "rgba(8, 16, 32, 0.7)" }}
            >
              <h3
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Exo 2', sans-serif", color: req.color }}
              >
                <Monitor size={18} />
                {req.title}
              </h3>
              <div className="space-y-2">
                {req.data.map(item => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-2"
                    style={{ borderBottom: "1px solid rgba(59,130,246,0.06)" }}
                  >
                    <span className="text-sm text-slate-500 font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {item.label}
                    </span>
                    <span className="text-sm text-slate-300">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Installation Guide */}
        <div
          className="glass-card rounded-xl overflow-hidden"
          style={{ background: "rgba(8, 16, 32, 0.7)" }}
        >
          <button
            className="w-full p-5 flex items-center justify-between text-left"
            onClick={() => setExpandedGuide(!expandedGuide)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)" }}
              >
                <BookOpen size={18} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  Installation Guide
                </h3>
                <p className="text-sm text-slate-500">Step-by-step setup instructions</p>
              </div>
            </div>
            {expandedGuide ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
          </button>

          {expandedGuide && (
            <div className="px-5 pb-6" style={{ borderTop: "1px solid rgba(59,130,246,0.1)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {guideSteps.map(step => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl"
                    style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.1)" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          background: "rgba(59,130,246,0.2)",
                          border: "1px solid rgba(59,130,246,0.4)",
                          color: "#60A5FA",
                          fontFamily: "'Orbitron', monospace",
                        }}
                      >
                        {step.step}
                      </div>
                      <span className="text-xl">{step.icon}</span>
                      <h4 className="text-sm font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Troubleshooting */}
              <div
                className="mt-5 p-4 rounded-xl flex items-start gap-3"
                style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)" }}
              >
                <AlertCircle size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-yellow-400 mb-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    Having Issues?
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    If you encounter any installation issues, disable your antivirus temporarily (false positives are common with game clients), run as Administrator, and make sure Windows Defender is not blocking the executable. For further help, visit our Discord server.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
