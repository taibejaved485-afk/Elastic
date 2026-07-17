import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download, Upload, Plus, Trash2, FileSpreadsheet, Package, AlertCircle,
  Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, Layers, Activity, ClipboardList, RefreshCw, CheckCircle2, Palette, ChevronDown,
  Box, Hash, Printer
} from "lucide-react";
import { exportToCSV, parseCSV } from "../utils/csv";

export interface InventoryRecord {
  id: string;
  itemName: string;
  category: string;
  quantity: string;
  unit: string;
  stretchIndex: string;
  color: string;
  status: "In Stock" | "Low Stock" | "In Production" | "Shipped";
  lastUpdated: string;
}

export default function InventoryDashboard({ readOnly = false }: { readOnly?: boolean }) {
  const [records, setRecords] = useState<InventoryRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortConfig, setSortConfig] = useState<{ key: keyof InventoryRecord; direction: 'asc' | 'desc' } | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "qty-desc" | "qty-asc" | "updated">("updated");
  const [lowStockThreshold, setLowStockThreshold] = useState(500);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sampleBatches: InventoryRecord[] = [
    { 
      id: "1", 
      itemName: "5 Taar Heavy Duty Elastic Webbing", 
      category: "Heavy Industrial", 
      quantity: "5400", 
      unit: "Meters", 
      stretchIndex: "160%", 
      color: "Jet Black", 
      status: "In Stock", 
      lastUpdated: new Date().toLocaleDateString() 
    },
    { 
      id: "2", 
      itemName: "3 Taar Premium Stretch Elastic", 
      category: "Garment Grade", 
      quantity: "850", 
      unit: "Meters", 
      stretchIndex: "185%", 
      color: "Snow White", 
      status: "Low Stock", 
      lastUpdated: new Date().toLocaleDateString() 
    },
    { 
      id: "3", 
      itemName: "Reinforced Tactical Seatbelt Webbing", 
      category: "Military Grade", 
      quantity: "3200", 
      unit: "Meters", 
      stretchIndex: "110%", 
      color: "Olive Drab", 
      status: "In Stock", 
      lastUpdated: new Date().toLocaleDateString() 
    },
    { 
      id: "4", 
      itemName: "Specialized Orthopedic Elastic Knit", 
      category: "Medical Grade", 
      quantity: "1500", 
      unit: "Meters", 
      stretchIndex: "210%", 
      color: "Natural Beige", 
      status: "In Production", 
      lastUpdated: new Date().toLocaleDateString() 
    },
    { 
      id: "5", 
      itemName: "Hi-Vis Safety Webbing Tape", 
      category: "Heavy Industrial", 
      quantity: "4200", 
      unit: "Meters", 
      stretchIndex: "125%", 
      color: "Neon Orange", 
      status: "In Stock", 
      lastUpdated: new Date().toLocaleDateString() 
    },
    { 
      id: "6", 
      itemName: "Premium Drawstring Elastic Cord", 
      category: "Garment Grade", 
      quantity: "0", 
      unit: "Meters", 
      stretchIndex: "190%", 
      color: "Royal Blue", 
      status: "Shipped", 
      lastUpdated: new Date().toLocaleDateString() 
    }
  ];

  // Load from localStorage on mount & auto-migrate old formats
  useEffect(() => {
    const saved = localStorage.getItem("alramz_inventory_records");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all loaded records have the new fields, otherwise apply defaults
        const migrated = parsed.map((rec: any) => ({
          id: rec.id || Math.random().toString(36).substr(2, 9),
          itemName: rec.itemName || "Unnamed Material",
          category: rec.category || "General",
          quantity: String(rec.quantity ?? "0"),
          unit: rec.unit || "Meters",
          stretchIndex: rec.stretchIndex || "150%",
          color: rec.color || "Standard Black",
          status: rec.status || (Number(rec.quantity) > 1000 ? "In Stock" : Number(rec.quantity) === 0 ? "Shipped" : "Low Stock"),
          lastUpdated: rec.lastUpdated || new Date().toLocaleDateString()
        }));
        setRecords(migrated);
      } catch (e) {
        console.error("Failed to load records", e);
        setRecords(sampleBatches);
      }
    } else {
      setRecords(sampleBatches);
      localStorage.setItem("alramz_inventory_records", JSON.stringify(sampleBatches));
    }
  }, []);

  // Save to localStorage whenever records change
  useEffect(() => {
    if (!readOnly && records.length > 0) {
      localStorage.setItem("alramz_inventory_records", JSON.stringify(records));
    }
  }, [records, readOnly]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Artificial delay for high-fidelity feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const saved = localStorage.getItem("alramz_inventory_records");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRecords(parsed);
      } catch (e) {
        console.error("Refresh failed", e);
      }
    }
    
    setIsRefreshing(false);
    triggerToast("Inventory synchronized");
  };

  const handleExport = () => {
    if (records.length === 0) {
      triggerToast("No records to export.");
      return;
    }
    exportToCSV(records, `Al-Ramz_Inventory_${new Date().toISOString().split('T')[0]}`);
    triggerToast("Exported to CSV successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const importedData = parseCSV(text);
      if (importedData.length > 0) {
        const validated = importedData.map((rec: any) => ({
          id: rec.id || Math.random().toString(36).substr(2, 9),
          itemName: rec.itemName || "Imported Batch",
          category: rec.category || "General",
          quantity: String(rec.quantity ?? "0"),
          unit: rec.unit || "Meters",
          stretchIndex: rec.stretchIndex || "150%",
          color: rec.color || "White",
          status: rec.status || "In Stock",
          lastUpdated: rec.lastUpdated || new Date().toLocaleDateString()
        }));
        setRecords((prev) => [...prev, ...validated]);
        triggerToast(`${importedData.length} batches imported successfully!`);
      } else {
        triggerToast("Invalid CSV format.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const loadPresets = () => {
    setRecords(sampleBatches);
    localStorage.setItem("alramz_inventory_records", JSON.stringify(sampleBatches));
    triggerToast("Sample industrial data restored.");
  };

  const addNewRecord = () => {
    const newRec: InventoryRecord = {
      id: Math.random().toString(36).substr(2, 9),
      itemName: "Premium Elastic Webbing Batch",
      category: "Heavy Industrial",
      quantity: "3500",
      unit: "Meters",
      stretchIndex: "165%",
      color: "Carbon Gray",
      status: "In Stock",
      lastUpdated: new Date().toLocaleDateString()
    };
    setRecords([newRec, ...records]);
    triggerToast("Added a new premium production batch.");
  };

  const deleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
    triggerToast("Batch deleted from system.");
  };

  const updateRecord = (id: string, field: keyof InventoryRecord, value: string) => {
    setRecords(prev => prev.map(r => {
      if (r.id === id) {
        const updated = { ...r, [field]: value, lastUpdated: new Date().toLocaleDateString() };
        // Auto update status based on quantity if status wasn't explicitly changed
        if (field === "quantity") {
          const qty = Number(value);
          if (qty === 0) updated.status = "Shipped";
          else if (qty < 1000) updated.status = "Low Stock";
          else if (r.status === "Low Stock" || r.status === "Shipped") updated.status = "In Stock";
        }
        return updated;
      }
      return r;
    }));
  };

  // Unique Categories & Statuses for Filters
  const categories = ["All", ...Array.from(new Set(records.map(r => r.category)))];
  const statuses = ["All", "In Stock", "Low Stock", "In Production", "Shipped"];

  // Compute stats metrics dynamically
  const totalItems = records.length;
  const uniqueCategoriesCount = new Set(records.map(r => r.category)).size;
  const totalMeters = records.reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);
  const lowStockCount = records.filter(r => r.status === "Low Stock").length;
  const inProductionCount = records.filter(r => r.status === "In Production").length;
  const averageStretch = records.length 
    ? Math.round(records.reduce((sum, r) => sum + (parseInt(r.stretchIndex) || 150), 0) / records.length) 
    : 0;

  const requestSort = (key: keyof InventoryRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter & Sort records
  const filteredRecords = records
    .filter((r) => {
      const matchesSearch = r.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.color.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || r.category === selectedCategory;
      const matchesStatus = selectedStatus === "All" || r.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      // Priority: Header Sort (sortConfig) > Dropdown Sort (sortBy)
      if (sortConfig) {
        const { key, direction } = sortConfig;
        let comparison = 0;
        
        if (key === "quantity") {
          comparison = (Number(a[key]) || 0) - (Number(b[key]) || 0);
        } else if (key === "stretchIndex") {
          // Parse numeric value from string like "150%" or "80"
          const valA = parseFloat(a[key]) || 0;
          const valB = parseFloat(b[key]) || 0;
          comparison = valA - valB;
        } else {
          comparison = String(a[key] || "").localeCompare(String(b[key] || ""));
        }
        
        return direction === 'asc' ? comparison : -comparison;
      }

      if (sortBy === "name") {
        return a.itemName.localeCompare(b.itemName);
      } else if (sortBy === "qty-desc") {
        return (Number(b.quantity) || 0) - (Number(a.quantity) || 0);
      } else if (sortBy === "qty-asc") {
        return (Number(a.quantity) || 0) - (Number(b.quantity) || 0);
      } else {
        // Last updated (or ID fallback)
        return b.id.localeCompare(a.id);
      }
    });

  const SortIcon = ({ column }: { column: keyof InventoryRecord }) => {
    if (sortConfig?.key !== column) {
      return <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />;
    }
    return sortConfig.direction === "asc" 
      ? <ArrowUp className="w-3 h-3 text-blue-500" /> 
      : <ArrowDown className="w-3 h-3 text-blue-500" />;
  };

  return (
    <section 
      id="inventory-dashboard" 
      className={readOnly ? "py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-500" : "py-2 bg-transparent relative overflow-hidden"}
    >
      <div className={readOnly ? "max-w-7xl mx-auto px-6 relative z-10" : "relative z-10"}>
        
        {/* Print Only Header */}
        <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900">AL-RAMZ TEXTILE</h1>
          <p className="text-xs font-bold text-slate-600">Industrial Inventory & Logistics Report</p>
          <div className="flex justify-between items-end mt-4">
            <span className="text-[10px] font-mono text-slate-500">Document: INV-LOG-REPORT</span>
            <span className="text-[10px] font-mono text-slate-500">Generated: {new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Title and Controls Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-extrabold tracking-widest uppercase text-xs mb-3 block">
              AL-RAMZ METRIC SYSTEM
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
              Production Logistics <span className="text-blue-600 font-light">&amp;</span> Inventory
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm leading-relaxed">
              {readOnly 
                ? "Transparent real-time logistics registry displaying high-stretch webbing batches, physical loom metrics, and active global cargo lines."
                : "Manage elastic and textile materials. Add new cargo batches, adjust quality parameters, control stretch indices, and import/export CSV configurations."
              }
            </p>
            
            <div className="flex items-center gap-3 mt-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 w-fit">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Alert Threshold:</span>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(Number(e.target.value) || 0)}
                  className="w-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-1 px-2 text-[12px] font-bold text-blue-600 outline-none text-center shadow-sm"
                />
                <span className="text-[10px] font-bold text-slate-400">m</span>
              </div>
              <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-1" />
              <span className="text-[9px] font-medium text-slate-400 italic">
                (Highlights items below this volume)
              </span>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="flex flex-wrap gap-2.5 w-full lg:w-auto shrink-0">
            {readOnly ? (
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  Live Loom Data
                </span>
                <a
                  href="#/admin"
                  className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-black text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl transition-all shadow-md text-xs font-bold uppercase tracking-wider border border-transparent"
                >
                  Configure Panel
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={loadPresets}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white rounded-xl transition-all text-xs font-bold uppercase border border-slate-700/60"
                  title="Reload default production batches"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Batches
                </button>
                
                <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white rounded-xl transition-all cursor-pointer text-xs font-bold uppercase border border-slate-700/60">
                  <Upload className="w-3.5 h-3.5 text-blue-400" />
                  <span>Import CSV</span>
                  <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
                </label>

                <button 
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all text-xs font-bold uppercase shadow-lg shadow-emerald-900/20"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all text-xs font-bold uppercase shadow-lg shadow-slate-900/20"
                  title="Print Inventory Report"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>

                <button 
                  onClick={addNewRecord}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all text-xs font-bold uppercase shadow-lg shadow-blue-900/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Webbing Batch</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Analytics & Metrics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Metric 1: Total Stock */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Total Stock Count</span>
              <span className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white font-mono leading-none mt-0.5 block">
                {totalMeters.toLocaleString()} <span className="text-xs font-semibold text-slate-400">m</span>
              </span>
            </div>
          </div>

          {/* Metric 2: Total Items */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm">
            <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0">
              <Hash className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Total Catalog Items</span>
              <span className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white font-mono leading-none mt-0.5 block">
                {totalItems} <span className="text-xs font-semibold text-slate-400">SKUs</span>
              </span>
            </div>
          </div>

          {/* Metric 3: Unique Categories */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Unique Categories</span>
              <span className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white font-mono leading-none mt-0.5 block">
                {uniqueCategoriesCount} <span className="text-xs font-semibold text-slate-400">Sectors</span>
              </span>
            </div>
          </div>

          {/* Metric 4: Low Stock Alerter */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm">
            <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Low Stock Alerts</span>
              <span className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white font-mono leading-none mt-0.5 block flex items-center gap-2">
                {lowStockCount} 
                {lowStockCount > 0 && (
                  <span className="text-[9px] uppercase font-bold bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded animate-pulse border border-amber-500/10">Action Required</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Filter Search Panel */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col md:flex-row gap-4 items-center">
          
          {/* Search Box */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, SKU, or color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-xs text-slate-800 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full md:w-48 shrink-0">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-slate-400 pointer-events-none">
              <Layers className="w-3.5 h-3.5 mr-1.5" />
              <span className="text-[10px] font-bold uppercase tracking-wide mr-1 text-slate-500">Category:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-24 pr-8 text-xs text-slate-800 dark:text-white outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all font-semibold"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative w-full md:w-48 shrink-0">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-slate-400 pointer-events-none">
              <Activity className="w-3.5 h-3.5 mr-1.5" />
              <span className="text-[10px] font-bold uppercase tracking-wide mr-1 text-slate-500">Status:</span>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-20 pr-8 text-xs text-slate-800 dark:text-white outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all font-semibold"
            >
              {statuses.map((stat) => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Sorter Selector */}
          <div className="relative w-full md:w-44 shrink-0">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-slate-400 pointer-events-none">
              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" />
              <span className="text-[10px] font-bold uppercase tracking-wide mr-1 text-slate-500">Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-16 pr-8 text-xs text-slate-800 dark:text-white outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all font-semibold"
            >
              <option value="updated">Latest</option>
              <option value="name">Name A-Z</option>
              <option value="qty-desc">Qty (High-Low)</option>
              <option value="qty-asc">Qty (Low-High)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Manual Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full md:w-auto px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Refresh Inventory Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-500 ${isRefreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            <span className="md:hidden lg:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>

        {/* Desktop Complex Logistics Table (Hidden on small mobile screens) */}
        <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                  <th 
                    className="pl-6 pr-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors group"
                    onClick={() => requestSort("itemName")}
                  >
                    <div className="flex items-center gap-1">
                      Material Name &amp; Loom Pitch
                      <SortIcon column="itemName" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors group"
                    onClick={() => requestSort("category")}
                  >
                    <div className="flex items-center gap-1">
                      Sector Category
                      <SortIcon column="category" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors group"
                    onClick={() => requestSort("quantity")}
                  >
                    <div className="flex items-center gap-1">
                      Live Quantity
                      <SortIcon column="quantity" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors group"
                    onClick={() => requestSort("stretchIndex")}
                  >
                    <div className="flex items-center gap-1">
                      Loom Elastic Stretch
                      <SortIcon column="stretchIndex" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors group"
                    onClick={() => requestSort("color")}
                  >
                    <div className="flex items-center gap-1">
                      Aesthetic Color
                      <SortIcon column="color" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors group"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center gap-1">
                      Pipeline Status
                      <SortIcon column="status" />
                    </div>
                  </th>
                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Checked</th>
                  {!readOnly && <th className="pr-6 pl-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-right">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <AnimatePresence initial={false}>
                  {filteredRecords.map((record) => (
                    <motion.tr 
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="hover:bg-slate-100/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Name / Loom Pitch */}
                      <td className="pl-6 pr-4 py-4.5">
                        {readOnly ? (
                          <div className="flex flex-col">
                            <span className="font-bold text-xs text-slate-900 dark:text-slate-200">{record.itemName}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">ID: {record.id.toUpperCase()}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <input 
                              type="text" 
                              value={record.itemName} 
                              onChange={(e) => updateRecord(record.id, "itemName", e.target.value)}
                              className="bg-transparent border-none focus:ring-1 focus:ring-blue-500/30 rounded px-1.5 py-0.5 -mx-1.5 w-full font-bold text-xs text-slate-900 dark:text-white"
                            />
                            <span className="text-[9px] text-slate-500 font-mono">ID: {record.id.toUpperCase()}</span>
                          </div>
                        )}
                      </td>

                      {/* Sector Category */}
                      <td className="px-4 py-4.5">
                        {readOnly ? (
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{record.category}</span>
                        ) : (
                          <input 
                            type="text" 
                            value={record.category} 
                            onChange={(e) => updateRecord(record.id, "category", e.target.value)}
                            className="bg-transparent border-none focus:ring-1 focus:ring-blue-500/30 rounded px-1.5 py-0.5 -mx-1.5 w-full text-xs text-slate-600 dark:text-slate-300 font-semibold"
                          />
                        )}
                      </td>

                      {/* Live Quantity */}
                      <td className="px-4 py-4.5">
                        <div className="flex items-center gap-2">
                          <Package className={`w-3.5 h-3.5 ${Number(record.quantity) < lowStockThreshold ? "text-rose-500 animate-pulse" : "text-blue-500"}`} />
                          {readOnly ? (
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold font-mono ${Number(record.quantity) < lowStockThreshold ? "text-rose-600 dark:text-rose-400" : "text-slate-800 dark:text-slate-200"}`}>
                                  {Number(record.quantity).toLocaleString()} <span className="text-[10px] text-slate-400 font-sans">m</span>
                                </span>
                                {Number(record.quantity) < lowStockThreshold && (
                                  <span className="text-[8px] font-black bg-rose-500 text-white px-1 rounded flex items-center gap-0.5">
                                    CRITICAL
                                  </span>
                                )}
                              </div>
                              {/* Stock Level Mini Bar */}
                              <div className="w-20 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    Number(record.quantity) < lowStockThreshold ? "bg-rose-500" : record.status === "Low Stock" ? "bg-amber-500" : record.status === "Shipped" ? "bg-slate-300 dark:bg-slate-600" : "bg-blue-600"
                                  }`}
                                  style={{ width: `${Math.min(100, (Number(record.quantity) / 6000) * 100)}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1">
                              <input 
                                type="number" 
                                value={record.quantity} 
                                onChange={(e) => updateRecord(record.id, "quantity", e.target.value)}
                                className={`bg-transparent border-none focus:ring-1 focus:ring-blue-500/30 rounded px-1.5 py-0.5 -mx-1.5 w-20 text-xs font-mono font-bold ${Number(record.quantity) < lowStockThreshold ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-white"}`}
                              />
                              {Number(record.quantity) < lowStockThreshold && (
                                <span className="text-[8px] font-black text-rose-500 uppercase">Below Limit</span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Loom Elastic Stretch */}
                      <td className="px-4 py-4.5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                          <Activity className="w-3.5 h-3.5 text-emerald-500" />
                          {readOnly ? (
                            <span>{record.stretchIndex}</span>
                          ) : (
                            <input 
                              type="text" 
                              value={record.stretchIndex} 
                              onChange={(e) => updateRecord(record.id, "stretchIndex", e.target.value)}
                              className="bg-transparent border-none focus:ring-1 focus:ring-blue-500/30 rounded px-1 py-0.5 -mx-1 w-16 text-xs text-slate-900 dark:text-white font-mono"
                            />
                          )}
                        </div>
                      </td>

                      {/* Color */}
                      <td className="px-4 py-4.5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                          <Palette className="w-3.5 h-3.5 text-purple-500" />
                          {readOnly ? (
                            <span>{record.color}</span>
                          ) : (
                            <input 
                              type="text" 
                              value={record.color} 
                              onChange={(e) => updateRecord(record.id, "color", e.target.value)}
                              className="bg-transparent border-none focus:ring-1 focus:ring-blue-500/30 rounded px-1 py-0.5 -mx-1 w-24 text-xs text-slate-900 dark:text-white"
                            />
                          )}
                        </div>
                      </td>

                      {/* Status Badges */}
                      <td className="px-4 py-4.5">
                        {readOnly ? (
                          <StatusBadge status={record.status} />
                        ) : (
                          <select
                            value={record.status}
                            onChange={(e) => updateRecord(record.id, "status", e.target.value as any)}
                            className="bg-white border border-slate-200 rounded-lg py-1 px-2 text-[11px] font-bold text-slate-700 outline-none cursor-pointer focus:border-blue-500 transition-all"
                          >
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="In Production">In Run</option>
                            <option value="Shipped">Shipped</option>
                          </select>
                        )}
                      </td>

                      {/* Last Checked */}
                      <td className="px-4 py-4.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        {record.lastUpdated}
                      </td>

                      {/* Delete actions */}
                      {!readOnly && (
                        <td className="pr-6 pl-4 py-4.5 text-right">
                          <button 
                            onClick={() => deleteRecord(record.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                            title="Delete production batch record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={readOnly ? 7 : 8} className="px-6 py-14 text-center text-slate-400 dark:text-slate-500 italic text-xs bg-slate-50/20 dark:bg-slate-950/20">
                      No matching webbing or logistics records found in system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile & Tablet Card Layout (Hidden on Large Desktops) */}
        <div className="lg:hidden space-y-4">
          <AnimatePresence initial={false}>
            {filteredRecords.map((record) => (
              <motion.div 
                key={record.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all"
              >
                {/* Header info */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {readOnly ? (
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{record.itemName}</h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-mono mt-0.5">ID: {record.id.toUpperCase()}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1 w-full">
                        <input 
                          type="text" 
                          value={record.itemName} 
                          onChange={(e) => updateRecord(record.id, "itemName", e.target.value)}
                          className="bg-transparent border-none focus:ring-1 focus:ring-blue-500/30 rounded px-1 w-full font-bold text-sm text-slate-900 dark:text-white"
                        />
                        <span className="text-[9px] text-slate-500 font-mono px-1">ID: {record.id.toUpperCase()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {readOnly ? (
                      <StatusBadge status={record.status} />
                    ) : (
                      <select
                        value={record.status}
                        onChange={(e) => updateRecord(record.id, "status", e.target.value as any)}
                        className="bg-white border border-slate-200 rounded-lg py-1 px-2 text-[10px] font-bold text-slate-700 outline-none transition-all"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="In Production">In Run</option>
                        <option value="Shipped">Shipped</option>
                      </select>
                    )}

                    {!readOnly && (
                      <button 
                        onClick={() => deleteRecord(record.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub Metadata row */}
                <div className="grid grid-cols-2 gap-3.5 pt-3.5 border-t border-slate-100 dark:border-slate-850 text-xs">
                  
                  {/* Category */}
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block tracking-wider mb-1">Sector Class</span>
                    {readOnly ? (
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{record.category}</span>
                    ) : (
                      <input 
                        type="text" 
                        value={record.category} 
                        onChange={(e) => updateRecord(record.id, "category", e.target.value)}
                        className="bg-transparent border-none focus:ring-1 focus:ring-blue-500/30 rounded px-1 -mx-1 w-full text-slate-700 dark:text-slate-300 font-semibold"
                      />
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block tracking-wider mb-1">Stock Vol</span>
                    <div className="flex items-center gap-1.5">
                      <Package className={`w-3.5 h-3.5 ${Number(record.quantity) < lowStockThreshold ? "text-rose-500 animate-pulse" : "text-blue-500"}`} />
                      {readOnly ? (
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono font-bold ${Number(record.quantity) < lowStockThreshold ? "text-rose-600 dark:text-rose-400" : "text-slate-800 dark:text-slate-200"}`}>
                            {Number(record.quantity).toLocaleString()} m
                          </span>
                          {Number(record.quantity) < lowStockThreshold && (
                            <span className="text-[7px] font-black bg-rose-600 text-white px-1 rounded">CRITICAL</span>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <input 
                            type="number" 
                            value={record.quantity} 
                            onChange={(e) => updateRecord(record.id, "quantity", e.target.value)}
                            className={`bg-transparent border-none focus:ring-1 focus:ring-blue-500/30 rounded px-1 -mx-1 w-20 font-mono font-bold ${Number(record.quantity) < lowStockThreshold ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-white"}`}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stretch Index */}
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block tracking-wider mb-1">Elastic Stretch</span>
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-mono">
                      <Activity className="w-3.5 h-3.5 text-emerald-500" />
                      {readOnly ? (
                        <span>{record.stretchIndex}</span>
                      ) : (
                        <input 
                          type="text" 
                          value={record.stretchIndex} 
                          onChange={(e) => updateRecord(record.id, "stretchIndex", e.target.value)}
                          className="bg-transparent border-none focus:ring-1 focus:ring-blue-500/30 rounded px-1 -mx-1 w-full font-mono text-xs text-slate-900 dark:text-white"
                        />
                      )}
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block tracking-wider mb-1">Loom Shade</span>
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <Palette className="w-3.5 h-3.5 text-purple-500" />
                      {readOnly ? (
                        <span>{record.color}</span>
                      ) : (
                        <input 
                          type="text" 
                          value={record.color} 
                          onChange={(e) => updateRecord(record.id, "color", e.target.value)}
                          className="bg-transparent border-none focus:ring-1 focus:ring-blue-500/30 rounded px-1 -mx-1 w-full text-xs text-slate-900 dark:text-white"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer updated date */}
                <div className="pt-2 text-right text-[9px] text-slate-400 dark:text-slate-500 font-mono border-t border-slate-50 dark:border-slate-850">
                  Last Checked: {record.lastUpdated}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredRecords.length === 0 && (
            <div className="py-12 text-center text-slate-400 italic bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              No matching records found in system.
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification Widget */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800 dark:border-slate-100"
          >
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wide">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Styled Status Pill Badge
function StatusBadge({ status }: { status: InventoryRecord["status"] }) {
  if (status === "In Stock") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/10">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        In Stock
      </span>
    );
  }
  if (status === "Low Stock") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-500/10">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
        Low Stock
      </span>
    );
  }
  if (status === "In Production") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-500/10">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 animate-pulse" />
        In Run
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-700">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
      Shipped
    </span>
  );
}
