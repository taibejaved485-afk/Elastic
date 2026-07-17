import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, Trash2, CheckCircle2, ChevronRight, User, Building2, Phone, Volume2, Inbox, 
  MessageSquare, Sparkles, Filter, Search, Calendar, BadgeAlert, Send, FileText, CheckSquare
} from "lucide-react";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  volume: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "New" | "Read" | "Replied";
}

export default function InboxPanel() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "New" | "Read" | "Replied">("All");
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const mockLeads: ContactSubmission[] = [
    {
      id: "lead-1",
      name: "Arthur Pendelton",
      email: "a.pendelton@globaltextiles.co.uk",
      phone: "+44 20 7946 0192",
      company: "Global Textile Sourcing Ltd",
      volume: "12,000 Meters",
      subject: "Wholesale inquiry for 5 Taar Heavy Webbing",
      message: "Hello team, we are reviewing samples of heavy elastic webbing for our tactical vest production run in Q4. We need dynamic stretch recovery certifications and a quotation for 12,000 meters in carbon black. Please advise on shipping timelines to Southampton port.",
      timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString(), // 2 hours ago
      status: "New"
    },
    {
      id: "lead-2",
      name: "Saira Banu",
      email: "saira.banu@garmentshouse.com",
      phone: "+92 300 1234567",
      company: "Chiffon Apparel Lahore",
      volume: "5,500 Meters",
      subject: "Custom 3 Taar Stretch samples",
      message: "Assalam-o-Alaikum, we require fine 3-Taar and 4-Taar white elastics for a line of women's premium sports jerseys. What is the minimum order quantity for custom dyed elastics matching Pantone 286C? Kindly send us your product catalog as soon as possible.",
      timestamp: new Date(Date.now() - 3600000 * 18).toLocaleString(), // 18 hours ago
      status: "New"
    },
    {
      id: "lead-3",
      name: "Marcus Aurelius",
      email: "m.aurelius@medistretch.de",
      phone: "+49 89 201934",
      company: "MediStretch Diagnostics GmbH",
      volume: "8,000 Meters",
      subject: "Hypoallergenic Orthopedic Knit supply",
      message: "Dear Sales Director, we have inspected your specifications for hypoallergenic medical-grade elastic bands. We would like to initiate a sample run of 8,000 meters of Natural Beige orthopedic stretch webbing. Please confirm if your material is certified Latex-Free and OKEO-TEX Standard 100 compliant.",
      timestamp: new Date(Date.now() - 3600000 * 48).toLocaleString(), // 2 days ago
      status: "Read"
    }
  ];

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("alramz_contact_submissions");
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse submissions", e);
        setSubmissions(mockLeads);
      }
    } else {
      setSubmissions(mockLeads);
      localStorage.setItem("alramz_contact_submissions", JSON.stringify(mockLeads));
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const saveToStorage = (updatedList: ContactSubmission[]) => {
    setSubmissions(updatedList);
    localStorage.setItem("alramz_contact_submissions", JSON.stringify(updatedList));
  };

  const handleSelectSubmission = (sub: ContactSubmission) => {
    setSelectedSubmission(sub);
    setIsReplying(false);
    setReplyText("");
    
    // Auto mark as Read if it was New
    if (sub.status === "New") {
      const updated = submissions.map(item => 
        item.id === sub.id ? { ...item, status: "Read" as const } : item
      );
      saveToStorage(updated);
    }
  };

  const deleteSubmission = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = submissions.filter(item => item.id !== id);
    saveToStorage(updated);
    if (selectedSubmission?.id === id) {
      setSelectedSubmission(null);
    }
    triggerToast("Inquiry deleted.");
  };

  const markAsStatus = (id: string, status: "New" | "Read" | "Replied", e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = submissions.map(item => 
      item.id === id ? { ...item, status } : item
    );
    saveToStorage(updated);
    if (selectedSubmission?.id === id) {
      setSelectedSubmission(prev => prev ? { ...prev, status } : null);
    }
    triggerToast(`Lead marked as ${status}.`);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedSubmission) return;

    // In a real app this proxies an SMTP or WhatsApp API, here we simulate and mark as Replied
    const updated = submissions.map(item => 
      item.id === selectedSubmission.id ? { ...item, status: "Replied" as const } : item
    );
    saveToStorage(updated);
    setSelectedSubmission(prev => prev ? { ...prev, status: "Replied" } : null);
    setIsReplying(false);
    setReplyText("");
    triggerToast("Draft Reply Sent successfully!");
  };

  const loadPresets = () => {
    saveToStorage(mockLeads);
    triggerToast("Sample inquiries generated!");
  };

  const clearAll = () => {
    saveToStorage([]);
    setSelectedSubmission(null);
    triggerToast("Inbox cleared.");
  };

  // Filter Submissions
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalLeads = submissions.length;
  const unreadCount = submissions.filter(s => s.status === "New").length;
  const repliedCount = submissions.filter(s => s.status === "Replied").length;
  const highVolumeCount = submissions.filter(s => {
    const num = parseInt(s.volume.replace(/,/g, '')) || 0;
    return num >= 5000;
  }).length;

  return (
    <div className="space-y-6">
      
      {/* Title & Context */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Customer Leads &amp; Inquiries Inbox
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time quote requests, bulk material inquiries, and direct leads captured from the contact gateway.
          </p>
        </div>

        <div className="flex gap-2.5">
          {totalLeads === 0 && (
            <button
              onClick={loadPresets}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-blue-200 cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Generate Mock Leads
            </button>
          )}
          {totalLeads > 0 && (
            <button
              onClick={clearAll}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-rose-200 cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Wipe Inbox
            </button>
          )}
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <span className="text-[9px] uppercase font-bold text-slate-500 block">Total Inquiries</span>
          <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">{totalLeads}</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <span className="text-[9px] uppercase font-bold text-slate-500 block">Unread &amp; New</span>
          <span className="text-xl font-black text-blue-600 font-mono mt-0.5 block flex items-center gap-2">
            {unreadCount}
            {unreadCount > 0 && (
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
            )}
          </span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <span className="text-[9px] uppercase font-bold text-slate-500 block">High Volume Contracts</span>
          <span className="text-xl font-black text-amber-600 font-mono mt-0.5 block">
            {highVolumeCount} <span className="text-[9px] font-bold text-slate-500 font-sans">(&gt;5k m)</span>
          </span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <span className="text-[9px] uppercase font-bold text-slate-500 block">Response Rate</span>
          <span className="text-xl font-black text-emerald-600 font-mono mt-0.5 block">
            {totalLeads ? Math.round((repliedCount / totalLeads) * 100) : 0}%
          </span>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid lg:grid-cols-12 gap-6 min-h-[500px]">
        
        {/* Left Hand: Inquiries List */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm">
          
          {/* Controls Bar */}
          <div className="p-3 border-b border-slate-100 bg-slate-50 flex flex-col gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-1.5 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-blue-500 placeholder:text-slate-400 transition-all"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full bg-white border border-slate-200 text-xs text-slate-600 rounded-lg py-1.5 px-3 outline-none cursor-pointer focus:border-blue-500 transition-all"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Read">Read</option>
                <option value="Replied">Replied</option>
              </select>
            </div>
          </div>

          {/* List Scroll */}
          <div className="flex-1 overflow-y-auto max-h-[550px] divide-y divide-slate-100">
            <AnimatePresence initial={false}>
              {filteredSubmissions.map((sub) => {
                const isSelected = selectedSubmission?.id === sub.id;
                const isNew = sub.status === "New";
                const isReplied = sub.status === "Replied";

                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectSubmission(sub)}
                    className={`p-4 transition-all cursor-pointer relative group ${
                      isSelected 
                        ? "bg-blue-50 border-l-4 border-blue-600" 
                        : "hover:bg-slate-50 border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold text-xs ${isNew ? "text-slate-900" : "text-slate-600"}`}>
                          {sub.name}
                        </span>
                        {isNew && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        )}
                        {isReplied && (
                          <span className="text-[8px] uppercase font-black bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded border border-emerald-200">Replied</span>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">{sub.timestamp.split(',')[0]}</span>
                    </div>

                    <div className="text-[10px] text-blue-600 font-bold tracking-tight mb-1 truncate">
                      {sub.company}
                    </div>

                    <p className={`text-[11px] line-clamp-2 leading-relaxed ${isNew ? "text-slate-700 font-medium" : "text-slate-500"}`}>
                      {sub.message}
                    </p>

                    {/* Quantity Badge on card */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase font-mono">
                        <Volume2 className="w-3 h-3 text-slate-300" /> {sub.volume}
                      </span>
                      
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => deleteSubmission(sub.id, e)}
                          className="p-1 text-slate-300 hover:text-rose-600 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </AnimatePresence>

            {filteredSubmissions.length === 0 && (
              <div className="py-20 text-center text-slate-400 text-xs italic flex flex-col items-center gap-3">
                <Inbox className="w-10 h-10 text-slate-100" />
                <span>No customer messages in this filter.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Hand: Lead Detail & Simulation Reply */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm min-h-[500px]">
          {selectedSubmission ? (
            <div className="flex-1 flex flex-col">
              
              {/* Header profile info */}
              <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50/30">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{selectedSubmission.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{selectedSubmission.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedSubmission.status}
                    onChange={(e) => markAsStatus(selectedSubmission.id, e.target.value as any, e as any)}
                    className="bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600 rounded-lg py-1.5 px-3 outline-none cursor-pointer hover:border-slate-300 transition-all"
                  >
                    <option value="New">New</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                  </select>

                  <button
                    onClick={(e) => deleteSubmission(selectedSubmission.id, e as any)}
                    className="p-2 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-lg transition-all shadow-sm"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 flex-1 flex flex-col">
                {/* Lead Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Enterprise Client</span>
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate text-xs">
                      <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {selectedSubmission.company}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Phone Call / WhatsApp</span>
                    <div className="flex items-center gap-1.5 text-slate-700 font-mono font-semibold text-xs">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {selectedSubmission.phone}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Expected Contract Size</span>
                    <div className="flex items-center gap-1.5 text-amber-700 font-semibold font-mono text-xs">
                      <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      {selectedSubmission.volume}
                    </div>
                  </div>
                </div>

                {/* Inquiry Message Body */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" /> 
                    Subject: <span className="text-blue-700 font-bold ml-1">{selectedSubmission.subject}</span>
                  </div>
                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap shadow-inner min-h-[120px]">
                    {selectedSubmission.message}
                  </div>
                  <span className="text-[9px] text-slate-400 block text-right font-mono italic">Captured: {selectedSubmission.timestamp}</span>
                </div>

                {/* Simulation Response Form */}
                <div className="border-t border-slate-100 pt-6">
                  {!isReplying ? (
                    <button
                      onClick={() => setIsReplying(true)}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" /> Write Draft Reply
                    </button>
                  ) : (
                    <form onSubmit={handleSendReply} className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                        <span>Response drafted to: {selectedSubmission.email}</span>
                        <button 
                          type="button" 
                          onClick={() => setIsReplying(false)} 
                          className="text-rose-600 hover:underline cursor-pointer font-bold"
                        >
                          Cancel
                        </button>
                      </div>

                      <textarea
                        rows={4}
                        placeholder="Write your email proposal, shipping rates, or WhatsApp contact draft..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 resize-none leading-relaxed transition-all shadow-sm"
                        required
                      />

                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsReplying(false)}
                          className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold cursor-pointer transition-colors border border-slate-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                        >
                          <Send className="w-3.5 h-3.5" /> Dispatch Reply
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-slate-400 italic text-xs gap-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                <Mail className="w-10 h-10 text-slate-200" />
              </div>
              <div>
                <p className="font-bold text-slate-800 not-italic mb-1 text-base">No Active Inquiry Selected</p>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Select an inbound message from the sidebar to inspect company profiles, phone records, and dispatch custom replies.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Internal Toaster Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3.5 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-800 text-xs font-bold uppercase tracking-wide"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
