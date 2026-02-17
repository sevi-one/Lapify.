
import React, { useState, useEffect, useCallback } from 'react';
import { Role, Laptop, SheetConfig } from './types';
import { Layout } from './components/Layout';
import { ViewerPanel } from './components/ViewerPanel';
import { AdminPanel } from './components/AdminPanel';
import { DEFAULT_SHEET_ID, DEFAULT_TAB_NAME } from './constants';
import { fetchSheetData } from './services/sheetService';

const ADMIN_PASSWORD = 'louies123';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('VIEWER');
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [config, setConfig] = useState<SheetConfig>({
    sheetId: DEFAULT_SHEET_ID,
    tabName: DEFAULT_TAB_NAME,
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setIsDemoMode(false);
    try {
      const data = await fetchSheetData(config.sheetId, config.tabName);
      setLaptops(data);
    } catch (err) {
      console.error('App layer sync error:', err);
      setIsDemoMode(true);
    } finally {
      setIsLoading(false);
    }
  }, [config.sheetId, config.tabName]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAdminRequest = () => {
    if (isAuthenticated) {
      setRole('ADMIN');
    } else {
      setShowLoginModal(true);
      setLoginError(false);
      setPasswordInput('');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setRole('ADMIN');
      setShowLoginModal(false);
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 500);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('VIEWER');
  };

  return (
    <Layout 
      role={role} 
      setRole={setRole} 
      isAuthenticated={isAuthenticated} 
      onLogout={handleLogout}
      onRequestAdmin={handleAdminRequest}
    >

      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
          <div className={`glass-card rounded-[40px] p-6 sm:p-12 mt-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 max-w-sm landscape:max-w-2xl lg:max-w-2xl w-full transition-all duration-300 transform 
            ${loginError ? 'animate-pulse' : 'scale-100'}
            flex flex-col landscape:flex-row lg:flex-row items-center landscape:items-center lg:items-start gap-8 landscape:gap-10 lg:gap-12
            max-h-[95vh] landscape:max-h-[90vh] overflow-y-auto custom-scrollbar
          `}>
            
            {/* Left Column: Branding / Status */}
            <div className="text-center landscape:text-left lg:text-left landscape:w-1/2 lg:w-1/2 flex flex-col items-center landscape:items-start lg:items-start justify-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 blue-gradient text-[#F6FAFD] rounded-[20px] sm:rounded-[28px] flex items-center justify-center mb-4 sm:mb-6 shadow-[0_10px_25px_rgba(74,127,167,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-[#F6FAFD] tracking-tight">System Access</h2>
              <p className="text-[#4A7FA7] text-[10px] sm:text-sm mt-2 font-medium max-w-[180px] landscape:max-w-none lg:max-w-none">
                Identity verification required for administrative privileges.
              </p>
            </div>

            {/* Right Column: Input Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 sm:space-y-6 w-full landscape:w-1/2 lg:w-1/2 lg:pt-2">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-[#4A7FA7] uppercase tracking-[0.2em]">Security Key</label>
                <div className="relative">
                  <input 
                    autoFocus
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className={`w-full bg-white/5 border ${loginError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-3 sm:py-4 text-[#F6FAFD] focus:ring-2 focus:ring-[#B3CFE5] outline-none transition-all placeholder:text-[#0A1931]/50`}
                    placeholder="••••••••"
                  />
                  {loginError && (
                    <span className="absolute -bottom-5 left-0 text-[9px] font-bold text-red-400 uppercase tracking-widest animate-fade-in">
                      Invalid Credential
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:pt-2">
                <button 
                  type="submit"
                  className="w-full py-3 sm:py-4 blue-gradient text-[#F6FAFD] font-black text-xs sm:text-sm rounded-2xl shadow-[0_10px_30px_rgba(74,127,167,0.3)] hover:shadow-[0_15px_40px_rgba(74,127,167,0.4)] transition-all active:scale-[0.98]"
                >
                  Authorize Access
                </button>
                <button 
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="w-full py-1 sm:py-2 text-[#4A7FA7] font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:text-[#B3CFE5] transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
          <div className="relative w-24 h-24">
             <div className="absolute inset-0 border-8 border-white/5 rounded-full"></div>
             <div className="absolute inset-0 border-8 border-t-[#B3CFE5] rounded-full animate-spin shadow-[0_0_20px_rgba(179,207,229,0.2)]"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-[#F6FAFD] font-black text-xl uppercase tracking-widest">Synchronizing Systems</h3>
            <p className="text-[#4A7FA7] text-sm font-medium animate-pulse">Establishing secure link with Google Sheets API...</p>
          </div>
        </div>
      ) : role === 'VIEWER' ? (
        <ViewerPanel laptops={laptops} />
      ) : (
        <AdminPanel 
          config={config} 
          setConfig={setConfig} 
          laptops={laptops} 
          refreshData={loadData}
        />
      )}
    </Layout>
  );
};

export default App;
