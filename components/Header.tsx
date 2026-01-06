
import React, { useState, useRef, useEffect } from 'react';
import { MenuIcon, PlusIcon, BellIcon, SunIcon, MoonIcon } from './icons';
import { NotificationsPopover } from './NotificationsPopover';
import type { Bill } from '../types';

interface HeaderProps {
  toggleSidebar: () => void;
  onAddTransaction: () => void;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
  bills: Bill[];
  onMarkBillAsPaid: (billId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, onAddTransaction, toggleTheme, theme, bills, onMarkBillAsPaid }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const pendingBills = bills.filter(bill => !bill.paid);
  const pendingBillsCount = pendingBills.length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationsRef]);
  
  return (
    <nav className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={toggleSidebar}
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="w-6 h-6" />
            </button>
            <a href="#" className="flex ms-2 md:me-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">FinControl</span>
            </a>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onAddTransaction}
              type="button"
              className="flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <PlusIcon className="w-5 h-5 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Adicionar Transação</span>
            </button>

            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
               {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
            
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(prev => !prev)}
                className="relative p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                  <BellIcon className="w-6 h-6"/>
                  {pendingBillsCount > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-800">{pendingBillsCount}</span>
                  )}
              </button>
              {isNotificationsOpen && (
                <NotificationsPopover
                  bills={pendingBills}
                  onMarkAsPaid={onMarkBillAsPaid}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
