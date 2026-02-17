
import React, { useState, useMemo, useEffect } from 'react';
import { Laptop, UserPreferences } from '../types';
import { LaptopCard } from './LaptopCard';
import { Icons, GPU_TYPES, GPU_BRANDS, CPU_BRANDS } from '../constants';

interface ViewerPanelProps {
  laptops: Laptop[];
}

const FilterSectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-[10px] font-black text-[#4A7FA7] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-[#B3CFE5]/40"></span>
    {title}
  </h3>
);

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  prefs: UserPreferences;
  setPrefs: (prefs: UserPreferences) => void;
  availableBrands: string[];
  availableSegments: string[];
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  prefs,
  setPrefs,
  availableBrands,
  availableSegments
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <FilterSectionHeader title="Discovery" />
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A7FA7] group-focus-within:text-[#B3CFE5] transition-colors">
            <Icons.Search />
          </span>
          <input 
            type="text"
            placeholder="Search model, brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A1931]/60 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-[#F6FAFD] focus:ring-1 focus:ring-[#B3CFE5] outline-none transition-all placeholder:text-[#4A7FA7]"
          />
        </div>
      </div>

      <div className="space-y-5">
        <FilterSectionHeader title="Price Filter" />
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#4A7FA7] uppercase tracking-widest">Min ($)</label>
              <input 
                type="number"
                value={prefs.minPrice}
                onChange={(e) => setPrefs({...prefs, minPrice: parseInt(e.target.value) || 0})}
                className="w-full bg-[#0A1931]/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-black text-[#F6FAFD] focus:ring-1 focus:ring-[#B3CFE5] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#4A7FA7] uppercase tracking-widest">Max ($)</label>
              <input 
                type="number"
                value={prefs.maxPrice}
                onChange={(e) => setPrefs({...prefs, maxPrice: parseInt(e.target.value) || 0})}
                className="w-full bg-[#0A1931]/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-black text-[#F6FAFD] focus:ring-1 focus:ring-[#B3CFE5] outline-none"
              />
            </div>
          </div>
          <input 
            type="range" min="0" max="10000" step="50"
            value={prefs.maxPrice}
            onChange={(e) => setPrefs({...prefs, maxPrice: parseInt(e.target.value)})}
            className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#B3CFE5]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <FilterSectionHeader title="Classification" />
        <div className="space-y-3">
          <select 
            value={prefs.brand}
            onChange={(e) => setPrefs({...prefs, brand: e.target.value})}
            className="w-full bg-[#0A1931]/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#B3CFE5]/80 focus:ring-1 focus:ring-[#B3CFE5] outline-none hover:border-white/20 transition-all cursor-pointer"
          >
            <option value="">All Brands</option>
            {availableBrands.map(b => (
              <option key={b} value={b} className="bg-[#0A1931]">{b}</option>
            ))}
          </select>

          <select 
            value={prefs.laptopType}
            onChange={(e) => setPrefs({...prefs, laptopType: e.target.value})}
            className="w-full bg-[#0A1931]/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#B3CFE5]/80 focus:ring-1 focus:ring-[#B3CFE5] outline-none hover:border-white/20 transition-all cursor-pointer"
          >
            <option value="Any">All Segments</option>
            {availableSegments.map(s => (
              <option key={s} value={s} className="bg-[#0A1931]">{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-5 pt-2 border-t border-white/5">
        <FilterSectionHeader title="Performance Core" />
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-[#4A7FA7] uppercase tracking-widest">CPU Brand</p>
            <select 
              value={prefs.cpuBrand}
              onChange={(e) => setPrefs({...prefs, cpuBrand: e.target.value})}
              className="w-full bg-[#0A1931]/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#B3CFE5]/80 focus:ring-1 focus:ring-[#B3CFE5] outline-none hover:border-white/20 transition-all cursor-pointer"
            >
              {CPU_BRANDS.map(b => <option key={b} value={b} className="bg-[#0A1931]">{b}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-[#4A7FA7] uppercase tracking-widest">Min RAM</p>
              <select 
                value={prefs.minRAM}
                onChange={(e) => setPrefs({...prefs, minRAM: parseInt(e.target.value)})}
                className="w-full bg-[#0A1931]/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#B3CFE5]/80 focus:ring-1 focus:ring-[#B3CFE5] outline-none"
              >
                {[4, 8, 16, 32, 64].map(r => <option key={r} value={r} className="bg-[#0A1931]">{r}GB+</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-[#4A7FA7] uppercase tracking-widest">Storage</p>
              <select 
                value={prefs.minStorage}
                onChange={(e) => setPrefs({...prefs, minStorage: parseInt(e.target.value)})}
                className="w-full bg-[#0A1931]/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#B3CFE5]/80 focus:ring-1 focus:ring-[#B3CFE5] outline-none"
              >
                {[64, 128, 256, 512, 1024, 2048].map(s => <option key={s} value={s} className="bg-[#0A1931]">{s >= 1024 ? `${s/1024}TB` : `${s}GB`}+</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 pt-2 border-t border-white/5">
        <FilterSectionHeader title="Graphics Architecture" />
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-[#4A7FA7] uppercase tracking-widest">GPU Type</p>
            <select 
              value={prefs.gpuType}
              onChange={(e) => setPrefs({...prefs, gpuType: e.target.value})}
              className="w-full bg-[#0A1931]/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#B3CFE5]/80 focus:ring-1 focus:ring-[#B3CFE5] outline-none"
            >
              {GPU_TYPES.map(t => <option key={t} value={t} className="bg-[#0A1931]">{t}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-[#4A7FA7] uppercase tracking-widest">GPU Brand</p>
            <select 
              value={prefs.gpuBrand}
              onChange={(e) => setPrefs({...prefs, gpuBrand: e.target.value})}
              className="w-full bg-[#0A1931]/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#B3CFE5]/80 focus:ring-1 focus:ring-[#B3CFE5] outline-none"
            >
              {GPU_BRANDS.map(b => <option key={b} value={b} className="bg-[#0A1931]">{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-5 pt-2 border-t border-white/5">
        <FilterSectionHeader title="Visuals" />
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-[#4A7FA7] uppercase tracking-widest">Display Size</p>
          <select 
            value={prefs.minScreenSize}
            onChange={(e) => setPrefs({...prefs, minScreenSize: parseFloat(e.target.value)})}
            className="w-full bg-[#0A1931]/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#B3CFE5]/80 focus:ring-1 focus:ring-[#B3CFE5] outline-none"
          >
            {[11, 12, 13, 14, 15, 16, 17, 18].map(s => <option key={s} value={s} className="bg-[#0A1931]">{s}" Diagonal+</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export const ViewerPanel: React.FC<ViewerPanelProps> = ({ laptops }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'filters'>('inventory');
  const [prefs, setPrefs] = useState<UserPreferences>({
    minPrice: 0,
    maxPrice: 10000,
    brand: '',
    laptopType: 'Any',
    minScreenSize: 11,
    touchScreen: 'any',
    minRAM: 4,
    minStorage: 128,
    cpuBrand: 'Any',
    gpuType: 'Any',
    gpuBrand: 'Any',
  });

  // Handle body scroll locking when mobile filters are open
  useEffect(() => {
    if (activeTab === 'filters') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeTab]);

  const availableBrands = useMemo(() => {
    const brandMap = new Map<string, string>();
    laptops.forEach(l => {
      if (l.brand) {
        const lowerBrand = l.brand.toLowerCase().trim();
        if (!brandMap.has(lowerBrand)) {
          const standardized = l.brand.charAt(0).toUpperCase() + l.brand.slice(1).toLowerCase();
          brandMap.set(lowerBrand, standardized);
        }
      }
    });
    return Array.from(brandMap.values()).sort();
  }, [laptops]);

  const availableSegments = useMemo(() => {
    const segmentMap = new Map<string, string>();
    laptops.forEach(l => {
      if (l.segment) {
        const lowerSegment = l.segment.toLowerCase().trim();
        if (!segmentMap.has(lowerSegment)) {
          const standardized = l.segment.charAt(0).toUpperCase() + l.segment.slice(1).toLowerCase();
          segmentMap.set(lowerSegment, standardized);
        }
      }
    });
    return Array.from(segmentMap.values()).sort();
  }, [laptops]);

  const filteredLaptops = useMemo(() => {
    return laptops
      .filter(l => {
        const searchStr = searchTerm.toLowerCase();
        return !searchTerm || 
          l.model.toLowerCase().includes(searchStr) || 
          l.brand.toLowerCase().includes(searchStr) || 
          l.segment.toLowerCase().includes(searchStr);
      })
      .filter(l => l.price >= prefs.minPrice && l.price <= prefs.maxPrice)
      .filter(l => !prefs.brand || l.brand.toLowerCase().trim() === prefs.brand.toLowerCase().trim())
      .filter(l => prefs.laptopType === 'Any' || l.segment.toLowerCase().trim() === prefs.laptopType.toLowerCase().trim())
      .filter(l => l.ramGB >= prefs.minRAM)
      .filter(l => l.storageGB >= prefs.minStorage)
      .filter(l => l.sizeInches >= prefs.minScreenSize)
      .filter(l => prefs.cpuBrand === 'Any' || (l.cpuBrand && l.cpuBrand.toLowerCase().includes(prefs.cpuBrand.toLowerCase())))
      .filter(l => prefs.gpuType === 'Any' || l.gpuType === prefs.gpuType)
      .filter(l => prefs.gpuBrand === 'Any' || (l.gpuBrand && l.gpuBrand.toLowerCase().includes(prefs.gpuBrand.toLowerCase())))
      .filter(l => prefs.touchScreen === 'any' || l.touch === (prefs.touchScreen === true))
      .sort((a, b) => {
        if (b.starRating !== a.starRating) return b.starRating - a.starRating;
        return b.price - a.price;
      });
  }, [laptops, prefs, searchTerm]);

  const isAnyFilterActive = (searchTerm || Object.values(prefs).some(v => v !== '' && v !== 'Any' && v !== 'any' && v !== 5000 && v !== 0 && v !== 4 && v !== 128 && v !== 11));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
      
      {/* Mobile Bottom Tab Navigator */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] w-[90%] max-w-sm">
        <div className="bg-[#1A3D63]/90 backdrop-blur-2xl border border-white/10 rounded-full p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'inventory' ? 'bg-[#B3CFE5] text-[#0A1931] shadow-lg' : 'text-[#B3CFE5]/60 hover:text-[#B3CFE5]'
            }`}
          >
            <Icons.Search />
            <span className="hidden xs:inline">{filteredLaptops.length} Matches</span>
            <span className="xs:hidden">{filteredLaptops.length} Results</span>
          </button>
          <button
            onClick={() => setActiveTab('filters')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'filters' ? 'bg-[#B3CFE5] text-[#0A1931] shadow-lg' : 'text-[#B3CFE5]/60 hover:text-[#B3CFE5]'
            }`}
          >
            <Icons.Filter />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {activeTab === 'filters' && (
        <div className="lg:hidden fixed inset-0 z-[60] pt-16 pb-24 bg-[#0A1931] animate-in slide-in-from-bottom duration-300">
           <div className="h-full overflow-y-auto px-6 py-8 custom-scrollbar">
             <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                 <div className="w-9 h-9 rounded-xl blue-gradient flex items-center justify-center text-[#F6FAFD]">
                   <Icons.Filter />
                 </div>
                 <h2 className="text-xl font-black text-[#F6FAFD] tracking-tight">Active Filters</h2>
               </div>
               {isAnyFilterActive && (
                 <button 
                   onClick={() => {
                     setSearchTerm('');
                     setPrefs({
                       minPrice: 0, maxPrice: 10000, brand: '', laptopType: 'Any', minScreenSize: 11, touchScreen: 'any', 
                       minRAM: 4, minStorage: 128, cpuBrand: 'Any', gpuType: 'Any', gpuBrand: 'Any'
                     });
                   }}
                   className="text-[9px] font-bold text-[#B3CFE5] uppercase tracking-widest"
                 >
                   Reset All
                 </button>
               )}
             </div>
             <FilterControls 
               searchTerm={searchTerm}
               setSearchTerm={setSearchTerm}
               prefs={prefs}
               setPrefs={setPrefs}
               availableBrands={availableBrands}
               availableSegments={availableSegments}
             />
           </div>
        </div>
      )}

      {/* Desktop Sidebar (Always visible on desktop) */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="glass-card rounded-3xl p-6 lg:p-7 sticky top-24 border border-white/5 max-h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl blue-gradient flex items-center justify-center text-[#F6FAFD] shadow-lg shadow-blue-500/10">
                <Icons.Filter />
              </div>
              <h2 className="text-xl font-black text-[#F6FAFD] tracking-tight">Filters</h2>
            </div>
            {isAnyFilterActive && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setPrefs({
                    minPrice: 0, maxPrice: 10000, brand: '', laptopType: 'Any', minScreenSize: 11, touchScreen: 'any', 
                    minRAM: 4, minStorage: 128, cpuBrand: 'Any', gpuType: 'Any', gpuBrand: 'Any'
                  });
                }}
                className="text-[9px] font-bold text-[#B3CFE5] hover:text-[#F6FAFD] transition-colors uppercase tracking-widest"
              >
                Reset
              </button>
            )}
          </div>
          <FilterControls 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            prefs={prefs}
            setPrefs={setPrefs}
            availableBrands={availableBrands}
            availableSegments={availableSegments}
          />
        </div>
      </div>

      {/* Main Content Area (Inventory) */}
      <div className={`lg:col-span-3 space-y-10 ${activeTab === 'filters' ? 'hidden lg:block' : 'block'}`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-[#F6FAFD] mb-3 tracking-tight">Refined <span className="text-[#B3CFE5]">Tech Selection.</span></h2>
            <p className="text-[#4A7FA7] text-sm font-medium leading-relaxed">
              Dynamically identifying top-tier hardware tailored to your exact budget and performance needs.
            </p>
          </div>
          <div className="hidden sm:flex glass-card px-5 py-3 rounded-2xl border-white/10 items-center gap-4 bg-gradient-to-br from-white/[0.05] to-transparent">
            <div className="text-center">
              <span className="block text-[#F6FAFD] font-black text-3xl leading-none">{filteredLaptops.length}</span>
              <span className="text-[#4A7FA7] text-[9px] uppercase font-black tracking-widest">Matches</span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="text-[#B3CFE5] font-bold text-xs uppercase tracking-tighter">
              INVENTORY
            </div>
          </div>
        </div>

        {filteredLaptops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-32 lg:pb-0">
            {filteredLaptops.map((laptop, idx) => (
              <LaptopCard 
                key={laptop.refId || idx} 
                laptop={laptop} 
                isBestMatch={idx === 0} 
              />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-[40px] p-24 text-center border-dashed border-white/10">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#4A7FA7]">
              <Icons.Search />
            </div>
            <h3 className="text-3xl font-black text-[#F6FAFD] mb-4 italic">Grid Empty.</h3>
            <p className="text-[#4A7FA7] max-w-sm mx-auto mb-10 font-medium">Try expanding your price range or relaxing hardware constraints.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setPrefs({
                  minPrice: 0, maxPrice: 10000, brand: '', laptopType: 'Any', minScreenSize: 11, touchScreen: 'any', 
                  minRAM: 4, minStorage: 128, cpuBrand: 'Any', gpuType: 'Any', gpuBrand: 'Any'
                });
              }}
              className="px-8 py-3 rounded-2xl bg-[#B3CFE5] text-[#0A1931] font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all"
            >
              Recalibrate Engine
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
