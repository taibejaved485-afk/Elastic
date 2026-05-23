import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Upload, Plus, Trash2, FileSpreadsheet, Package, AlertCircle } from "lucide-react";
import { exportToCSV, parseCSV } from "../utils/csv";

interface InventoryRecord {
  id: string;
  itemName: string;
  category: string;
  quantity: string;
  unit: string;
  lastUpdated: string;
}

export default function InventoryDashboard() {
  const [records, setRecords] = useState<InventoryRecord[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("elastic_inventory_records");
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load records", e);
      }
    } else {
      // Default initial data
      const initial = [
        { id: "1", itemName: "5 Taar Elastic Webbing", category: "Heavy Industrial", quantity: "5000", unit: "Meters", lastUpdated: new Date().toLocaleDateString() },
        { id: "2", itemName: "6 Taar Premium Stretch", category: "Garment Grade", quantity: "1200", unit: "Meters", lastUpdated: new Date().toLocaleDateString() },
      ];
      setRecords(initial);
      localStorage.setItem("elastic_inventory_records", JSON.stringify(initial));
    }
  }, []);

  // Save to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem("elastic_inventory_records", JSON.stringify(records));
  }, [records]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleExport = () => {
    if (records.length === 0) {
      triggerToast("No records to export.");
      return;
    }
    exportToCSV(records, `Elastic_Inventory_${new Date().toISOString().split('T')[0]}`);
    triggerToast("Exported to CSV successfully!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const importedData = parseCSV(text);
      if (importedData.length > 0) {
        setRecords((prev) => [...prev, ...importedData]);
        triggerToast(`${importedData.length} records imported!`);
      } else {
        triggerToast("Invalid CSV format.");
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = "";
  };

  const addNewRecord = () => {
    const newRec: InventoryRecord = {
      id: Math.random().toString(36).substr(2, 9),
      itemName: "New Material Batch",
      category: "Uncategorized",
      quantity: "0",
      unit: "Meters",
      lastUpdated: new Date().toLocaleDateString()
    };
    setRecords([newRec, ...records]);
    triggerToast("New record added.");
  };

  const deleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
    triggerToast("Record deleted.");
  };

  const updateRecord = (id: string, field: keyof InventoryRecord, value: string) => {
    setRecords(records.map(r => r.id === id ? { ...r, [field]: value, lastUpdated: new Date().toLocaleDateString() } : r));
  };

  return (
    <section id="inventory-dashboard" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-4 block">
              Internal Management
            </span>
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-4">Industrial Records</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl">
              Import, edit, and export your batch inventory data. All changes are saved locally for private industrial management.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 px-5 py-3 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer border border-slate-200 dark:border-slate-800">
              <Upload className="w-4 h-4" />
              <span className="font-semibold text-sm">Import CSV</span>
              <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
            </label>

            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="font-semibold text-sm">Export Excel/CSV</span>
            </button>

            <button 
              onClick={addNewRecord}
              className="flex items-center gap-2 px-5 py-3 bg-brand-blue text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" />
              <span className="font-semibold text-sm">Add Batch</span>
            </button>
          </div>
        </div>

        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Material Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Category</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Qty (Meters)</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Last Updated</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <AnimatePresence initial={false}>
                  {records.map((record) => (
                    <motion.tr 
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input 
                          type="text" 
                          value={record.itemName} 
                          onChange={(e) => updateRecord(record.id, "itemName", e.target.value)}
                          className="bg-transparent border-none focus:ring-2 focus:ring-brand-blue/30 rounded px-2 -mx-2 w-full font-semibold text-slate-900 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input 
                          type="text" 
                          value={record.category} 
                          onChange={(e) => updateRecord(record.id, "category", e.target.value)}
                          className="bg-transparent border-none focus:ring-2 focus:ring-brand-blue/30 rounded px-2 -mx-2 w-full text-slate-500 dark:text-slate-400"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-brand-blue" />
                          <input 
                            type="number" 
                            value={record.quantity} 
                            onChange={(e) => updateRecord(record.id, "quantity", e.target.value)}
                            className="bg-transparent border-none focus:ring-2 focus:ring-brand-blue/30 rounded px-2 -mx-2 w-24 text-slate-900 dark:text-white font-mono"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                        {record.lastUpdated}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => deleteRecord(record.id)}
                          className="p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors inline-flex items-center justify-center min-w-[44px] min-h-[44px]"
                          aria-label="Delete record"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {records.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                      No records found. Import a CSV or add a new batch to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile List View (Shown only on small screens) */}
        <div className="md:hidden space-y-4">
          <AnimatePresence initial={false}>
            {records.map((record) => (
              <motion.div 
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 mr-4">
                    <input 
                      type="text" 
                      value={record.itemName} 
                      onChange={(e) => updateRecord(record.id, "itemName", e.target.value)}
                      className="bg-transparent border-none focus:ring-2 focus:ring-brand-blue/30 rounded px-2 -mx-2 w-full font-bold text-lg text-slate-900 dark:text-white"
                    />
                    <input 
                      type="text" 
                      value={record.category} 
                      onChange={(e) => updateRecord(record.id, "category", e.target.value)}
                      className="bg-transparent border-none focus:ring-2 focus:ring-brand-blue/30 rounded px-2 -mx-2 w-full text-sm text-slate-500 dark:text-slate-400"
                    />
                  </div>
                  <button 
                    onClick={() => deleteRecord(record.id)}
                    className="p-3 text-rose-500 bg-rose-50 dark:bg-rose-900/20 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Quantity (Meters)</span>
                    <div className="flex items-center gap-2">
                       <Package className="w-4 h-4 text-brand-blue" />
                       <input 
                        type="number" 
                        value={record.quantity} 
                        onChange={(e) => updateRecord(record.id, "quantity", e.target.value)}
                        className="bg-transparent border-none focus:ring-2 focus:ring-brand-blue/30 rounded px-2 -mx-2 w-full font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Updated</span>
                    <span className="text-sm font-mono text-slate-500 dark:text-slate-400">{record.lastUpdated}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {records.length === 0 && (
            <div className="py-12 text-center text-slate-400 italic bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              No records found.
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 dark:border-slate-200"
          >
            <AlertCircle className="w-5 h-5 text-brand-blue" />
            <span className="font-semibold text-sm">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
