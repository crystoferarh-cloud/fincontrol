import React from 'react';
import { HomeIcon, WalletIcon, PiggyBankIcon, FileTextIcon, SettingsIcon, LogOutIcon, DollarSignIcon } from './icons';

type View = 'dashboard' | 'transactions' | 'budgets' | 'reports' | 'settings';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  currentView: View;
  setCurrentView: (view: View) => void;
  onLogout: () => void;
}

// Fix: Removed the wrapping <li> from NavItem to resolve the type error with the `key` prop.
// The `<li>` element is now created in the `.map()` loop in the Sidebar component.
const NavItem = ({ icon: Icon, label, isActive, onClick }: { icon: React.ComponentType<{ className?: string }>, label: string, isActive: boolean, onClick: () => void }) => (
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className={`flex items-center p-3 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-primary-50 dark:bg-gray-700' : ''}`}
  >
    <Icon className={`w-6 h-6 transition duration-75 ${isActive ? 'text-primary-600 dark:text-primary-500' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`} />
    <span className="ms-3">{label}</span>
  </a>
);

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen, currentView, setCurrentView, onLogout }) => {
  const navItems: { view: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { view: 'transactions', label: 'Transações', icon: WalletIcon },
    { view: 'budgets', label: 'Orçamentos', icon: PiggyBankIcon },
    { view: 'reports', label: 'Relatórios', icon: FileTextIcon },
    { view: 'settings', label: 'Configurações', icon: SettingsIcon },
  ];

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    if (window.innerWidth < 768) { // md breakpoint
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {/* Fix: Wrapped NavItem in an `li` tag and moved the `key` prop to the `li` element. */}
            {navItems.map(item => (
              <li key={item.view}>
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  isActive={currentView === item.view}
                  onClick={() => handleNavigation(item.view)}
                />
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
             <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LogOutIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Sair</span>
             </a>
          </div>
        </div>
      </aside>
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-30 bg-gray-900/50 md:hidden"></div>}
    </>
  );
};
