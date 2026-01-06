
import React from 'react';
import { Card } from './Card';
import type { Transaction } from '../types';
import { mockCategories } from '../constants';
import { DollarSignIcon, TrashIcon } from './icons';

interface TransactionsPageProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
};


const getCategoryIcon = (categoryName: string) => {
  const category = mockCategories.find(c => c.name === categoryName);
  return category ? category.icon : DollarSignIcon;
};

export const TransactionsPage: React.FC<TransactionsPageProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <Card title="Todas as Transações">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Descrição</th>
              <th scope="col" className="px-6 py-3">Categoria</th>
              <th scope="col" className="px-6 py-3">Data</th>
              <th scope="col" className="px-6 py-3">Valor</th>
              <th scope="col" className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => {
              const Icon = getCategoryIcon(t.category);
              return (
                <tr key={t.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {t.description}
                  </th>
                  <td className="px-6 py-4 flex items-center">
                    <Icon className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                    {t.category}
                  </td>
                  <td className="px-6 py-4">{formatDate(t.date)}</td>
                  <td className={`px-6 py-4 font-semibold ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {formatCurrency(t.amount)}
                  </td>
                   <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => onDeleteTransaction(t.id)} 
                      className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
                      aria-label="Excluir transação"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};