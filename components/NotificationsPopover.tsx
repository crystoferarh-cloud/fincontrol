
import React from 'react';
import type { Bill } from '../types';
import { XIcon } from './icons';

interface NotificationsPopoverProps {
  bills: Bill[];
  onMarkAsPaid: (billId: string) => void;
  onClose: () => void;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const isOverdue = (dueDate: string) => new Date(dueDate) < today;
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ bills, onMarkAsPaid, onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
      <div className="flex justify-between items-center p-3 border-b dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">Contas a Pagar</h3>
        <button
          onClick={onClose}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <XIcon className="w-5 h-5" />
          <span className="sr-only">Fechar</span>
        </button>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {bills.length === 0 ? (
          <p className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">Você está em dia com suas contas! 🎉</p>
        ) : (
          bills.sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map(bill => (
            <div key={bill.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{bill.name}</p>
                  <p className={`text-xs ${isOverdue(bill.dueDate) ? 'font-semibold text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                    {isOverdue(bill.dueDate) ? 'Vencida' : 'Vence'} em: {formatDate(bill.dueDate)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(bill.amount)}</p>
              </div>
              <button
                onClick={() => onMarkAsPaid(bill.id)}
                className="mt-2 text-xs font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Marcar como pago
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
