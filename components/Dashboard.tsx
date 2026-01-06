
import React, { useMemo } from 'react';
import { Card } from './Card';
import type { Transaction, Budget, Goal } from '../types';
import { mockCategories } from '../constants';
import { TrendingUpIcon, DollarSignIcon } from './icons';

interface DashboardProps {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const getCategoryIcon = (categoryName: string) => {
  const category = mockCategories.find(c => c.name === categoryName);
  return category ? category.icon : DollarSignIcon;
};

export const Dashboard: React.FC<DashboardProps> = ({ transactions, budgets, goals }) => {
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, balance };
  }, [transactions]);

  const recentTransactions = transactions.slice(0, 5);

  const budgetWithSpent = useMemo(() => {
    return budgets.map(budget => {
      const spent = transactions
        .filter(t => t.type === 'expense' && t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...budget, spent };
    });
  }, [budgets, transactions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Receitas do Mês" className="bg-green-50 dark:bg-green-900/50">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(totalIncome)}</p>
        </Card>
        <Card title="Despesas do Mês" className="bg-red-50 dark:bg-red-900/50">
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{formatCurrency(totalExpenses)}</p>
        </Card>
        <Card title="Saldo Atual" className="bg-blue-50 dark:bg-blue-900/50">
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>{formatCurrency(balance)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Orçamentos">
          <div className="space-y-4">
            {budgetWithSpent.map(budget => {
              const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
              const isOverBudget = percentage >= 100;
              const progressBarColor = isOverBudget ? 'bg-red-500' : 'bg-primary-600';
              return (
                <div key={budget.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-gray-700 dark:text-white">{budget.category}</span>
                    <span className={`text-sm font-medium ${isOverBudget ? 'text-red-500' : 'text-gray-700 dark:text-white'}`}>
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className={`${progressBarColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Metas Financeiras">
          <div className="space-y-4">
            {goals.map(goal => {
              const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
              return (
                <div key={goal.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-gray-700 dark:text-white">{goal.name}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-white">{formatCurrency(goal.currentAmount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card title="Transações Recentes">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentTransactions.map(t => {
            const Icon = getCategoryIcon(t.category);
            return (
              <li key={t.id} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                    <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{t.description}</p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{t.category}</p>
                  </div>
                  <div className={`inline-flex items-center text-base font-semibold ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};
