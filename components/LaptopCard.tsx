
import React, { useState } from 'react';
import { Laptop } from '../types';
import { Icons } from '../constants';

interface LaptopCardProps {
  laptop: Laptop;
  isBestMatch?: boolean;
}

export const LaptopCard: React.FC<LaptopCardProps> = ({ laptop, isBestMatch }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCheckAvailability = () => {
    const searchQuery = encodeURIComponent(`${laptop.brand} ${laptop.model}`);
    const amazonUrl = `https://www.amazon.com/s?k=${searchQuery}`;
    window.open(amazonUrl, '_blank');
  };

  const CompactSpec = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex flex-col bg-white/[0.02] rounded-lg p-2 border border-white/5">
      <span className="text-[8px] font-black text-[#4A7FA7] uppercase tracking-tighter mb-0.5 truncate">{label}</span>
      <span className="text-[10px] font-bold text-[#B3CFE5] truncate">{value || '-'}</span>
    </div>
  );

  // Helper to get a brand-specific gradient or color
  const getBrandAccent = (brand: string) => {
    const b = brand.toLowerCase();
    if (b.includes('apple')) return 'from-[#A2AAAD] to-[#606770]';
    if (b.includes('asus')) return 'from-[#00539B] to-[#1A3D63]';
    if (b.includes('dell')) return 'from-[#007db8] to-[#004a70]';
    if (b.includes('hp')) return 'from-[#0096D6] to-[#005a82]';
    if (b.includes('msi')) return 'from-[#ff0000] to-[#8b0000]';
    if (b.includes('razer')) return 'from-[#44d62c] to-[#000000]';
    return 'from-[#4A7FA7] to-[#1A3D63]';
  };

  return (
    <>
      <div className={`group relative glass-card rounded-2xl p-4 transition-all duration-300 neon-border flex flex-col h-full border border-white/5 ${
        isBestMatch ? 'ring-1 ring-[#B3CFE5]/30 shadow-[0_0_30px_rgba(179,207,229,0.1)]' : ''
      }`}>
        {isBestMatch && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="bg-[#4A7FA7] text-[#F6FAFD] text-[8px] font-black px-2 py-1 rounded-md tracking-widest uppercase shadow-lg border border-white/10">
              TOP VALUE
            </div>
          </div>
        )}
        
        {/* Logic Core Visualization */}
        <div className="relative mb-4 group/core">
          <div className={`aspect-[21/9] bg-[#0A1931] rounded-xl overflow-hidden border border-white/5 relative flex items-center justify-center`}>
            {/* Background Grid/Pattern */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(#B3CFE5 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
            
            {/* Brand Glow & Logo */}
            <div className={`w-24 h-24 rounded-full blur-3xl opacity-20 absolute bg-gradient-to-br ${getBrandAccent(laptop.brand)} group-hover/core:scale-150 transition-transform duration-700`}></div>
            
            <div className="relative z-10 flex flex-col items-center">
               <span className="text-4xl font-black text-white/10 tracking-tighter absolute -bottom-2 -right-2 select-none group-hover/core:text-white/20 transition-colors">
                 {laptop.brand.charAt(0)}
               </span>
               <div className="flex flex-col items-center text-center px-4">
                  <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${getBrandAccent(laptop.brand)} mb-2`}></div>
                  <span className="text-[10px] font-black text-[#B3CFE5] uppercase tracking-[0.4em] mb-1">{laptop.segment} CORE</span>
                  <div className="h-px w-12 bg-white/10"></div>
               </div>
            </div>

            {/* Performance Indicators */}
            <div className="absolute bottom-2 left-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-3 rounded-full ${i < Math.floor(laptop.starRating) ? 'bg-[#B3CFE5]' : 'bg-white/5'}`}
                />
              ))}
            </div>
          </div>
          <div className="absolute top-2 left-2">
            <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md text-[8px] font-black text-[#B3CFE5] rounded border border-[#B3CFE5]/30 uppercase">
              {laptop.refId}
            </span>
          </div>
        </div>

        {/* Title Area */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[#4A7FA7] font-black text-[9px] tracking-widest uppercase">{laptop.brand}</span>
            <div className="h-px bg-white/5 flex-grow"></div>
          </div>
          <h3 className="text-sm font-bold text-[#F6FAFD] truncate" title={laptop.model}>{laptop.model}</h3>
        </div>

        {/* High-Density 2x2 Spec Grid - Custom Requested Layout */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <CompactSpec label="CPU BRAND" value={laptop.cpuBrand} />
          <CompactSpec label="GPU TYPE" value={laptop.gpuType} />
          <CompactSpec label="DRIVE" value={laptop.driveType} />
          <CompactSpec label="RAM TYPE" value={laptop.ramSpeed} />
        </div>

        {/* Dynamic Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-[#4A7FA7] uppercase">Price Point</span>
            <span className="text-lg font-black text-[#F6FAFD]">${laptop.price}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/[0.03] px-2 py-1 rounded-lg border border-white/5">
            <div className="text-[#B3CFE5] scale-75">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs font-black text-[#F6FAFD]">{laptop.starRating}</span>
          </div>
        </div>

        {/* Action Group */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button 
            onClick={handleCheckAvailability}
            className="py-2.5 blue-gradient text-[#F6FAFD] text-[9px] font-black uppercase tracking-wider rounded-lg transition-all shadow-md hover:brightness-110 active:scale-95"
          >
            Check Price
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="py-2.5 bg-white/5 border border-white/10 text-[#B3CFE5]/60 text-[9px] font-black uppercase tracking-wider rounded-lg hover:bg-white/10 hover:text-[#B3CFE5] transition-all"
          >
            Full Specs
          </button>
        </div>
      </div>

      {/* Deep Dive Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass-card rounded-[40px] w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] custom-scrollbar">
            <div className="sticky top-0 bg-[#0A1931]/95 backdrop-blur-md p-8 border-b border-white/5 flex items-center justify-between z-10">
              <div>
                <span className="text-[#B3CFE5] font-black text-[10px] tracking-[0.3em] uppercase">{laptop.brand}</span>
                <h2 className="text-3xl font-black text-[#F6FAFD]">{laptop.model}</h2>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all border border-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-8 space-y-12">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Passmark', value: laptop.passmarkScore },
                  { label: 'G3D Mark', value: laptop.g3dMarkScore },
                  { label: 'Rating', value: `${laptop.starRating}/5` },
                  { label: 'Reviews', value: laptop.reviewCount }
                ].map(stat => (
                  <div key={stat.label} className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 text-center">
                    <span className="block text-[9px] font-black text-[#4A7FA7] uppercase tracking-widest mb-1">{stat.label}</span>
                    <span className="text-lg font-black text-[#F6FAFD] tracking-tight">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-[#B3CFE5] uppercase tracking-[0.2em] border-b border-[#B3CFE5]/20 pb-2">Hardware Specifications</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs py-1 border-b border-white/5"><span className="text-[#4A7FA7]">CPU</span> <span className="text-[#F6FAFD] font-bold">{laptop.cpuBrand} {laptop.cpuSeries}</span></div>
                    <div className="flex justify-between text-xs py-1 border-b border-white/5"><span className="text-[#4A7FA7]">RAM</span> <span className="text-[#F6FAFD] font-bold">{laptop.ramGB}GB {laptop.ramSpeed}</span></div>
                    <div className="flex justify-between text-xs py-1 border-b border-white/5"><span className="text-[#4A7FA7]">GPU</span> <span className="text-[#F6FAFD] font-bold">{laptop.gpuBrand} {laptop.gpuModel}</span></div>
                    <div className="flex justify-between text-xs py-1 border-b border-white/5"><span className="text-[#4A7FA7]">Storage</span> <span className="text-[#F6FAFD] font-bold">{laptop.storageGB}GB {laptop.driveType}</span></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-[#B3CFE5] uppercase tracking-[0.2em] border-b border-[#B3CFE5]/20 pb-2">Visual & Form</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs py-1 border-b border-white/5"><span className="text-[#4A7FA7]">Display</span> <span className="text-[#F6FAFD] font-bold">{laptop.sizeInches}" {laptop.pixels}</span></div>
                    <div className="flex justify-between text-xs py-1 border-b border-white/5"><span className="text-[#4A7FA7]">Panel</span> <span className="text-[#F6FAFD] font-bold">{laptop.panel} {laptop.refreshRate}Hz</span></div>
                    <div className="flex justify-between text-xs py-1 border-b border-white/5"><span className="text-[#4A7FA7]">Weight</span> <span className="text-[#F6FAFD] font-bold">{laptop.weightLbs} lbs</span></div>
                    <div className="flex justify-between text-xs py-1 border-b border-white/5"><span className="text-[#4A7FA7]">Dimensions</span> <span className="text-[#F6FAFD] font-bold">{laptop.length}" x {laptop.width}"</span></div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <button 
                  onClick={handleCheckAvailability}
                  className="w-full py-4 blue-gradient text-[#F6FAFD] text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl hover:brightness-110"
                >
                  Buy Now! (${laptop.price})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
