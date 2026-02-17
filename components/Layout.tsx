
import React from 'react';
import { Role } from '../types';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  role: Role;
  setRole: (role: Role) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  onRequestAdmin: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  role, 
  setRole, 
  isAuthenticated, 
  onLogout,
  onRequestAdmin 
}) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-400/30">
      {/* Hero Background Elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] hero-glow pointer-events-none z-0"></div>
      
      <header className="sticky top-0 z-50 bg-[#0A1931]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Logo Section */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <div className="blue-gradient p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-[#F6FAFD] shadow-[0_0_15px_rgba(74,127,167,0.3)]">
              <div className="scale-75 sm:scale-100">
                <Icons.Laptop />
              </div>
            </div>
            <h1 className="text-base sm:text-xl font-bold text-[#F6FAFD] tracking-tight whitespace-nowrap">
              Lap<span className="text-[#B3CFE5]">ify</span>
            </h1>
          </div>
          
          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-hidden">
            <div className="flex bg-white/5 p-0.5 sm:p-1 rounded-full border border-white/10 flex-shrink-0">
              <button
                onClick={() => setRole('VIEWER')}
                className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black sm:font-bold transition-all whitespace-nowrap ${
                  role === 'VIEWER' 
                  ? 'bg-[#B3CFE5] text-[#0A1931] shadow-sm' 
                  : 'text-[#B3CFE5]/60 hover:text-[#B3CFE5]'
                }`}
              >
                Viewer
              </button>
              <button
                onClick={onRequestAdmin}
                className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black sm:font-bold transition-all whitespace-nowrap ${
                  role === 'ADMIN' 
                  ? 'bg-[#B3CFE5] text-[#0A1931] shadow-sm' 
                  : 'text-[#B3CFE5]/60 hover:text-[#B3CFE5]'
                }`}
              >
                Admin {isAuthenticated && role === 'ADMIN' && (
                  <span className="hidden xs:inline">✓</span>
                )}
              </button>
            </div>

            {isAuthenticated && role === 'ADMIN' && (
              <button 
                onClick={onLogout}
                className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] sm:text-xs font-black sm:font-bold hover:bg-red-500/20 transition-all flex-shrink-0 whitespace-nowrap"
              >
                <span className="xs:hidden">Logout</span>
                <span className="hidden xs:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow relative z-10">
        {/* Hero Section Styling for Viewer Panel */}
        {role === 'VIEWER' && (
          <div className="pt-10 sm:pt-16 pb-8 sm:pb-12 text-center max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tighter text-gradient leading-tight">
              Redefining Laptop Search. <br/> <span className="text-[#B3CFE5]">Finding the Perfect Fit.</span>
            </h2>
            <p className="text-[#B3CFE5]/70 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Designed to simplify your decision. Find the right laptop faster, smarter, and with confidence.
            </p>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {children}
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 bg-[#0A1931] mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-4">
            <h4 className="text-base sm:text-xl font-bold text-[#F6FAFD] tracking-tight whitespace-nowrap">
              Lap<span className="text-[#B3CFE5]">ify</span>
            </h4>
            <p className="text-[#B3CFE5]/40 text-sm">Built on trust. Driven by results. Find the machine that powers your future.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-[#B3CFE5]/50">
             <a href="#" className="hover:text-[#F6FAFD] transition-colors">Reference</a>
             <a href="https://docs.google.com/spreadsheets/d/1kpc4sztiwRvb9OWFLReF_GtXahaDvpItJhC9ktwz_CA/edit?gid=262110091#gid=262110091" className="hover:text-[#F6FAFD] transition-colors">Laptop Recommendations</a>
          </div>
          <div className="text-sm text-[#B3CFE5]/30 md:text-right">
            &copy; 2026 Lapify.
          </div>
        </div>
      </footer>
    </div>
  );
};
