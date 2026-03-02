/* =============================================================
   LEVELUP - INFO PAGE
   Design: Celestial Glass Citadel
   Features: Server rules, beginner guide, progress system
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { BookOpen, Shield, TrendingUp, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Star, Zap } from "lucide-react";

type TabType = "rules" | "guide" | "progress";

const serverRules = [
  {
    category: "General Conduct",
    icon: "🤝",
    rules: [
      { severity: "ban", text: "No hacking, cheating, or using unauthorized third-party software." },
      { severity: "ban", text: "No account sharing or selling accounts for real money outside official channels." },
      { severity: "warn", text: "Treat all players and staff with respect. Harassment and hate speech are not tolerated." },
      { severity: "warn", text: "No spamming in chat channels. Keep conversations relevant to the channel topic." },
      { severity: "info", text: "English is the primary language in global chat. Use national channels for other languages." },
    ],
  },
  {
    category: "PvP Rules",
    icon: "⚔️",
    rules: [
      { severity: "info", text: "PvP is allowed in designated PvP zones. Safe zones are strictly non-PvP." },
      { severity: "warn", text: "Spawn killing (repeatedly killing a player who just respawned) is prohibited." },
      { severity: "info", text: "Guild wars must be declared through the official in-game system." },
      { severity: "ban", text: "Exploiting PvP bugs or glitches to gain unfair advantage will result in a ban." },
    ],
  },
  {
    category: "Trading & Economy",
    icon: "💰",
    rules: [
      { severity: "info", text: "All trades are final. Staff cannot reverse trades due to player mistakes." },
      { severity: "ban", text: "Scamming other players is strictly prohibited and will result in a permanent ban." },
      { severity: "warn", text: "Real-money trading (RMT) outside the official donation shop is not allowed." },
      { severity: "info", text: "Report suspicious pricing or market manipulation to staff." },
    ],
  },
  {
    category: "Staff & Appeals",
    icon: "👑",
    rules: [
      { severity: "info", text: "Staff decisions are final in-game. Appeals must be submitted through the forum." },
      { severity: "warn", text: "Impersonating staff members will result in an immediate ban." },
      { severity: "info", text: "Bug reports should be submitted privately to staff, not announced publicly." },
      { severity: "ban", text: "Attempting to bribe or threaten staff members is a permanent bannable offense." },
    ],
  },
];

const beginnerGuide = [
  {
    step: 1,
    title: "Choose Your Class",
    icon: "⚔️",
    content: "LevelUP offers 11 character classes. For beginners, we recommend Dark Knight (tanky, easy to play), Soul Master (powerful magic), or Muse Elf (support/ranged). Each class has unique skills and playstyle.",
  },
  {
    step: 2,
    title: "Leveling to 400",
    icon: "📈",
    content: "Your first goal is reaching Level 400. Use the Lorencia hunting grounds for levels 1-50, then move to Noria (50-150), Devias (150-250), and Lost Tower (250-400). Use EXP potions from the starter kit!",
  },
  {
    step: 3,
    title: "Your First Reset",
    icon: "🔄",
    content: "At Level 400, you can perform a Reset. This resets your level to 1 but gives you bonus stat points. Each reset makes you significantly stronger. Aim for your first reset within your first week.",
  },
  {
    step: 4,
    title: "Stat Distribution",
    icon: "📊",
    content: "After each reset, distribute your stat points wisely. Most players put points into their primary stat (Strength for DK/BK, Energy for SM/ELF, etc.) and enough Vitality for survival. Check class guides on the forum.",
  },
  {
    step: 5,
    title: "Item Progression",
    icon: "🛡️",
    content: "Start with Normal items, upgrade to +9 or higher, then aim for Excellent items. Ancient sets are the best non-donation gear. Use Jewels of Bless and Soul to upgrade items. Never combine without backup!",
  },
  {
    step: 6,
    title: "Join a Guild",
    icon: "🏰",
    content: "Joining a guild is highly recommended. Guilds provide protection, help with leveling, and access to guild events like Castle Siege. Check the Guild Recruitment section on the forum.",
  },
  {
    step: 7,
    title: "Daily Activities",
    icon: "📅",
    content: "Participate in daily events: Blood Castle, Devil Square, Chaos Castle, and Illusion Temple. These events give excellent rewards and are great for leveling. Check the event schedule in-game.",
  },
  {
    step: 8,
    title: "Grand Resets",
    icon: "⭐",
    content: "After completing 50 resets, you can perform a Grand Reset. This gives massive stat bonuses and a special title. Grand Reset players are the most powerful on the server.",
  },
];

const progressSystem = [
  {
    tier: "Novice",
    icon: "🌱",
    color: "#64748B",
    range: "0-10 Resets",
    desc: "Starting your journey. Focus on leveling, learning the game mechanics, and joining a guild.",
    perks: ["Starter Kit items", "Beginner EXP boost (2x)", "Access to basic hunting grounds"],
  },
  {
    tier: "Warrior",
    icon: "⚔️",
    color: "#3B82F6",
    range: "11-25 Resets",
    desc: "You've mastered the basics. Start participating in events and PvP. Upgrade your gear.",
    perks: ["Access to Blood Castle", "PvP zones unlocked", "Guild creation allowed"],
  },
  {
    tier: "Champion",
    icon: "🏆",
    color: "#10B981",
    range: "26-50 Resets",
    desc: "A seasoned warrior. Compete in weekly tournaments and aim for the leaderboard.",
    perks: ["Tournament participation", "Weekly ranking rewards", "Advanced hunting zones"],
  },
  {
    tier: "Legend",
    icon: "👑",
    color: "#F59E0B",
    range: "1-3 Grand Resets",
    desc: "Elite status. You are among the most powerful players on the server.",
    perks: ["Grand Reset title", "Exclusive Legend zone", "Priority support", "Special chat color"],
  },
  {
    tier: "Immortal",
    icon: "🌟",
    color: "#EF4444",
    range: "4+ Grand Resets",
    desc: "The pinnacle of power. Immortals are the server's elite and have shaped its history.",
    perks: ["Immortal title", "Hall of Fame listing", "Custom character aura", "Exclusive Immortal events"],
  },
];

export default function Info() {
  const [activeTab, setActiveTab] = useState<TabType>("guide");
  const [expandedRule, setExpandedRule] = useState<number | null>(0);

  return (
    <Layout>
      {/* Header */}
      <div className="pt-24 pb-10">
        <div className="container text-center">
          <div className="section-subtitle mb-2">Knowledge Base</div>
          <h1 className="section-title text-5xl mb-3">Information Center</h1>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-slate-400 max-w-lg mx-auto">
            Everything you need to know about LevelUP server rules, how to get started, and the progression system.
          </p>
        </div>
      </div>

      <div className="container pb-16">
        {/* Tabs */}
        <div
          className="flex gap-2 mb-8 p-1 rounded-xl w-fit"
          style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(59,130,246,0.15)" }}
        >
          {[
            { id: "guide" as TabType, label: "Beginner Guide", icon: BookOpen },
            { id: "rules" as TabType, label: "Server Rules", icon: Shield },
            { id: "progress" as TabType, label: "Progress System", icon: TrendingUp },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-lu flex items-center gap-2 ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Beginner Guide */}
        {activeTab === "guide" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>Getting Started</h2>
              <p className="text-slate-400 text-sm">Follow these 8 essential steps to become a powerful warrior on LevelUP.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {beginnerGuide.map(item => (
                <div
                  key={item.step}
                  className="glass-card rounded-xl p-6 flex gap-4 hover:scale-105 transition-transform duration-300 group"
                  style={{
                    background: "linear-gradient(135deg, rgba(8,16,32,0.8) 0%, rgba(59,130,246,0.08) 100%)",
                    border: "1px solid rgba(59,130,246,0.2)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{
                      background: "rgba(59,130,246,0.15)",
                      border: "1px solid rgba(59,130,246,0.4)",
                      boxShadow: "0 0 15px rgba(59,130,246,0.2)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold px-2 py-1 rounded"
                        style={{ color: "#60A5FA", background: "rgba(96,165,250,0.1)", fontFamily: "'Orbitron', monospace" }}
                      >
                        STEP {item.step}
                      </span>
                    </div>
                    <h3
                      className="text-base font-bold text-white mb-2"
                      style={{ fontFamily: "'Exo 2', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Tips */}
            <div
              className="mt-8 p-6 rounded-xl"
              style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)" }}
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                <Zap size={18} className="text-yellow-400" /> Pro Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Always carry Bless and Soul Jewels for item upgrades",
                  "Use the /post command to sell items in global chat",
                  "Check the event schedule daily for bonus rewards",
                  "Join the Discord for real-time help from the community",
                  "Save your Chaos Jewels for high-level combinations",
                  "Complete the starter quest chain for bonus credits",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Server Rules */}
        {activeTab === "rules" && (
          <div>
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-6"
              style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <AlertTriangle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-300 leading-relaxed">
                Violating server rules may result in warnings, temporary bans, or permanent bans depending on severity. Ignorance of the rules is not an excuse. All players are expected to read and follow these rules.
              </p>
            </div>

            {/* Severity Legend */}
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { level: "ban", label: "Permanent Ban", color: "#EF4444" },
                { level: "warn", label: "Warning / Temp Ban", color: "#F59E0B" },
                { level: "info", label: "Informational", color: "#3B82F6" },
              ].map(s => (
                <div key={s.level} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs text-slate-400">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {serverRules.map((category, idx) => (
                <div
                  key={category.category}
                  className="glass-card rounded-xl overflow-hidden"
                  style={{ background: "rgba(8, 16, 32, 0.7)" }}
                >
                  <button
                    className="w-full p-4 flex items-center gap-3 text-left"
                    onClick={() => setExpandedRule(expandedRule === idx ? null : idx)}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="flex-1 text-base font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                      {category.category}
                    </h3>
                    <span className="text-xs text-slate-500">{category.rules.length} rules</span>
                    {expandedRule === idx ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                  </button>

                  {expandedRule === idx && (
                    <div className="px-4 pb-4 space-y-2" style={{ borderTop: "1px solid rgba(59,130,246,0.1)" }}>
                      {category.rules.map((rule, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-start gap-3 p-3 rounded-lg"
                          style={{
                            background: rule.severity === "ban"
                              ? "rgba(239,68,68,0.04)"
                              : rule.severity === "warn"
                              ? "rgba(245,158,11,0.04)"
                              : "rgba(59,130,246,0.04)",
                            borderLeft: `3px solid ${rule.severity === "ban" ? "#EF4444" : rule.severity === "warn" ? "#F59E0B" : "#3B82F6"}`,
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              background: rule.severity === "ban" ? "#EF4444" : rule.severity === "warn" ? "#F59E0B" : "#3B82F6",
                            }}
                          />
                          <p className="text-sm text-slate-300 leading-relaxed">{rule.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress System */}
        {activeTab === "progress" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>Progression Tiers</h2>
              <p className="text-slate-400 text-sm">Unlock new features and benefits as you progress through the ranks.</p>
            </div>

            <div className="space-y-4">
              {progressSystem.map((tier, idx) => (
                <div
                  key={tier.tier}
                  className="glass-card rounded-xl p-6 flex flex-col md:flex-row gap-5 hover:scale-105 transition-transform duration-300 group"
                  style={{
                    background: `linear-gradient(135deg, ${tier.color}08 0%, rgba(8,16,32,0.8) 100%)`,
                    borderLeft: `4px solid ${tier.color}`,
                    border: `1px solid ${tier.color}30`,
                  }}
                >
                  <div className="flex items-center gap-4 md:w-48 flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform"
                      style={{
                        background: `${tier.color}15`,
                        border: `1px solid ${tier.color}40`,
                        boxShadow: `0 0 20px ${tier.color}20`,
                      }}
                    >
                      {tier.icon}
                    </div>
                    <div>
                      <div className="font-black text-lg" style={{ color: tier.color, fontFamily: "'Exo 2', sans-serif" }}>
                        {tier.tier}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: "'Orbitron', monospace" }}>
                        {tier.range}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-slate-300 mb-3 leading-relaxed">{tier.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {tier.perks.map(perk => (
                        <div
                          key={perk}
                          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: `${tier.color}10`,
                            border: `1px solid ${tier.color}25`,
                            color: tier.color,
                          }}
                        >
                          <CheckCircle size={10} />
                          {perk}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reset Formula */}
            <div
              className="mt-8 p-6 rounded-xl"
              style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)" }}
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                <TrendingUp size={18} className="text-blue-400" /> Reset & Grand Reset System
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-bold text-blue-300 mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Reset Requirements</h4>
                  <div className="space-y-1.5 text-slate-400">
                    <div>• Reach Level 400</div>
                    <div>• Visit the Reset NPC in Lorencia</div>
                    <div>• No Zen cost (free resets)</div>
                    <div>• Level resets to 1, stats reset</div>
                    <div>• Bonus stat points per reset: +50</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-300 mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Grand Reset Requirements</h4>
                  <div className="space-y-1.5 text-slate-400">
                    <div>• Complete 50 regular resets</div>
                    <div>• Visit the Grand Reset NPC</div>
                    <div>• All resets reset to 0</div>
                    <div>• Massive bonus stats granted</div>
                    <div>• Exclusive Grand Reset title unlocked</div>
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
