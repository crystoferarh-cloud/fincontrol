
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TransactionsPage } from './components/TransactionsPage';
import { BudgetsPage } from './components/BudgetsPage';
import { AddTransactionModal } from './components/AddTransactionModal';
import type { Transaction, Budget, Goal, Category, Bill } from './types';
import { mockTransactions, mockBudgets, mockGoals, mockCategories, mockBills } from './constants';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';
import { LoginPage } from './components/LoginPage';

// Custom hook to keep state in sync with localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}


type View = 'dashboard' | 'transactions' | 'budgets' | 'reports' | 'settings';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', mockTransactions);
  const [budgets, setBudgets] = useLocalStorage<Budget[]>('budgets', mockBudgets);
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', mockGoals);
  const [bills, setBills] = useLocalStorage<Bill[]>('bills', mockBills);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [areNotificationsEnabled, setAreNotificationsEnabled] = useLocalStorage('areNotificationsEnabled', true);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleToggleNotifications = () => {
    setAreNotificationsEnabled(prev => !prev);
  };

  const handleAddTransaction = useCallback((newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [{ ...newTransaction, id: Date.now().toString() }, ...prev]);
    setIsModalOpen(false);
  }, [setTransactions]);
  
  const handleDeleteTransaction = (transactionId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair? Seus dados salvos no navegador serão apagados.')) {
        setIsAuthenticated(false);
        // Reset all user data to initial state
        setTransactions(mockTransactions);
        setBudgets(mockBudgets);
        setGoals(mockGoals);
        setBills(mockBills);
        setAreNotificationsEnabled(true);
    }
  };

  const handleMarkBillAsPaid = (billId: string) => {
    setBills(prevBills =>
      prevBills.map(bill =>
        bill.id === billId ? { ...bill, paid: true } : bill
      )
    );
  };

  const content = useMemo(() => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard transactions={transactions} budgets={budgets} goals={goals} onDeleteTransaction={handleDeleteTransaction} />;
      case 'transactions':
        return <TransactionsPage transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />;
      case 'budgets':
        return <BudgetsPage budgets={budgets} transactions={transactions} />;
      case 'reports':
        return <ReportsPage transactions={transactions} />;
      case 'settings':
        return <SettingsPage areNotificationsEnabled={areNotificationsEnabled} onToggleNotifications={handleToggleNotifications} />;
      default:
        return <Dashboard transactions={transactions} budgets={budgets} goals={goals} onDeleteTransaction={handleDeleteTransaction} />;
    }
  }, [currentView, transactions, budgets, goals, areNotificationsEnabled, handleToggleNotifications, handleDeleteTransaction]);

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
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
          bills={bills}
          onMarkBillAsPaid={handleMarkBillAsPaid}
          areNotificationsEnabled={areNotificationsEnabled}
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