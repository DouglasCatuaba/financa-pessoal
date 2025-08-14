import React, { useEffect, useState } from 'react';
import Dashboard from './features/dashboard/Dashboard';
import TransactionModal from './features/transactions/TransactionModal';

// The main application component. Provides navigation, theme toggling
// and renders the currently selected screen. New screens can be added
// later (recorrentes, orçamentos, regras, configurações, etc.).
const App: React.FC = () => {
  const [page, setPage] = useState<'dashboard' | 'movimentacoes' | 'recorrentes' | 'orcamentos' | 'regras' | 'configuracoes'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dark, setDark] = useState<boolean>(() => {
    // Retrieve the initial theme from localStorage or system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('financa-theme');
      if (stored !== null) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Update the class on <html> when dark mode changes
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('financa-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Navigation items with labels and keys
  const navItems: { key: typeof page; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'movimentacoes', label: 'Movimentações' },
    { key: 'recorrentes', label: 'Recorrentes' },
    { key: 'orcamentos', label: 'Orçamentos' },
    { key: 'regras', label: 'Regras' },
    { key: 'configuracoes', label: 'Configurações' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <header className="flex items-center justify-between px-4 py-3 bg-primary text-white shadow md:px-8">
        <h1 className="text-lg font-semibold">Finança Pessoal</h1>
        <div className="flex items-center space-x-4">
          {/* New transaction button visible on all pages */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-success hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Nova Movimentação
          </button>
          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30"
            aria-label="Alternar tema"
          >
            {dark ? (
              // Simple icons drawn using unicode characters. A proper
              // implementation could use an icon library.
              <span role="img" aria-label="Sol" className="text-yellow-400">
                ☀️
              </span>
            ) : (
              <span role="img" aria-label="Lua" className="text-blue-200">
                🌙
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 p-4 md:p-8">
        {page === 'dashboard' && <Dashboard />}
        {/* Future pages can be added here. */}
      </main>

      {/* Bottom navigation (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-primary text-white py-2 md:hidden">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            className={`flex-1 text-center text-xs ${page === item.key ? 'font-bold' : 'opacity-70'}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Modal for adding or editing a transaction */}
      {isModalOpen && (
        <TransactionModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;