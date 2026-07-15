import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useConfig, WebsiteConfig } from "../utils/ConfigContext";
import InventoryDashboard from "./InventoryDashboard";
import { 
  Lock, Save, RotateCcw, CheckCircle, 
  Settings, Phone, Layout, BookOpen, Sparkles, 
  ArrowLeft, LogOut, Database, Clock, Check, 
  HelpCircle, AlertCircle, ShieldAlert
} from "lucide-react";

export default function AdminPanel() {
  const { config, updateConfig, resetToDefault } = useConfig();
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return sessionStorage.getItem("alramz_admin_authorized") === "true";
  });
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"general" | "hero" | "about" | "benefits" | "inventory" | "faq">("general");
  const [tempConfig, setTempConfig] = useState<WebsiteConfig>({ ...config });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [time, setTime] = useState(new Date());

  // Dynamic Live Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync temp configuration if the main configuration changes
  useEffect(() => {
    setTempConfig({ ...config });
  }, [config]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123" || password === "alramz786") {
      setIsAuthorized(true);
      sessionStorage.setItem("alramz_admin_authorized", "true");
      setLoginError("");
    } else {
      setLoginError("Access Denied: Invalid secure access token.");
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem("alramz_admin_authorized");
  };

  const handleFieldChange = (key: keyof WebsiteConfig, value: string) => {
    setTempConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      updateConfig(tempConfig);
      setSaveStatus("success");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
    }, 800);
  };

  const handleReset = () => {
    resetToDefault();
    setTempConfig({ ...config });
    setShowResetConfirm(false);
    setSaveStatus("success");
    setTimeout(() => setSaveStatus("idle"), 1500);
  };

  const handleGoHome = () => {
    window.location.hash = "#/";
  };

  // Helper to count active batch items in localStorage
  const getBatchCount = () => {
    try {
      const saved = localStorage.getItem("alramz_inventory_records");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length;
      }
    } catch (e) {
      // fallback
    }
    return 3;
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Auth Screen */}
      {!isAuthorized ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#090D16]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-xl text-center relative"
          >
            <button 
              onClick={handleGoHome}
              className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Site
            </button>

            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6 border border-blue-500/10 mt-4">
              <Lock className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-bold tracking-tight mb-2 text-white">
              Admin Access Required
            </h3>
            <p className="text-slate-400 text-xs max-w-xs mx-auto mb-8">
              Verify your security credentials to manage live catalogs, contact info, and production batches.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter access code (admin123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm outline-none text-center transition-all text-white placeholder:text-slate-600"
                  autoFocus
                />
              </div>

              {loginError && (
                <p className="text-rose-400 text-xs flex items-center gap-1.5 justify-center bg-rose-500/10 py-2.5 px-3 rounded-lg border border-rose-500/10">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" /> {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>ALR-OPERATOR</span>
              <span>{time.toLocaleTimeString()}</span>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Clean Administration Dashboard Layout */
        <div className="flex-1 flex flex-col">
          
          {/* Elegant Top Header */}
          <header className="bg-slate-900 border-b border-slate-800 px-6 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-30 shadow-md">
            
            {/* Brand Logo & Info */}
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-md font-bold tracking-tight uppercase text-white">
                    Al-Ramz Exports
                  </h1>
                  <span className="text-[9px] uppercase font-bold bg-blue-600/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/10 tracking-wider">
                    Control Panel
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                  Configuring live website content & catalog logistics
                </p>
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleGoHome}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer border border-slate-700/50"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-blue-500" /> Return to Website
              </button>
              <button
                onClick={handleLogout}
                className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-xl transition-all cursor-pointer border border-rose-500/10"
                title="Log Out Operator"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Quick Metrics (Simple, Muted row) */}
          <section className="bg-slate-900/40 border-b border-slate-850 py-3 px-6 sm:px-8">
            <div className="max-w-7xl mx-auto flex flex-wrap gap-x-8 gap-y-2 text-xs text-slate-400">
              <div>
                <span className="text-slate-500">Active Modules:</span> <span className="font-mono text-slate-300 font-bold">5 Sections</span>
              </div>
              <div className="hidden sm:inline">|</div>
              <div>
                <span className="text-slate-500">Security Scope:</span> <span className="font-mono text-slate-300 font-bold">Local Sandboxed Cache</span>
              </div>
              <div className="hidden sm:inline">|</div>
              <div>
                <span className="text-slate-500">Export Inventory:</span> <span className="font-mono text-slate-300 font-bold">{getBatchCount()} Active Batches</span>
              </div>
            </div>
          </section>

          {/* Workspace split layout */}
          <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-2 block">
                Manage Sections
              </span>
              
              <button
                onClick={() => setActiveTab("general")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeTab === "general"
                    ? "bg-blue-600 text-white border-blue-500 shadow-md"
                    : "text-slate-400 bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>General & Contacts</span>
                </div>
                {activeTab === "general" && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setActiveTab("hero")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeTab === "hero"
                    ? "bg-blue-600 text-white border-blue-500 shadow-md"
                    : "text-slate-400 bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layout className="w-3.5 h-3.5" />
                  <span>Hero Branding</span>
                </div>
                {activeTab === "hero" && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setActiveTab("about")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeTab === "about"
                    ? "bg-blue-600 text-white border-blue-500 shadow-md"
                    : "text-slate-400 bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>About & Profile</span>
                </div>
                {activeTab === "about" && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setActiveTab("benefits")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeTab === "benefits"
                    ? "bg-blue-600 text-white border-blue-500 shadow-md"
                    : "text-slate-400 bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Metrics & Benefits</span>
                </div>
                {activeTab === "benefits" && <Check className="w-3.5 h-3.5" />}
              </button>

              <div className="h-px bg-slate-850 my-3" />

              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-2 block">
                Database Logistics
              </span>

              <button
                onClick={() => setActiveTab("inventory")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeTab === "inventory"
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                    : "text-emerald-400 bg-emerald-500/5 border-emerald-500/10 hover:bg-emerald-500/10 hover:text-emerald-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className="w-3.5 h-3.5" />
                  <span>Industrial Inventory</span>
                </div>
                {activeTab === "inventory" && <Check className="w-3.5 h-3.5" />}
              </button>

              <div className="h-px bg-slate-850 my-3" />

              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-2 block">
                Information
              </span>

              <button
                onClick={() => setActiveTab("faq")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeTab === "faq"
                    ? "bg-blue-600 text-white border-blue-500 shadow-md"
                    : "text-slate-400 bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>FAQs & Help</span>
                </div>
                {activeTab === "faq" && <Check className="w-3.5 h-3.5" />}
              </button>
            </aside>

            {/* Main Form Fields Container */}
            <main className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* TAB 1: General & Contacts */}
                  {activeTab === "general" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-white mb-1">Company Info & Contacts</h2>
                        <p className="text-xs text-slate-400">Configure global parameters like brand names, WhatsApp numbers, and physical office addresses.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5 pt-4">
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                            Company Brand Name
                          </label>
                          <input
                            type="text"
                            value={tempConfig.companyName}
                            onChange={(e) => handleFieldChange("companyName", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                            WhatsApp Phone Line
                          </label>
                          <input
                            type="text"
                            value={tempConfig.phone}
                            onChange={(e) => handleFieldChange("phone", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                            Support & Inquiry Email
                          </label>
                          <input
                            type="text"
                            value={tempConfig.email}
                            onChange={(e) => handleFieldChange("email", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                            Registered Office Address
                          </label>
                          <input
                            type="text"
                            value={tempConfig.address}
                            onChange={(e) => handleFieldChange("address", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Hero Section */}
                  {activeTab === "hero" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-white mb-1">Hero Banner</h2>
                        <p className="text-xs text-slate-400">Configure text parameters that populate the top of the main page.</p>
                      </div>

                      <div className="space-y-5 pt-4">
                        <div className="grid md:grid-cols-3 gap-5">
                          <div className="md:col-span-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                              Display Headline Title
                            </label>
                            <input
                              type="text"
                              value={tempConfig.heroTitle}
                              onChange={(e) => handleFieldChange("heroTitle", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                              Hero Mini Badge Text
                            </label>
                            <input
                              type="text"
                              value={tempConfig.heroBadge}
                              onChange={(e) => handleFieldChange("heroBadge", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                            Pitch Description Subtitle
                          </label>
                          <textarea
                            rows={3}
                            value={tempConfig.heroSubtitle}
                            onChange={(e) => handleFieldChange("heroSubtitle", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all resize-none leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: About & Mission */}
                  {activeTab === "about" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-white mb-1">Profile & Mission Values</h2>
                        <p className="text-xs text-slate-400">Modify the comprehensive background descriptions outlining manufacturing quality and goals.</p>
                      </div>

                      <div className="space-y-5 pt-4">
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">About Section</h4>
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                              About Header
                            </label>
                            <input
                              type="text"
                              value={tempConfig.aboutTitle}
                              onChange={(e) => handleFieldChange("aboutTitle", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                              About Detailed Narrative
                            </label>
                            <textarea
                              rows={3}
                              value={tempConfig.aboutDescription}
                              onChange={(e) => handleFieldChange("aboutDescription", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all resize-none leading-relaxed"
                            />
                          </div>
                        </div>

                        <div className="h-px bg-slate-800 my-4" />

                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Mission Section</h4>
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                              Mission Header Title
                            </label>
                            <input
                              type="text"
                              value={tempConfig.missionTitle}
                              onChange={(e) => handleFieldChange("missionTitle", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                              Mission Statement Text
                            </label>
                            <textarea
                              rows={3}
                              value={tempConfig.missionDescription}
                              onChange={(e) => handleFieldChange("missionDescription", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all resize-none leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: Metrics & Benefits */}
                  {activeTab === "benefits" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-white mb-1">Bento Grid Benefits & Metrics</h2>
                        <p className="text-xs text-slate-400">Configure key headlines, bento descriptions, and physical textile specs.</p>
                      </div>

                      <div className="space-y-5 pt-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                              Services Grid Header
                            </label>
                            <input
                              type="text"
                              value={tempConfig.servicesTitle}
                              onChange={(e) => handleFieldChange("servicesTitle", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                              "Why Choose Us" Header
                            </label>
                            <input
                              type="text"
                              value={tempConfig.whyChooseUsTitle}
                              onChange={(e) => handleFieldChange("whyChooseUsTitle", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                              Services Subtitle
                            </label>
                            <textarea
                              rows={2}
                              value={tempConfig.servicesSubtitle}
                              onChange={(e) => handleFieldChange("servicesSubtitle", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-xs text-white outline-none resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                              "Why Choose Us" Subtext
                            </label>
                            <textarea
                              rows={2}
                              value={tempConfig.whyChooseUsSubtitle}
                              onChange={(e) => handleFieldChange("whyChooseUsSubtitle", e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-xs text-white outline-none resize-none"
                            />
                          </div>
                        </div>

                        <div className="h-px bg-slate-800 my-4" />
                        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Configure Specific Benefit Cells</h4>
                        
                        <div className="grid md:grid-cols-2 gap-5">
                          {/* Card 1 */}
                          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                            <span className="text-[10px] font-bold text-blue-400 block uppercase">Benefit 1: Elastic Webbing</span>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="text-[9px] text-slate-500 uppercase block mb-1">Metric</label>
                                <input
                                  type="text"
                                  value={tempConfig.elasticStretchVal}
                                  onChange={(e) => handleFieldChange("elasticStretchVal", e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg font-bold text-center text-blue-400 outline-none"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="text-[9px] text-slate-500 uppercase block mb-1">Title</label>
                                <input
                                  type="text"
                                  value={tempConfig.stretchBenefitTitle}
                                  onChange={(e) => handleFieldChange("stretchBenefitTitle", e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg font-semibold text-white outline-none"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-500 uppercase block mb-1">Narrative Description</label>
                              <textarea
                                rows={2}
                                value={tempConfig.stretchBenefitDesc}
                                onChange={(e) => handleFieldChange("stretchBenefitDesc", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg text-slate-300 outline-none resize-none"
                              />
                            </div>
                          </div>

                          {/* Card 2 */}
                          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                            <span className="text-[10px] font-bold text-emerald-400 block uppercase">Benefit 2: Skin-Safe Fabric</span>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="text-[9px] text-slate-500 uppercase block mb-1">Metric</label>
                                <input
                                  type="text"
                                  value={tempConfig.qualityMetricVal}
                                  onChange={(e) => handleFieldChange("qualityMetricVal", e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg font-bold text-center text-emerald-400 outline-none"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="text-[9px] text-slate-500 uppercase block mb-1">Title</label>
                                <input
                                  type="text"
                                  value={tempConfig.safeBenefitTitle}
                                  onChange={(e) => handleFieldChange("safeBenefitTitle", e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg font-semibold text-white outline-none"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-500 uppercase block mb-1">Narrative Description</label>
                              <textarea
                                rows={2}
                                value={tempConfig.safeBenefitDesc}
                                onChange={(e) => handleFieldChange("safeBenefitDesc", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg text-slate-300 outline-none resize-none"
                              />
                            </div>
                          </div>

                          {/* Card 3 */}
                          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                            <span className="text-[10px] font-bold text-purple-400 block uppercase">Benefit 3: Sensor Web Scanning</span>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="text-[9px] text-slate-500 uppercase block mb-1">Metric</label>
                                <input
                                  type="text"
                                  value="0.01μm"
                                  disabled
                                  className="w-full bg-slate-900/50 border border-slate-800/80 text-xs p-2 rounded-lg font-bold text-center text-purple-400/55 cursor-not-allowed outline-none"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="text-[9px] text-slate-500 uppercase block mb-1">Title</label>
                                <input
                                  type="text"
                                  value={tempConfig.qualityBenefitTitle}
                                  onChange={(e) => handleFieldChange("qualityBenefitTitle", e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg font-semibold text-white outline-none"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-500 uppercase block mb-1">Narrative Description</label>
                              <textarea
                                rows={2}
                                value={tempConfig.qualityBenefitDesc}
                                onChange={(e) => handleFieldChange("qualityBenefitDesc", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg text-slate-300 outline-none resize-none"
                              />
                            </div>
                          </div>

                          {/* Card 4 */}
                          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                            <span className="text-[10px] font-bold text-orange-400 block uppercase">Benefit 4: Long-Lasting Durability</span>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="text-[9px] text-slate-500 uppercase block mb-1">Metric</label>
                                <input
                                  type="text"
                                  value={tempConfig.durabilityMetricVal}
                                  onChange={(e) => handleFieldChange("durabilityMetricVal", e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg font-bold text-center text-orange-400 outline-none"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="text-[9px] text-slate-500 uppercase block mb-1">Title</label>
                                <input
                                  type="text"
                                  value={tempConfig.durabilityBenefitTitle}
                                  onChange={(e) => handleFieldChange("durabilityBenefitTitle", e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg font-semibold text-white outline-none"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-500 uppercase block mb-1">Narrative Description</label>
                              <textarea
                                rows={2}
                                value={tempConfig.durabilityBenefitDesc}
                                onChange={(e) => handleFieldChange("durabilityBenefitDesc", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 text-xs p-2 rounded-lg text-slate-300 outline-none resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: Industrial Inventory */}
                  {activeTab === "inventory" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-white mb-1">Industrial Logistics Inventory</h2>
                        <p className="text-xs text-slate-400">Add, edit, or delete actual live production textile batches. Updates are written instantly to database local records.</p>
                      </div>

                      <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-inner">
                        <InventoryDashboard readOnly={false} />
                      </div>
                    </div>
                  )}

                  {/* TAB 6: FAQ Help */}
                  {activeTab === "faq" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-white mb-1">Operations Manual & FAQs</h2>
                        <p className="text-xs text-slate-400">Helpful tips and information on how the Al-Ramz administrative panel works.</p>
                      </div>

                      <div className="pt-4">
                        <FAQAccordion />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

          {/* Persistent Save footer bar (hidden for inventory tab as inventory saves automatically, or for help tab) */}
          {activeTab !== "inventory" && activeTab !== "faq" && (
            <footer className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center sticky bottom-0 z-20 shadow-lg">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2.5 rounded-xl border border-rose-500/10 text-rose-400 hover:bg-rose-500/10 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Wipe & Revert Defaults
              </button>

              <div className="flex gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={handleGoHome}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer w-full sm:w-auto text-center"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saveStatus === "saving"}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer w-full sm:w-auto justify-center"
                >
                  {saveStatus === "saving" ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : saveStatus === "success" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Saved successfully</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </footer>
          )}
        </div>
      )}

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl max-w-sm w-full relative shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 mb-5 border border-rose-500/10">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold uppercase mb-2 text-white">Reset Configuration?</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Are you sure? This will wipe your custom layout text, contact details, and benefits list, reverting to Al-Ramz standard defaults.
              </p>
              <div className="flex gap-2.5 justify-end">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer shadow-md"
                >
                  Wipe & Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I ensure my custom text changes remain permanent?",
      a: "All changes are persisted instantly in your current browser's local sandbox storage (localStorage). As long as you don't clear your browser data or cache, your custom brand names, hotlines, addresses, and production batches remain saved and live!"
    },
    {
      q: "How can I revert all layout changes and reset to the original template?",
      a: "If you wish to wipe custom configurations and start over, use the 'Wipe & Revert Defaults' button located in the save bar footer. This immediately purges the active browser cache and recovers AL-RAMZ's default standard data formats."
    },
    {
      q: "What secure access codes can I use to unlock this administrator console?",
      a: "Authorized team operators and administrators can authenticate and unlock secure configurations using either of the trusted portal gate codes: 'admin123' or 'alramz786'."
    },
    {
      q: "Where can customers view our real-time production batch records?",
      a: "Any cargo batches added in the 'Industrial Inventory' tab appear instantly under the live 'Inventory Logistics' section on the main website homepage. This allows global textile clients and distributors to inspect cargo weight, stretch index, status, and shipping pipelines transparently."
    }
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx}
            className="border border-slate-800/80 rounded-xl bg-slate-950 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <span className="font-bold text-xs text-slate-200 pr-4">{faq.q}</span>
              <span className={`text-blue-500 font-bold text-lg transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-900">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
