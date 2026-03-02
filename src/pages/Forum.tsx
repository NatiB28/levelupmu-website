/* =============================================================
   LEVELUP - FORUM PAGE
   Design: Celestial Glass Citadel
   Features: Category structure, thread previews
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { MessageSquare, Pin, Eye, ThumbsUp, Clock, ChevronRight, Plus, Search, Flame } from "lucide-react";
import { toast } from "sonner";

const forumCategories = [
  {
    id: 1,
    name: "Announcements",
    desc: "Official server news, updates, and maintenance notices",
    icon: "📢",
    color: "#3B82F6",
    threads: 47,
    posts: 312,
    pinned: true,
    threads_list: [
      { id: 1, title: "Season 20 Part 2 — Full Launch Notes", author: "Admin", replies: 89, views: 4821, date: "Mar 1", pinned: true, hot: true },
      { id: 2, title: "Server Maintenance — March 5, 2024", author: "Admin", replies: 23, views: 1847, date: "Mar 3", pinned: true, hot: false },
    ],
  },
  {
    id: 2,
    name: "General Discussion",
    desc: "Talk about anything related to LevelUP server",
    icon: "💬",
    color: "#10B981",
    threads: 284,
    posts: 2847,
    pinned: false,
    threads_list: [
      { id: 3, title: "Best class for beginners in S20P2?", author: "NewPlayer123", replies: 34, views: 892, date: "Mar 2", pinned: false, hot: true },
      { id: 4, title: "Guild recruitment — DeathBringers [Top Guild]", author: "DarkLord_X", replies: 67, views: 1234, date: "Mar 1", pinned: false, hot: false },
      { id: 5, title: "Tips for fast leveling and first reset", author: "ShadowMage", replies: 28, views: 743, date: "Feb 28", pinned: false, hot: false },
    ],
  },
  {
    id: 3,
    name: "Guides & Tutorials",
    desc: "Player-created guides, builds, and strategies",
    icon: "📖",
    color: "#F59E0B",
    threads: 156,
    posts: 1423,
    pinned: false,
    threads_list: [
      { id: 6, title: "[GUIDE] Complete Dark Lord Build — Season 20", author: "DarkLord_X", replies: 112, views: 5621, date: "Feb 25", pinned: true, hot: true },
      { id: 7, title: "[GUIDE] Grand Reset Guide — Everything You Need to Know", author: "BladeKnight", replies: 78, views: 3847, date: "Feb 20", pinned: false, hot: true },
      { id: 8, title: "Blood Castle Strategy Guide — All Levels", author: "ElvenArcher", replies: 45, views: 2134, date: "Feb 18", pinned: false, hot: false },
    ],
  },
  {
    id: 4,
    name: "PvP & Guilds",
    desc: "PvP discussions, guild wars, and competitive play",
    icon: "⚔️",
    color: "#EF4444",
    threads: 198,
    posts: 2156,
    pinned: false,
    threads_list: [
      { id: 9, title: "Castle Siege Results — February 2024", author: "GameMaster_1", replies: 156, views: 4312, date: "Feb 29", pinned: true, hot: true },
      { id: 10, title: "IronLegion vs DeathBringers — Epic Guild War", author: "ShadowMage", replies: 89, views: 2847, date: "Feb 27", pinned: false, hot: true },
    ],
  },
  {
    id: 5,
    name: "Help & Support",
    desc: "Technical issues, bug reports, and player support",
    icon: "🆘",
    color: "#A855F7",
    threads: 312,
    posts: 1847,
    pinned: false,
    threads_list: [
      { id: 11, title: "Cannot connect to server — Error 10061", author: "NewPlayer456", replies: 12, views: 234, date: "Mar 3", pinned: false, hot: false },
      { id: 12, title: "Item disappeared after combination — Need help", author: "RageFighter", replies: 8, views: 187, date: "Mar 2", pinned: false, hot: false },
    ],
  },
  {
    id: 6,
    name: "Suggestions",
    desc: "Share your ideas to improve the server",
    icon: "💡",
    color: "#06B6D4",
    threads: 89,
    posts: 634,
    pinned: false,
    threads_list: [
      { id: 13, title: "Add more PvP maps — Community Poll", author: "MysticSummon", replies: 45, views: 1234, date: "Feb 26", pinned: false, hot: false },
      { id: 14, title: "Suggestion: Weekly guild ranking system", author: "GrandMaster_Z", replies: 23, views: 567, date: "Feb 24", pinned: false, hot: false },
    ],
  },
];

export default function Forum() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = searchQuery
    ? forumCategories.map(cat => ({
        ...cat,
        threads_list: cat.threads_list.filter(t =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(cat => cat.threads_list.length > 0)
    : forumCategories;

  return (
    <Layout>
      {/* Header */}
      <div className="pt-24 pb-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="section-subtitle mb-2">Community Forum</div>
              <h1 className="section-title text-5xl mb-3">Forum</h1>
              <div className="section-divider" />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <input
                  type="text"
                  className="input-lu pl-9 text-sm"
                  placeholder="Search threads..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: "220px" }}
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              <button
                className="btn-primary-lu text-sm flex items-center gap-2"
                onClick={() => toast.info("Login required to post")}
              >
                <Plus size={14} />
                New Thread
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-16">
        {/* Forum Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Threads", value: "1,086", icon: MessageSquare, color: "#3B82F6" },
            { label: "Total Posts", value: "9,219", icon: MessageSquare, color: "#10B981" },
            { label: "Members", value: "8,432", icon: MessageSquare, color: "#F59E0B" },
            { label: "Online Now", value: "47", icon: MessageSquare, color: "#A855F7" },
          ].map(stat => (
            <div
              key={stat.label}
              className="glass-card p-4 text-center"
              style={{ background: "rgba(8, 16, 32, 0.7)" }}
            >
              <div
                className="text-xl font-bold mb-0.5"
                style={{ fontFamily: "'Orbitron', monospace", color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-slate-500" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {filteredCategories.map(category => (
            <div
              key={category.id}
              className="glass-card rounded-xl overflow-hidden"
              style={{ background: "rgba(8, 16, 32, 0.7)" }}
            >
              {/* Category Header */}
              <button
                className="w-full p-4 flex items-center gap-4 text-left transition-all hover:bg-blue-500/5"
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: `${category.color}10`,
                    border: `1px solid ${category.color}30`,
                  }}
                >
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: "'Exo 2', sans-serif" }}
                    >
                      {category.name}
                    </h3>
                    {category.pinned && (
                      <span className="badge-lu badge-update text-xs">OFFICIAL</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{category.desc}</p>
                </div>
                <div className="hidden md:flex items-center gap-6 text-center flex-shrink-0">
                  <div>
                    <div className="text-sm font-bold text-white" style={{ fontFamily: "'Orbitron', monospace" }}>
                      {category.threads}
                    </div>
                    <div className="text-xs text-slate-600">Threads</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white" style={{ fontFamily: "'Orbitron', monospace" }}>
                      {category.posts}
                    </div>
                    <div className="text-xs text-slate-600">Posts</div>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-500 transition-transform flex-shrink-0"
                  style={{ transform: expandedCategory === category.id ? "rotate(90deg)" : "none" }}
                />
              </button>

              {/* Thread List */}
              {expandedCategory === category.id && (
                <div style={{ borderTop: "1px solid rgba(59,130,246,0.1)" }}>
                  {category.threads_list.map(thread => (
                    <div
                      key={thread.id}
                      className="forum-thread mx-3 my-2"
                      onClick={() => toast.info("Thread view coming soon")}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            {thread.pinned && <Pin size={12} className="text-blue-400 flex-shrink-0" />}
                            {thread.hot && <Flame size={12} className="text-orange-400 flex-shrink-0" />}
                            <h4
                              className="text-sm font-semibold text-white hover:text-blue-300 transition-colors"
                              style={{ fontFamily: "'Rajdhani', sans-serif" }}
                            >
                              {thread.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-600">
                            <span>by <span className="text-slate-400">{thread.author}</span></span>
                            <span>·</span>
                            <span>{thread.date}</span>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center gap-4 text-xs text-slate-500 flex-shrink-0">
                          <div className="flex items-center gap-1">
                            <MessageSquare size={12} />
                            <span>{thread.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye size={12} />
                            <span>{thread.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="px-4 py-3">
                    <button
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                      onClick={() => toast.info("Full category view coming soon")}
                    >
                      View all {category.threads} threads <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
