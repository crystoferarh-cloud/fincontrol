
import React, { useMemo } from 'react';
import { Card } from './Card';
import type { Budget, Transaction } from '../types';

interface BudgetsPageProps {
  budgets: Budget[];
  transactions: Transaction[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const BudgetsPage: React.FC<BudgetsPageProps> = ({ budgets, transactions }) => {

  const budgetWithSpent = useMemo(() => {
    return budgets.map(budget => {
      const spent = transactions
        .filter(t => t.type === 'expense' && t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...budget, spent };
    });
  }, [budgets, transactions]);

  return (
    <Card title="Acompanhamento de Orçamentos">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetWithSpent.map(budget => {
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
          const isOverBudget = percentage >= 100;
          const remaining = budget.limit - budget.spent;
          const progressBarColor = isOverBudget ? 'bg-red-500' : 'bg-primary-600';
          const remainingColor = remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';

          return (
            <Card key={budget.id} title={budget.category} className="!shadow-md">
              <div className="space-y-3">
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                  <div className={`${progressBarColor} h-4 rounded-full`} style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Gasto:</span>
                    <span>{formatCurrency(budget.spent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Limite:</span>
                    <span>{formatCurrency(budget.limit)}</span>
                  </div>
                  <hr className="my-2 border-gray-200 dark:border-gray-600" />
                  <div className="flex justify-between">
                    <span className="font-medium">Restante:</span>
                    <span className={`font-bold ${remainingColor}`}>{formatCurrency(remaining)}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};
