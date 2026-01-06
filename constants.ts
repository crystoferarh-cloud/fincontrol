
import { CarIcon, GiftIcon, GraduationCapIcon, HeartIcon, HomeIcon, TrendingUpIcon, UtensilsIcon, DollarSignIcon } from './components/icons';
import type { Transaction, Budget, Goal, Category } from './types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Salário', icon: DollarSignIcon },
  { id: '2', name: 'Moradia', icon: HomeIcon },
  { id: '3', name: 'Alimentação', icon: UtensilsIcon },
  { id: '4', name: 'Transporte', icon: CarIcon },
  { id: '5', name: 'Investimentos', icon: TrendingUpIcon },
  { id: '6', name: 'Lazer', icon: GiftIcon },
  { id: '7', name: 'Saúde', icon: HeartIcon },
  { id: '8', name: 'Educação', icon: GraduationCapIcon },
];

// Dados financeiros zerados
export const mockTransactions: Transaction[] = [];

export const mockBudgets: Budget[] = [];

export const mockGoals: Goal[] = [];
