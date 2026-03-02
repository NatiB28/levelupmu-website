/* =============================================================
   LEVELUP - DONATION SHOP PAGE
   Design: Celestial Glass Citadel — MMORPG Marketplace
   Features: Packages, Items, Credits, PayPal integration
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { ShoppingBag, CreditCard, Package, Gem, Star, Zap, Crown, Shield, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const DONATION_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395669918/9pfs76ogq3ifCL2XhYksmg/donation-bg-dPATdvMMX5jtQEhTUCBTi9.webp";

// ===== DATA =====
const creditPackages = [
  { id: 1, name: "Starter Pack", credits: 1000, price: 5, bonus: 0, popular: false, icon: "💎", color: "#60A5FA" },
  { id: 2, name: "Warrior Pack", credits: 2500, price: 10, bonus: 500, popular: false, icon: "⚔️", color: "#3B82F6" },
  { id: 3, name: "Champion Pack", credits: 6000, price: 20, bonus: 2000, popular: true, icon: "🏆", color: "#F59E0B" },
  { id: 4, name: "Legend Pack", credits: 15000, price: 40, bonus: 7500, popular: false, icon: "👑", color: "#A855F7" },
  { id: 5, name: "Ultimate Pack", credits: 40000, price: 80, bonus: 25000, popular: false, icon: "🌟", color: "#EF4444" },
];

const shopItems = [
  { id: 1, name: "Wings of Darkness", category: "wings", price: 2500, rarity: "ancient", icon: "🪽", desc: "Legendary wings with +15 bonus stats and special visual effect" },
  { id: 2, name: "Ancient Set Box", category: "armor", price: 3500, rarity: "ancient", icon: "📦", desc: "Contains a full Ancient armor set for your character class" },
  { id: 3, name: "Chaos Jewel x50", category: "jewels", price: 800, rarity: "excellent", icon: "🔮", desc: "50x Chaos Jewels for item combination" },
  { id: 4, name: "Bless Jewel x100", category: "jewels", price: 1200, rarity: "excellent", icon: "✨", desc: "100x Jewels of Bless for item upgrade" },
  { id: 5, name: "VIP Status (30 Days)", category: "vip", price: 5000, rarity: "set", icon: "⭐", desc: "30 days of VIP status: 2x EXP, special chat color, exclusive VIP zone access" },
  { id: 6, name: "Reset Scroll", category: "utility", price: 1500, rarity: "magic", icon: "📜", desc: "Instantly perform a reset without meeting level requirements" },
  { id: 7, name: "Luck Potion x10", category: "potions", price: 600, rarity: "magic", icon: "🧪", desc: "10x Luck Potions that increase item combination success rate by 30%" },
  { id: 8, name: "Custom Title", category: "cosmetic", price: 2000, rarity: "excellent", icon: "🏷️", desc: "Choose a custom title displayed above your character name" },
  { id: 9, name: "Mount: Dragon", category: "mount", price: 4500, rarity: "ancient", icon: "🐉", desc: "Exclusive Dragon mount with 30% movement speed bonus" },
  { id: 10, name: "Inventory Expansion", category: "utility", price: 1800, rarity: "set", icon: "🎒", desc: "Permanently expand your inventory by 2 rows" },
  { id: 11, name: "Socket Jewel x20", category: "jewels", price: 2200, rarity: "socket", icon: "💠", desc: "20x Socket Jewels for adding bonus options to items" },
  { id: 12, name: "Name Change", category: "cosmetic", price: 1000, rarity: "magic", icon: "✏️", desc: "Change your character name once" },
];

const categories = ["all", "wings", "armor", "jewels", "vip", "utility", "potions", "cosmetic", "mount"];

const rarityColors: Record<string, string> = {
  magic: "#3B82F6", set: "#10B981", excellent: "#F59E0B", ancient: "#EF4444", socket: "#A855F7",
};

export default function DonationShop() {
  const [activeTab, setActiveTab] = useState<"packages" | "items">("packages");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<number[]>([]);

  const filteredItems = activeCategory === "all"
    ? shopItems
    : shopItems.filter(i => i.category === activeCategory);

  const addToCart = (id: number, name: string) => {
    setCart(prev => [...prev, id]);
    toast.success(`${name} added to cart!`);
  };

  const handlePurchase = (name: string, price: number) => {
    toast.info(`Redirecting to PayPal for ${name} — $${price}...`);
    // In production: redirect to PayPal payment URL
  };

  return (
    <Layout>
      {/* Hero */}
      <div className="relative pt-16 pb-12">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${DONATION_BG})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,13,31,0.6), rgba(6,13,31,0.98))" }} />
        <div className="container relative z-10 pt-8 text-center">
          <div className="section-subtitle mb-2">Support the Server</div>
          <h1 className="section-title text-5xl mb-3">Donation Shop</h1>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-slate-400 max-w-lg mx-auto">
            Support LevelUP and get exclusive in-game items and credits. All purchases are cosmetic or convenience — no pay-to-win.
          </p>
        </div>
      </div>

      <div className="container pb-16">
        {/* PayPal Notice */}
        <div
          className="flex items-center gap-4 p-4 rounded-xl mb-8"
          style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)" }}
        >
          <div className="text-3xl">🔒</div>
          <div>
            <div className="text-sm font-bold text-blue-300" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Secure PayPal Payments
            </div>
            <div className="text-xs text-slate-500">
              All transactions are processed securely via PayPal. Credits are delivered to your account within 5 minutes of payment confirmation.
            </div>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-2 text-sm text-slate-400">
            <span>🔐 SSL Secured</span>
            <span>⚡ Instant Delivery</span>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-2 mb-8 p-1 rounded-xl w-fit"
          style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(59,130,246,0.15)" }}
        >
          <button className={`tab-lu flex items-center gap-2 ${activeTab === "packages" ? "active" : ""}`} onClick={() => setActiveTab("packages")}>
            <Package size={14} /> Credit Packages
          </button>
          <button className={`tab-lu flex items-center gap-2 ${activeTab === "items" ? "active" : ""}`} onClick={() => setActiveTab("items")}>
            <ShoppingBag size={14} /> Item Shop
          </button>
        </div>

        {/* Credit Packages */}
        {activeTab === "packages" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {creditPackages.map(pkg => (
                <div
                  key={pkg.id}
                  className={`donation-package group ${pkg.popular ? "featured" : ""}`}
                  style={{
                    transform: pkg.popular ? "scale(1.05)" : "scale(1)",
                    zIndex: pkg.popular ? 10 : 1,
                  }}
                >
                  {pkg.popular && (
                    <div
                      className="text-center py-1.5 text-xs font-bold uppercase tracking-wider"
                      style={{
                        background: "linear-gradient(90deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))",
                        color: "#F59E0B",
                        fontFamily: "'Rajdhani', sans-serif",
                        letterSpacing: "0.1em",
                      }}
                    >
                      ⭐ Most Popular
                    </div>
                  )}
                  <div className="p-5">
                    <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">{pkg.icon}</div>
                    <h3
                      className="text-lg font-bold text-white text-center mb-1"
                      style={{ fontFamily: "'Exo 2', sans-serif" }}
                    >
                      {pkg.name}
                    </h3>

                    <div className="text-center my-5">
                      <div
                        className="text-4xl font-black"
                        style={{ fontFamily: "'Orbitron', monospace", color: pkg.color }}
                      >
                        {pkg.credits.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Credits</div>
                      {pkg.bonus > 0 && (
                        <div className="text-xs text-green-400 mt-1 font-semibold">
                          +{pkg.bonus.toLocaleString()} Bonus Credits!
                        </div>
                      )}
                    </div>

                    <div className="text-center mb-4">
                      <span
                        className="text-2xl font-black text-white"
                        style={{ fontFamily: "'Exo 2', sans-serif" }}
                      >
                        ${pkg.price}
                      </span>
                      <span className="text-slate-500 text-sm"> USD</span>
                    </div>

                    <button
                      className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2`}
                      style={{
                        background: pkg.popular
                          ? "linear-gradient(135deg, #92400E, #F59E0B)"
                          : "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                        border: `1px solid ${pkg.popular ? "rgba(245,158,11,0.4)" : "rgba(96,165,250,0.4)"}`,
                        color: "white",
                        fontFamily: "'Rajdhani', sans-serif",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                      onClick={() => handlePurchase(pkg.name, pkg.price)}
                    >
                      <CreditCard size={14} />
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Value Comparison */}
            <div
              className="mt-8 p-5 rounded-xl"
              style={{ background: "rgba(10,22,40,0.5)", border: "1px solid rgba(59,130,246,0.15)" }}
            >
              <h3 className="text-base font-bold text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Credit Value Guide
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {[
                  { item: "Reset Scroll", cost: "1,500 Credits" },
                  { item: "VIP (30 Days)", cost: "5,000 Credits" },
                  { item: "Ancient Set Box", cost: "3,500 Credits" },
                  { item: "Wings of Darkness", cost: "2,500 Credits" },
                ].map(v => (
                  <div key={v.item} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
                    <span className="text-slate-400">{v.item}</span>
                    <span className="text-blue-400 font-semibold" style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.8rem" }}>
                      {v.cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Item Shop */}
        {activeTab === "items" && (
          <div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`tab-lu capitalize ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map(item => (
                <div key={item.id} className="shop-item-card hover:scale-105 transition-transform duration-300 hover:shadow-lg" style={{ boxShadow: `0 0 20px ${rarityColors[item.rarity]}30` }}>
                  <div
                    className="item-badge"
                    style={{ top: "10px", right: "10px" }}
                  >
                    <span
                      className="badge-lu text-xs capitalize"
                      style={{
                        background: `${rarityColors[item.rarity]}15`,
                        color: rarityColors[item.rarity],
                        border: `1px solid ${rarityColors[item.rarity]}30`,
                      }}
                    >
                      {item.rarity}
                    </span>
                  </div>

                  {/* Item Icon Area */}
                  <div
                    className="flex items-center justify-center h-24"
                    style={{
                      background: `linear-gradient(135deg, rgba(10,22,40,0.8), ${rarityColors[item.rarity]}08)`,
                      borderBottom: `1px solid ${rarityColors[item.rarity]}20`,
                    }}
                  >
                    <div
                      className="text-5xl"
                      style={{ filter: `drop-shadow(0 0 12px ${rarityColors[item.rarity]}60)` }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3
                      className="font-bold text-white mb-1"
                      style={{ fontFamily: "'Exo 2', sans-serif", color: rarityColors[item.rarity] }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">{item.desc}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className="text-xl font-black"
                          style={{ fontFamily: "'Orbitron', monospace", color: "#60A5FA" }}
                        >
                          {item.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 ml-1">Credits</span>
                      </div>
                      <button
                        className="btn-primary-lu text-xs py-1.5 px-4"
                        onClick={() => addToCart(item.id, item.name)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div
                className="fixed bottom-6 right-6 z-50 p-4 rounded-xl flex items-center gap-4"
                style={{
                  background: "rgba(8, 16, 32, 0.95)",
                  border: "1px solid rgba(59,130,246,0.4)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(59,130,246,0.2)",
                }}
              >
                <ShoppingBag size={20} className="text-blue-400" />
                <div>
                  <div className="text-white font-bold text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    {cart.length} item{cart.length > 1 ? "s" : ""} in cart
                  </div>
                  <div className="text-xs text-slate-500">
                    {cart.reduce((sum, id) => sum + (shopItems.find(i => i.id === id)?.price || 0), 0).toLocaleString()} Credits
                  </div>
                </div>
                <button
                  className="btn-primary-lu text-sm py-1.5 px-4"
                  onClick={() => { toast.info("Checkout requires login"); setCart([]); }}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
