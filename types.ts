// Fix: Import ComponentType from react to resolve the namespace error.
import type { ComponentType } from 'react';

export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
}

export interface Transaction {
  id:string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string; // ISO 8601 format: "YYYY-MM-DD"
  description: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}
