
import { CarIcon, GiftIcon, GraduationCapIcon, HeartIcon, HomeIcon, TrendingUpIcon, UtensilsIcon, DollarSignIcon } from './components/icons';
import type { Transaction, Budget, Goal, Category, Bill } from './types';

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

const today = new Date();
const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const mockBills: Bill[] = [
    { id: '1', name: 'Conta de Luz', amount: 150.75, dueDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)), paid: false },
    { id: '2', name: 'Internet', amount: 99.90, dueDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)), paid: false }, // Vencida
    { id: '3', name: 'Cartão de Crédito', amount: 850.00, dueDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)), paid: false },
    { id: '4', name: 'Aluguel', amount: 1500.00, dueDate: formatDate(new Date(new Date().setDate(5))), paid: true }, // Já paga
];
