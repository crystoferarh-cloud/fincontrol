
import React, { useState } from 'react';
import { XIcon } from './icons';
import type { Category, Transaction, TransactionType } from '../types';

interface AddTransactionModalProps {
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  categories: Category[];
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose, onAddTransaction, categories }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories.length > 0 ? categories[1].name : '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date || !description) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      date,
      description
    });
  };

  const incomeCategories = categories.filter(c => c.name === 'Salário');
  const expenseCategories = categories.filter(c => c.name !== 'Salário');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg p-4">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white" id="modal-title">
              Adicionar Nova Transação
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <XIcon className="w-6 h-6" />
              <span className="sr-only">Fechar modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`w-full p-2 rounded-lg font-semibold ${type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Despesa
              </button>
              <button
                type="button"
                onClick={() => { setType('income'); setCategory(incomeCategories[0].name); }}
                className={`w-full p-2 rounded-lg font-semibold ${type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Receita
              </button>
            </div>
            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor (R$)</label>
              <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="100.00" required />
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
              <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                {(type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data</label>
              <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
              <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Ex: Compras no supermercado" required />
            </div>
            <div className="flex items-center justify-end pt-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button onClick={onClose} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
              <button type="submit" className="ms-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Salvar Transação</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
