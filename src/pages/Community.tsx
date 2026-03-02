/* =============================================================
   LEVELUP - COMMUNITY PAGE
   Design: Celestial Glass Citadel
   Features: Discord embed, social links, announcements, events
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { MessageSquare, Users, Bell, Calendar, ExternalLink, Zap, Star, Crown, Heart } from "lucide-react";
import { toast } from "sonner";

const announcements = [
  {
    id: 1,
    type: "update",
    title: "Server Maintenance — March 5, 2024",
    content: "We will be performing scheduled maintenance on March 5th from 02:00 to 04:00 UTC. The server will be offline during this time. New content and performance improvements will be applied.",
    date: "Mar 3, 2024",
    pinned: true,
    author: "Admin",
  },
  {
    id: 2,
    type: "event",
    title: "Double EXP Weekend — March 8-10",
    content: "Celebrate the server's 3-month anniversary with a Double EXP weekend! All players will receive 2x experience points from Friday evening through Sunday midnight.",
    date: "Mar 2, 2024",
    pinned: true,
    author: "GameMaster",
  },
  {
    id: 3,
    type: "new",
    title: "New Guild War System — Coming Soon",
    content: "We're excited to announce the upcoming Guild War system overhaul. Guilds will be able to declare wars, compete for territory, and earn exclusive guild rewards.",
    date: "Feb 28, 2024",
    pinned: false,
    author: "Developer",
  },
  {
    id: 4,
    type: "update",
    title: "Balance Patch v2.4.1 — Class Adjustments",
    content: "Several class balance adjustments have been made based on community feedback. Dark Lord and Rage Fighter have received minor buffs, while Magic Gladiator PvP damage has been slightly reduced.",
    date: "Feb 25, 2024",
    pinned: false,
    author: "GameMaster",
  },
  {
    id: 5,
    type: "event",
    title: "Weekly PvP Tournament — Saturday 20:00 UTC",
    content: "Join the weekly PvP tournament every Saturday at 20:00 UTC. Top 3 players win credits, exclusive items, and a special tournament title. Register in-game via the Event NPC.",
    date: "Feb 22, 2024",
    pinned: false,
    author: "GameMaster",
  },
];

const socialLinks = [
  { name: "Discord", desc: "Join 2,400+ members", icon: "💬", color: "#5865F2", members: "2,412", url: "#" },
  { name: "Facebook", desc: "Like our page", icon: "📘", color: "#1877F2", members: "1,847", url: "#" },
  { name: "YouTube", desc: "Watch guides & events", icon: "▶️", color: "#FF0000", members: "892", url: "#" },
  { name: "Telegram", desc: "Get instant updates", icon: "✈️", color: "#2AABEE", members: "634", url: "#" },
];

const staffTeam = [
  { name: "ServerAdmin", role: "Server Administrator", class: "DL", online: true },
  { name: "GameMaster_1", role: "Game Master", class: "SM", online: true },
  { name: "GameMaster_2", role: "Game Master", class: "BK", online: false },
  { name: "Support_Alex", role: "Support Staff", class: "ELF", online: true },
  { name: "Developer_Z", role: "Developer", class: "MG", online: false },
];

const typeColors: Record<string, string> = {
  update: "#3B82F6",
  event: "#F59E0B",
  new: "#10B981",
};

const typeLabels: Record<string, string> = {
  update: "UPDATE",
  event: "EVENT",
  new: "NEW",
};

export default function Community() {
  const [expandedAnn, setExpandedAnn] = useState<number | null>(null);

  return (
    <Layout>
      {/* Header */}
      <div className="pt-24 pb-10">
        <div className="container text-center">
          <div className="section-subtitle mb-2">Join the Community</div>
          <h1 className="section-title text-5xl mb-3">Community Hub</h1>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-slate-400 max-w-lg mx-auto">
            Connect with thousands of players, stay updated with announcements, and be part of the LevelUP family.
          </p>
        </div>
      </div>

      <div className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Announcements */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Bell size={20} className="text-blue-400" />
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Live Announcements
              </h2>
            </div>

            <div className="space-y-3">
              {announcements.map(ann => (
                <div
                  key={ann.id}
                  className="glass-card rounded-xl overflow-hidden cursor-pointer"
                  style={{ background: "rgba(8, 16, 32, 0.7)" }}
                  onClick={() => setExpandedAnn(expandedAnn === ann.id ? null : ann.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {ann.pinned && (
                        <div className="mt-0.5 flex-shrink-0">
                          <Star size={14} className="text-yellow-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span
                            className="badge-lu text-xs"
                            style={{
                              background: `${typeColors[ann.type]}15`,
                              color: typeColors[ann.type],
                              border: `1px solid ${typeColors[ann.type]}30`,
                            }}
                          >
                            {typeLabels[ann.type]}
                          </span>
                          {ann.pinned && (
                            <span className="badge-lu badge-event text-xs">PINNED</span>
                          )}
                        </div>
                        <h3
                          className="text-white font-bold text-base"
                          style={{ fontFamily: "'Exo 2', sans-serif" }}
                        >
                          {ann.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <span>By {ann.author}</span>
                          <span>·</span>
                          <span>{ann.date}</span>
                        </div>
                      </div>
                    </div>

                    {expandedAnn === ann.id && (
                      <div
                        className="mt-3 pt-3 text-sm text-slate-300 leading-relaxed"
                        style={{ borderTop: "1px solid rgba(59,130,246,0.1)" }}
                      >
                        {ann.content}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Social + Discord + Staff */}
          <div className="space-y-6">
            {/* Discord Widget */}
            <div
              className="glass-card rounded-xl overflow-hidden"
              style={{ background: "rgba(8, 16, 32, 0.7)" }}
            >
              <div
                className="p-4 flex items-center gap-3"
                style={{ background: "rgba(88, 101, 242, 0.15)", borderBottom: "1px solid rgba(88,101,242,0.2)" }}
              >
                <div className="text-2xl">💬</div>
                <div>
                  <div className="font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    LevelUP Discord
                  </div>
                  <div className="text-xs text-slate-400">Official Community Server</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px #10B981" }} />
                    <span className="text-sm text-green-400 font-semibold">247 Online</span>
                  </div>
                  <span className="text-xs text-slate-500">2,412 Members</span>
                </div>

                {/* Channels Preview */}
                <div className="space-y-1 mb-4">
                  {[
                    { name: "# announcements", unread: 3 },
                    { name: "# general-chat", unread: 0 },
                    { name: "# help-support", unread: 12 },
                    { name: "# pvp-discussion", unread: 5 },
                  ].map(ch => (
                    <div
                      key={ch.name}
                      className="flex items-center justify-between px-2 py-1.5 rounded-lg"
                      style={{ background: "rgba(59,130,246,0.04)" }}
                    >
                      <span className="text-xs text-slate-400">{ch.name}</span>
                      {ch.unread > 0 && (
                        <span
                          className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: "#5865F2", color: "white", fontSize: "0.65rem" }}
                        >
                          {ch.unread}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className="w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: "#5865F2",
                    color: "white",
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                  onClick={() => toast.info("Discord invite link coming soon")}
                >
                  <ExternalLink size={14} />
                  Join Discord Server
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div
              className="glass-card rounded-xl p-4"
              style={{ background: "rgba(8, 16, 32, 0.7)" }}
            >
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                <Users size={16} className="text-blue-400" /> Follow Us
              </h3>
              <div className="space-y-2">
                {socialLinks.map(social => (
                  <button
                    key={social.name}
                    className="w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left"
                    style={{
                      background: "rgba(59,130,246,0.04)",
                      border: "1px solid rgba(59,130,246,0.1)",
                    }}
                    onClick={() => toast.info(`${social.name} link coming soon`)}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: `${social.color}20`, border: `1px solid ${social.color}30` }}
                    >
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        {social.name}
                      </div>
                      <div className="text-xs text-slate-500">{social.members} followers</div>
                    </div>
                    <ExternalLink size={14} className="text-slate-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Staff Online */}
            <div
              className="glass-card rounded-xl p-4"
              style={{ background: "rgba(8, 16, 32, 0.7)" }}
            >
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                <Crown size={16} className="text-yellow-400" /> Staff Team
              </h3>
              <div className="space-y-2">
                {staffTeam.map(staff => (
                  <div key={staff.name} className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: "rgba(59,130,246,0.1)",
                          border: "1px solid rgba(59,130,246,0.25)",
                          color: "#60A5FA",
                          fontFamily: "'Rajdhani', sans-serif",
                        }}
                      >
                        {staff.class}
                      </div>
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                        style={{
                          background: staff.online ? "#10B981" : "#475569",
                          borderColor: "rgba(8,16,32,0.9)",
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        {staff.name}
                      </div>
                      <div className="text-xs text-slate-500 truncate">{staff.role}</div>
                    </div>
                    <span className={`text-xs font-semibold ${staff.online ? "text-green-400" : "text-slate-600"}`}>
                      {staff.online ? "Online" : "Offline"}
                    </span>
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
