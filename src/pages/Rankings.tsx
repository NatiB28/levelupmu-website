/* =============================================================
   LEVELUP - RANKINGS PAGE
   Design: Celestial Glass Citadel
   Sections: Reset Rankings, Monthly Top, Weekly Competition
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { Trophy, Crown, Star, TrendingUp, Award, Zap, Shield } from "lucide-react";
import { toast } from "sonner";

const RANKING_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395669918/9pfs76ogq3ifCL2XhYksmg/ranking-bg-FiFNNgCT55Qy7cN85F4f5D.webp";

const classColors: Record<string, string> = {
  DK: "#EF4444", BK: "#EF4444", SM: "#3B82F6", ELF: "#10B981",
  MG: "#EC4899", DL: "#A855F7", SUM: "#8B5CF6", RF: "#F59E0B",
  GL: "#F97316", RW: "#06B6D4", SL: "#84CC16",
};

const classFullNames: Record<string, string> = {
  DK: "Dark Knight", BK: "Blade Knight", SM: "Soul Master", ELF: "Muse Elf",
  MG: "Magic Gladiator", DL: "Dark Lord", SUM: "Summoner", RF: "Rage Fighter",
  GL: "Grand Master", RW: "Rune Wizard", SL: "Slayer",
};

const resetRankings = [
  { rank: 1, name: "DarkLord_X", class: "DL", level: 400, resets: 87, grandResets: 3, guild: "DeathBringers" },
  { rank: 2, name: "ShadowMage", class: "SM", level: 400, resets: 82, grandResets: 2, guild: "IronLegion" },
  { rank: 3, name: "BladeKnight", class: "BK", level: 400, resets: 79, grandResets: 2, guild: "DeathBringers" },
  { rank: 4, name: "ElvenArcher", class: "ELF", level: 400, resets: 75, grandResets: 1, guild: "SilverArrows" },
  { rank: 5, name: "RageFighter", class: "RF", level: 400, resets: 71, grandResets: 1, guild: "IronLegion" },
  { rank: 6, name: "MysticSummon", class: "SUM", level: 400, resets: 68, grandResets: 1, guild: "ArcaneOrder" },
  { rank: 7, name: "GrandMaster_Z", class: "GL", level: 400, resets: 65, grandResets: 0, guild: "SilverArrows" },
  { rank: 8, name: "RuneWizard", class: "RW", level: 400, resets: 62, grandResets: 0, guild: "ArcaneOrder" },
  { rank: 9, name: "MagicGlad", class: "MG", level: 400, resets: 59, grandResets: 0, guild: "DeathBringers" },
  { rank: 10, name: "SlayerPro", class: "SL", level: 400, resets: 55, grandResets: 0, guild: "IronLegion" },
];

const monthlyRankings = [
  { rank: 1, name: "BladeKnight", class: "BK", points: 48200, kills: 1847, deaths: 123 },
  { rank: 2, name: "DarkLord_X", class: "DL", points: 44100, kills: 1692, deaths: 98 },
  { rank: 3, name: "ElvenArcher", class: "ELF", points: 41800, kills: 1543, deaths: 201 },
  { rank: 4, name: "ShadowMage", class: "SM", points: 38500, kills: 1421, deaths: 156 },
  { rank: 5, name: "RageFighter", class: "RF", points: 35200, kills: 1298, deaths: 187 },
  { rank: 6, name: "GrandMaster_Z", class: "GL", points: 32100, kills: 1187, deaths: 234 },
  { rank: 7, name: "MysticSummon", class: "SUM", points: 29800, kills: 1043, deaths: 267 },
  { rank: 8, name: "RuneWizard", class: "RW", points: 27400, kills: 987, deaths: 312 },
];

const weeklyRankings = [
  { rank: 1, name: "RageFighter", class: "RF", score: 12840, wins: 47, losses: 8, streak: 12 },
  { rank: 2, name: "ShadowMage", class: "SM", score: 11200, wins: 43, losses: 11, streak: 7 },
  { rank: 3, name: "DarkLord_X", class: "DL", score: 10650, wins: 41, losses: 13, streak: 5 },
  { rank: 4, name: "BladeKnight", class: "BK", score: 9870, wins: 38, losses: 15, streak: 3 },
  { rank: 5, name: "ElvenArcher", class: "ELF", score: 8920, wins: 35, losses: 18, streak: 2 },
  { rank: 6, name: "MysticSummon", class: "SUM", score: 8100, wins: 32, losses: 21, streak: 1 },
];

type TabType = "resets" | "monthly" | "weekly";

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-xl">👑</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return (
    <span
      className="text-sm font-bold"
      style={{ fontFamily: "'Orbitron', monospace", color: "#475569" }}
    >
      #{rank}
    </span>
  );
}

export default function Rankings() {
  const [activeTab, setActiveTab] = useState<TabType>("resets");

  return (
    <Layout>
      {/* Hero */}
      <div
        className="relative pt-16 pb-12"
        style={{
          background: "linear-gradient(to bottom, rgba(6,13,31,0.7), rgba(6,13,31,0.95))",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${RANKING_BG})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,13,31,0.5), rgba(6,13,31,0.95))" }} />
        <div className="container relative z-10 pt-8 text-center">
          <div className="section-subtitle mb-2">Hall of Fame</div>
          <h1 className="section-title text-5xl mb-3">Rankings</h1>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-slate-400 max-w-lg mx-auto">
            The most powerful warriors of LevelUP. Compete, reset, and climb to the top.
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
          {/* 2nd Place */}
          <div className="flex flex-col items-center pt-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 border-2"
              style={{ background: "rgba(148,163,184,0.1)", borderColor: "rgba(148,163,184,0.4)" }}
            >
              {resetRankings[1].class.slice(0, 2)}
            </div>
            <div
              className="text-sm font-bold text-slate-300 mb-1"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {resetRankings[1].name}
            </div>
            <div className="text-xs text-slate-500">{resetRankings[1].resets} RST</div>
            <div
              className="mt-2 w-full h-20 rounded-t-lg flex items-center justify-center text-2xl"
              style={{ background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.2)" }}
            >
              🥈
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-2 border-2 animate-glow-pulse"
              style={{ background: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.5)" }}
            >
              {resetRankings[0].class.slice(0, 2)}
            </div>
            <div
              className="text-base font-bold text-yellow-400 mb-1"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {resetRankings[0].name}
            </div>
            <div className="text-xs text-slate-400">{resetRankings[0].resets} RST · {resetRankings[0].grandResets} GR</div>
            <div
              className="mt-2 w-full h-28 rounded-t-lg flex items-center justify-center text-3xl"
              style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}
            >
              👑
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center pt-10">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl mb-2 border-2"
              style={{ background: "rgba(180,83,9,0.1)", borderColor: "rgba(180,83,9,0.4)" }}
            >
              {resetRankings[2].class.slice(0, 2)}
            </div>
            <div
              className="text-sm font-bold text-orange-600 mb-1"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {resetRankings[2].name}
            </div>
            <div className="text-xs text-slate-500">{resetRankings[2].resets} RST</div>
            <div
              className="mt-2 w-full h-14 rounded-t-lg flex items-center justify-center text-xl"
              style={{ background: "rgba(180,83,9,0.08)", border: "1px solid rgba(180,83,9,0.2)" }}
            >
              🥉
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div
            className="flex gap-2 p-1 rounded-xl w-fit"
            style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(59,130,246,0.15)" }}
          >
            {[
              { id: "resets" as TabType, label: "Reset Rankings", icon: TrendingUp },
              { id: "monthly" as TabType, label: "Monthly Top", icon: Trophy },
              { id: "weekly" as TabType, label: "Weekly Competition", icon: Zap },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`tab-lu flex items-center gap-2 transition-all ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary-lu text-xs py-1.5 px-3">Filter by Class</button>
            <button className="btn-secondary-lu text-xs py-1.5 px-3">Filter by Guild</button>
          </div>
        </div>

        {/* Reset Rankings Table */}
        {activeTab === "resets" && (
          <div
            className="glass-card rounded-xl overflow-hidden"
            style={{ background: "rgba(8, 16, 32, 0.7)" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Reset Leaderboard
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">Ranked by total resets + grand resets • Top 10 displayed</p>
            </div>
            <div className="overflow-x-auto">
              <table className="table-lu">
                <thead>
                  <tr style={{ background: "rgba(59,130,246,0.06)" }}>
                    <th style={{ color: "#60A5FA" }}>Rank</th>
                    <th style={{ color: "#60A5FA" }}>Character</th>
                    <th style={{ color: "#60A5FA" }}>Class</th>
                    <th style={{ color: "#60A5FA" }}>Level</th>
                    <th style={{ color: "#60A5FA" }}>Resets</th>
                    <th style={{ color: "#60A5FA" }}>Grand Resets</th>
                    <th style={{ color: "#60A5FA" }}>Guild</th>
                  </tr>
                </thead>
                <tbody>
                  {resetRankings.map((p, idx) => (
                    <tr
                      key={p.rank}
                      className="cursor-pointer hover:bg-blue-500/10 transition-colors"
                      onClick={() => toast.info(`Viewing ${p.name}'s profile`)}
                      style={{
                        background: idx % 2 === 0 ? "rgba(10, 22, 40, 0.5)" : "rgba(10, 22, 40, 0.3)",
                      }}
                    >
                      <td>
                        <div className="flex items-center justify-center w-8">
                          <RankBadge rank={p.rank} />
                        </div>
                      </td>
                      <td>
                        <span className="font-semibold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                          {p.name}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div
                            className="class-icon text-xs"
                            style={{ color: classColors[p.class] || "#60A5FA", borderColor: `${classColors[p.class]}40` }}
                          >
                            {p.class}
                          </div>
                          <span className="text-xs text-slate-500 hidden md:block">{classFullNames[p.class]}</span>
                        </div>
                      </td>
                      <td>
                        <span className="stat-number text-sm">{p.level}</span>
                      </td>
                      <td>
                        <span
                          className="font-bold text-blue-400"
                          style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.9rem" }}
                        >
                          {p.resets}
                        </span>
                      </td>
                      <td>
                        {p.grandResets > 0 ? (
                          <span
                            className="font-bold"
                            style={{ color: "#F59E0B", fontFamily: "'Orbitron', monospace", fontSize: "0.9rem" }}
                          >
                            {p.grandResets} ⭐
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td>
                        <span
                          className="text-sm px-2 py-0.5 rounded"
                          style={{ background: "rgba(59,130,246,0.08)", color: "#93C5FD", border: "1px solid rgba(59,130,246,0.15)" }}
                        >
                          {p.guild}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Monthly Rankings */}
        {activeTab === "monthly" && (
          <div
            className="glass-card rounded-xl overflow-hidden"
            style={{ background: "rgba(8, 16, 32, 0.7)" }}
          >
            <div className="p-5 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Monthly Top Players
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">March 2024 — Ranked by PvP points</p>
            </div>
            <div className="overflow-x-auto">
              <table className="table-lu">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Character</th>
                    <th>Class</th>
                    <th>Points</th>
                    <th>Kills</th>
                    <th>Deaths</th>
                    <th>K/D Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyRankings.map(p => (
                    <tr key={p.rank} className="cursor-pointer" onClick={() => toast.info(`Viewing ${p.name}`)}>
                      <td><RankBadge rank={p.rank} /></td>
                      <td><span className="font-semibold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{p.name}</span></td>
                      <td>
                        <div className="class-icon text-xs" style={{ color: classColors[p.class] || "#60A5FA", borderColor: `${classColors[p.class]}40` }}>
                          {p.class}
                        </div>
                      </td>
                      <td><span className="font-bold text-yellow-400" style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.85rem" }}>{p.points.toLocaleString()}</span></td>
                      <td><span className="text-green-400 font-semibold">{p.kills.toLocaleString()}</span></td>
                      <td><span className="text-red-400 font-semibold">{p.deaths}</span></td>
                      <td>
                        <span className="font-bold text-blue-400" style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.85rem" }}>
                          {(p.kills / p.deaths).toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Weekly Competition */}
        {activeTab === "weekly" && (
          <div
            className="glass-card rounded-xl overflow-hidden"
            style={{ background: "rgba(8, 16, 32, 0.7)" }}
          >
            <div className="p-5 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    Weekly Competition
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">Resets every Monday 00:00 UTC</p>
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg text-sm font-bold"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#EF4444", fontFamily: "'Orbitron', monospace" }}
                >
                  5d 12h left
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table-lu">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Character</th>
                    <th>Class</th>
                    <th>Score</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Win Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyRankings.map(p => (
                    <tr key={p.rank} className="cursor-pointer" onClick={() => toast.info(`Viewing ${p.name}`)}>
                      <td><RankBadge rank={p.rank} /></td>
                      <td><span className="font-semibold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{p.name}</span></td>
                      <td>
                        <div className="class-icon text-xs" style={{ color: classColors[p.class] || "#60A5FA", borderColor: `${classColors[p.class]}40` }}>
                          {p.class}
                        </div>
                      </td>
                      <td><span className="font-bold text-blue-400" style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.85rem" }}>{p.score.toLocaleString()}</span></td>
                      <td><span className="text-green-400 font-semibold">{p.wins}</span></td>
                      <td><span className="text-red-400 font-semibold">{p.losses}</span></td>
                      <td>
                        {p.streak > 0 ? (
                          <span className="text-orange-400 font-bold">🔥 {p.streak}</span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Prizes Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { place: "1st Place", prize: "10,000 Credits + Exclusive Title", icon: "👑", color: "#F59E0B" },
            { place: "2nd Place", prize: "5,000 Credits + Ancient Item Box", icon: "🥈", color: "#94A3B8" },
            { place: "3rd Place", prize: "2,500 Credits + Chaos Jewel x20", icon: "🥉", color: "#B45309" },
          ].map(prize => (
            <div
              key={prize.place}
              className="glass-card p-5 text-center"
              style={{ borderColor: `${prize.color}30` }}
            >
              <div className="text-3xl mb-2">{prize.icon}</div>
              <div className="font-bold text-white mb-1" style={{ fontFamily: "'Rajdhani', sans-serif", color: prize.color }}>
                {prize.place}
              </div>
              <div className="text-sm text-slate-400">{prize.prize}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
