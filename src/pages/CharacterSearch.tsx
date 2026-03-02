/* =============================================================
   LEVELUP - CHARACTER SEARCH PAGE
   Design: Celestial Glass Citadel
   Features: Search by name, display full character profile
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { Search, Shield, Sword, Star, TrendingUp, Award, User, Zap } from "lucide-react";
import { toast } from "sonner";

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

// Mock character database
const mockCharacters: Record<string, any> = {
  "darklord_x": {
    name: "DarkLord_X", class: "DL", level: 400, resets: 87, grandResets: 3,
    guild: "DeathBringers", guildRole: "Master",
    pkKills: 1847, pkDeaths: 98, pvpScore: 48200,
    strength: 32767, agility: 32767, vitality: 32767, energy: 32767, command: 32767,
    masterLevel: 200, masterPoints: 15420,
    joinDate: "2024-01-15", lastOnline: "2 hours ago",
    status: "online",
    equipment: {
      helm: { name: "Dark Lord Helm +15", rarity: "ancient", icon: "⛑️" },
      armor: { name: "Dark Lord Armor +15", rarity: "ancient", icon: "🛡️" },
      pants: { name: "Dark Lord Pants +15", rarity: "ancient", icon: "👖" },
      gloves: { name: "Dark Lord Gloves +15", rarity: "ancient", icon: "🧤" },
      boots: { name: "Dark Lord Boots +15", rarity: "ancient", icon: "👢" },
      weapon: { name: "Scepter of Darkness +15", rarity: "excellent", icon: "⚡" },
      shield: { name: "Dark Shield +15", rarity: "excellent", icon: "🔰" },
      wings: { name: "Wings of Darkness +15", rarity: "ancient", icon: "🪽" },
      pendant: { name: "Pendant of Lightning +15", rarity: "excellent", icon: "📿" },
      ring1: { name: "Ring of Magic +15", rarity: "excellent", icon: "💍" },
      ring2: { name: "Ring of Ice +15", rarity: "set", icon: "💍" },
    },
    achievements: [
      { name: "First Reset", icon: "🔄", unlocked: true },
      { name: "Grand Resetter", icon: "⭐", unlocked: true },
      { name: "PvP Master", icon: "⚔️", unlocked: true },
      { name: "Guild Leader", icon: "👑", unlocked: true },
      { name: "Event Champion", icon: "🏆", unlocked: true },
      { name: "Legend", icon: "🌟", unlocked: false },
    ],
  },
  "shadowmage": {
    name: "ShadowMage", class: "SM", level: 400, resets: 82, grandResets: 2,
    guild: "IronLegion", guildRole: "Sub-Master",
    pkKills: 1692, pkDeaths: 156, pvpScore: 44100,
    strength: 15000, agility: 20000, vitality: 25000, energy: 32767, command: 0,
    masterLevel: 180, masterPoints: 12800,
    joinDate: "2024-01-20", lastOnline: "Online now",
    status: "online",
    equipment: {
      helm: { name: "Legendary Helm +13", rarity: "set", icon: "⛑️" },
      armor: { name: "Legendary Armor +13", rarity: "set", icon: "🛡️" },
      pants: { name: "Legendary Pants +13", rarity: "set", icon: "👖" },
      gloves: { name: "Legendary Gloves +13", rarity: "set", icon: "🧤" },
      boots: { name: "Legendary Boots +13", rarity: "set", icon: "👢" },
      weapon: { name: "Staff of Destruction +15", rarity: "ancient", icon: "🔮" },
      shield: null,
      wings: { name: "Wings of Eternal +13", rarity: "excellent", icon: "🪽" },
      pendant: { name: "Pendant of Fire +13", rarity: "excellent", icon: "📿" },
      ring1: { name: "Ring of Poison +13", rarity: "magic", icon: "💍" },
      ring2: { name: "Ring of Earth +13", rarity: "magic", icon: "💍" },
    },
    achievements: [
      { name: "First Reset", icon: "🔄", unlocked: true },
      { name: "Grand Resetter", icon: "⭐", unlocked: true },
      { name: "PvP Master", icon: "⚔️", unlocked: true },
      { name: "Guild Leader", icon: "👑", unlocked: false },
      { name: "Event Champion", icon: "🏆", unlocked: false },
      { name: "Legend", icon: "🌟", unlocked: false },
    ],
  },
};

const rarityColors: Record<string, string> = {
  normal: "#94A3B8",
  magic: "#3B82F6",
  set: "#10B981",
  excellent: "#F59E0B",
  ancient: "#EF4444",
  socket: "#A855F7",
};

export default function CharacterSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);
    await new Promise(r => setTimeout(r, 800));
    const found = mockCharacters[query.toLowerCase().trim()];
    setLoading(false);
    if (found) {
      setResult(found);
    } else {
      setNotFound(true);
    }
  };

  const equipSlots = result ? [
    { key: "helm", label: "Helm" },
    { key: "armor", label: "Armor" },
    { key: "pants", label: "Pants" },
    { key: "gloves", label: "Gloves" },
    { key: "boots", label: "Boots" },
    { key: "weapon", label: "Weapon" },
    { key: "shield", label: "Shield" },
    { key: "wings", label: "Wings" },
    { key: "pendant", label: "Pendant" },
    { key: "ring1", label: "Ring 1" },
    { key: "ring2", label: "Ring 2" },
  ] : [];

  return (
    <Layout>
      {/* Header */}
      <div className="pt-24 pb-10">
        <div className="container text-center">
          <div className="section-subtitle mb-2">Player Lookup</div>
          <h1 className="section-title text-5xl mb-3">Character Search</h1>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            Search any character by name to view their full profile, equipment, and stats.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                className="input-lu pl-11 text-base"
                placeholder="Enter character name..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary-lu px-6 flex items-center gap-2">
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search size={16} />
              )}
              Search
            </button>
          </form>

          <p className="text-xs text-slate-600 mt-3">
            Try: <button onClick={() => setQuery("DarkLord_X")} className="text-blue-500 hover:text-blue-400">DarkLord_X</button>
            {" · "}
            <button onClick={() => setQuery("ShadowMage")} className="text-blue-500 hover:text-blue-400">ShadowMage</button>
          </p>
        </div>
      </div>

      <div className="container pb-16">
        {/* Not Found */}
        {notFound && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Character Not Found
            </h3>
            <p className="text-slate-400">No character named "{query}" exists on LevelUP server.</p>
          </div>
        )}

        {/* Character Profile */}
        {result && (
          <div className="animate-float-up">
            {/* Profile Header */}
            <div
              className="glass-card rounded-2xl p-8 mb-6"
              style={{
                background: `linear-gradient(135deg, rgba(8,16,32,0.9) 0%, ${classColors[result.class] || "#3B82F6"}08 100%)`,
                border: `1px solid ${classColors[result.class] || "#3B82F6"}30`,
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Class Icon */}
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black flex-shrink-0 animate-glow-pulse"
                  style={{
                    background: `${classColors[result.class] || "#3B82F6"}15`,
                    border: `2px solid ${classColors[result.class] || "#3B82F6"}50`,
                    color: classColors[result.class] || "#3B82F6",
                    fontFamily: "'Exo 2', sans-serif",
                    boxShadow: `0 0 30px ${classColors[result.class] || "#3B82F6"}40`,
                  }}
                >
                  {result.class}
                </div>

                {/* Name & Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-3xl font-black text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                      {result.name}
                    </h2>
                    {result.status === "online" && <span className="status-online text-xs">ONLINE</span>}
                    {result.grandResets > 0 && (
                      <span className="badge-lu badge-event">GR {result.grandResets} ⭐</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold" style={{ color: classColors[result.class], fontFamily: "'Rajdhani', sans-serif" }}>
                      {classFullNames[result.class]}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-sm text-slate-400">{result.guild} [{result.guildRole}]</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Last online: {result.lastOnline}</div>
                </div>

                {/* Key Stats + Progress */}
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[
                      { label: "Level", value: result.level, color: "#60A5FA" },
                      { label: "Resets", value: result.resets, color: "#3B82F6" },
                      { label: "Grand RST", value: result.grandResets, color: "#F59E0B" },
                    ].map(stat => (
                      <div key={stat.label} className="text-center">
                        <div
                          className="text-3xl font-bold"
                          style={{ fontFamily: "'Orbitron', monospace", color: stat.color }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Reset Progress Bar */}
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-400">Reset Progress</span>
                      <span className="text-xs font-bold text-blue-400">{result.resets}/50 to Grand Reset</span>
                    </div>
                    <div className="progress-bar-lu h-2">
                      <div className="progress-fill-lu h-2" style={{ width: `${(result.resets / 50) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Stats */}
              <div className="space-y-5">
                {/* Base Stats */}
                <div className="glass-card rounded-xl p-5" style={{ background: "rgba(8, 16, 32, 0.7)" }}>
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    <Zap size={16} className="text-blue-400" /> Character Stats
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Strength", value: result.strength, max: 32767 },
                      { label: "Agility", value: result.agility, max: 32767 },
                      { label: "Vitality", value: result.vitality, max: 32767 },
                      { label: "Energy", value: result.energy, max: 32767 },
                      ...(result.command > 0 ? [{ label: "Command", value: result.command, max: 32767 }] : []),
                    ].map(stat => (
                      <div key={stat.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{stat.label}</span>
                          <span className="text-blue-400 font-semibold" style={{ fontFamily: "'Orbitron', monospace" }}>
                            {stat.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="progress-bar-lu">
                          <div className="progress-fill-lu" style={{ width: `${(stat.value / stat.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PvP Stats */}
                <div className="glass-card rounded-xl p-5" style={{ background: "rgba(8, 16, 32, 0.7)" }}>
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    <Sword size={16} className="text-red-400" /> PvP Statistics
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "PvP Score", value: result.pvpScore.toLocaleString(), color: "#F59E0B" },
                      { label: "Kills", value: result.pkKills.toLocaleString(), color: "#10B981" },
                      { label: "Deaths", value: result.pkDeaths.toLocaleString(), color: "#EF4444" },
                      { label: "K/D Ratio", value: (result.pkKills / result.pkDeaths).toFixed(2), color: "#60A5FA" },
                      { label: "Master Level", value: result.masterLevel, color: "#A855F7" },
                    ].map(stat => (
                      <div key={stat.label} className="flex justify-between items-center py-1.5" style={{ borderBottom: "1px solid rgba(59,130,246,0.06)" }}>
                        <span className="text-sm text-slate-400">{stat.label}</span>
                        <span className="font-bold text-sm" style={{ color: stat.color, fontFamily: "'Orbitron', monospace" }}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="glass-card rounded-xl p-5" style={{ background: "rgba(8, 16, 32, 0.7)" }}>
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    <Award size={16} className="text-yellow-400" /> Achievements
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {result.achievements.map((ach: any) => (
                      <div
                        key={ach.name}
                        className={`achievement-card flex-col text-center p-2 ${ach.unlocked ? "unlocked" : ""}`}
                        style={{ opacity: ach.unlocked ? 1 : 0.3 }}
                        title={ach.name}
                      >
                        <div className="text-2xl mb-1">{ach.icon}</div>
                        <div className="text-xs text-slate-400 leading-tight">{ach.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Equipment */}
              <div className="lg:col-span-2">
                <div className="glass-card rounded-xl p-5" style={{ background: "rgba(8, 16, 32, 0.7)" }}>
                  <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    <Shield size={16} className="text-blue-400" /> Equipped Items
                  </h3>

                  {/* Equipment Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {equipSlots.map(({ key, label }) => {
                      const item = result.equipment[key];
                      return (
                        <div
                          key={key}
                          className={`item-slot h-auto flex-col gap-1 p-3 rounded-lg transition-all hover:scale-105 ${item ? `item-${item.rarity}` : ""}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderColor: item ? `${rarityColors[item.rarity]}60` : "rgba(59,130,246,0.15)",
                            background: item ? `${rarityColors[item.rarity]}12` : "rgba(6,13,31,0.6)",
                            boxShadow: item ? `0 0 12px ${rarityColors[item.rarity]}20` : "none",
                          }}
                          title={item?.name || `Empty ${label}`}
                        >
                          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                            {label}
                          </div>
                          {item ? (
                            <>
                              <div className="text-2xl">{item.icon}</div>
                              <div
                                className="text-xs font-semibold leading-tight text-center mt-1"
                                style={{ color: rarityColors[item.rarity] }}
                              >
                                {item.name}
                              </div>
                            </>
                          ) : (
                            <div className="text-slate-700 text-sm">Empty</div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Rarity Legend */}
                  <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(59,130,246,0.1)" }}>
                    <div className="text-xs text-slate-600 mb-2 uppercase tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      Item Rarity
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(rarityColors).map(([rarity, color]) => (
                        <div key={rarity} className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                          <span className="text-xs capitalize" style={{ color }}>{rarity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Summary */}
                <div className="glass-card rounded-xl p-5 mt-5" style={{ background: "rgba(8, 16, 32, 0.7)" }}>
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    <TrendingUp size={16} className="text-green-400" /> Progress Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Total Resets", value: result.resets + (result.grandResets * 100), icon: "🔄" },
                      { label: "Master Points", value: result.masterPoints.toLocaleString(), icon: "⭐" },
                      { label: "Member Since", value: result.joinDate, icon: "📅" },
                      { label: "Guild", value: result.guild, icon: "🏰" },
                    ].map(item => (
                      <div key={item.label} className="text-center p-3 rounded-lg" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.1)" }}>
                        <div className="text-xl mb-1">{item.icon}</div>
                        <div className="text-sm font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{item.value}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
