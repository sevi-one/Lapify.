
import React, { useState } from 'react';
import { Laptop, SheetConfig } from '../types';
import { Icons } from '../constants';

interface AdminPanelProps {
  config: SheetConfig;
  setConfig: (config: SheetConfig) => void;
  laptops: Laptop[];
  refreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ config, setConfig, laptops, refreshData }) => {
  const [tempId, setTempId] = useState(config.sheetId);
  const [tempTab, setTempTab] = useState(config.tabName);
  const [search, setSearch] = useState('');

  const filtered = laptops.filter(l => 
    l.model.toLowerCase().includes(search.toLowerCase()) || 
    l.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = () => {
    setConfig({ sheetId: tempId, tabName: tempTab });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card rounded-3xl p-10">
        <h2 className="text-3xl font-black text-[#F6FAFD] mb-8 flex items-center gap-4">
          <span className="p-3 bg-[#B3CFE5]/10 rounded-2xl text-[#B3CFE5]">
            <Icons.Settings />
          </span>
          Lapify Configuration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#4A7FA7] uppercase tracking-widest">Database ID (Sheet ID)</label>
            <input 
              type="text"
              value={tempId}
              onChange={(e) => setTempId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#F6FAFD] placeholder:text-[#4A7FA7]/40 focus:ring-2 focus:ring-[#B3CFE5] outline-none transition-all"
              placeholder="Enter Sheet ID"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#4A7FA7] uppercase tracking-widest">Environment (Tab Name)</label>
            <input 
              type="text"
              value={tempTab}
              onChange={(e) => setTempTab(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#F6FAFD] placeholder:text-[#4A7FA7]/40 focus:ring-2 focus:ring-[#B3CFE5] outline-none transition-all"
              placeholder="e.g. Sheet1"
            />
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button 
            onClick={handleUpdate}
            className="px-10 py-4 blue-gradient text-[#F6FAFD] font-black text-sm rounded-2xl shadow-[0_10px_30px_rgba(74,127,167,0.3)] hover:shadow-[0_15px_40px_rgba(74,127,167,0.4)] transition-all"
          >
            Deploy Changes
          </button>
          <button 
            onClick={refreshData}
            className="px-10 py-4 bg-white/5 border border-white/10 text-[#B3CFE5] font-black text-sm rounded-2xl hover:bg-white/10 transition-all"
          >
            Synchronize Data
          </button>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-xl font-black text-[#F6FAFD] uppercase tracking-widest">Asset Management. <span className="text-[#B3CFE5]">Real Impact.</span></h3>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A7FA7]">
              <Icons.Search />
            </span>
            <input 
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-[#F6FAFD] focus:ring-2 focus:ring-[#B3CFE5] outline-none w-full md:w-80"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] text-[#4A7FA7] font-black text-[10px] uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-8 py-5">Brand</th>
                <th className="px-8 py-5">Model Variant</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Performance Core</th>
                <th className="px-8 py-5">Memory</th>
                <th className="px-8 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((l, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6 font-black text-[#B3CFE5]">{l.brand}</td>
                  <td className="px-8 py-6 text-[#B3CFE5]/70 max-w-xs truncate">{l.model}</td>
                  <td className="px-8 py-6 text-[#F6FAFD] font-black">${l.price}</td>
                  <td className="px-8 py-6 text-[#4A7FA7] text-xs font-bold">{l.cpuBrand} {l.cpuSeries}</td>
                  <td className="px-8 py-6">
                    <span className="bg-white/5 px-3 py-1 rounded-lg text-xs font-black text-[#B3CFE5] border border-white/5">{l.ramGB}GB</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                      <span className="text-[10px] font-black text-[#4A7FA7] uppercase">Synced</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filtered.length === 0 && (
            <div className="p-20 text-center text-[#4A7FA7]">
              Inventory empty. Please check synchronization status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
