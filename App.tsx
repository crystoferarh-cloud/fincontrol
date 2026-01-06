
import React, { useState, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TransactionsPage } from './components/TransactionsPage';
import { BudgetsPage } from './components/BudgetsPage';
import { AddTransactionModal } from './components/AddTransactionModal';
import type { Transaction, Budget, Goal, Category } from './types';
import { mockTransactions, mockBudgets, mockGoals, mockCategories } from './constants';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';
import { LoginPage } from './components/LoginPage';

type View = 'dashboard' | 'transactions' | 'budgets' | 'reports' | 'settings';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAddTransaction = useCallback((newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [{ ...newTransaction, id: Date.now().toString() }, ...prev]);
    setIsModalOpen(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const content = useMemo(() => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard transactions={transactions} budgets={budgets} goals={goals} />;
      case 'transactions':
        return <TransactionsPage transactions={transactions} />;
      case 'budgets':
        return <BudgetsPage budgets={budgets} transactions={transactions} />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard transactions={transactions} budgets={budgets} goals={goals} />;
    }
  }, [currentView, transactions, budgets, goals]);

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 ${theme}`}>
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          onAddTransaction={() => setIsModalOpen(true)}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          {content}
        </main>
      </div>

      {isModalOpen && (
        <AddTransactionModal
          onClose={() => setIsModalOpen(false)}
          onAddTransaction={handleAddTransaction}
          categories={mockCategories}
        />
      )}
    </div>
  );
}
