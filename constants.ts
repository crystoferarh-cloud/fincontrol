
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

const today = new Date();
const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const mockTransactions: Transaction[] = [
  { id: '1', type: 'income', category: 'Salário', amount: 5000, date: formatDate(new Date(today.getFullYear(), today.getMonth(), 1)), description: 'Salário Mensal' },
  { id: '2', type: 'expense', category: 'Moradia', amount: 1500, date: formatDate(new Date(today.getFullYear(), today.getMonth(), 5)), description: 'Aluguel' },
  { id: '3', type: 'expense', category: 'Alimentação', amount: 800, date: formatDate(new Date(today.getFullYear(), today.getMonth(), 3)), description: 'Compras do mês' },
  { id: '4', type: 'expense', category: 'Transporte', amount: 200, date: formatDate(new Date(today.getFullYear(), today.getMonth(), 2)), description: 'Combustível' },
  { id: '5', type: 'expense', category: 'Lazer', amount: 300, date: formatDate(new Date(today.getFullYear(), today.getMonth(), 10)), description: 'Cinema e Jantar' },
  { id: '6', type: 'expense', category: 'Saúde', amount: 150, date: formatDate(new Date(today.getFullYear(), today.getMonth(), 12)), description: 'Farmácia' },
  { id: '7', type: 'expense', category: 'Investimentos', amount: 1000, date: formatDate(new Date(today.getFullYear(), today.getMonth(), 15)), description: 'Aporte Tesouro Selic' },
  { id: '8', type: 'income', category: 'Salário', amount: 250, date: formatDate(new Date(today.getFullYear(), today.getMonth(), 18)), description: 'Freelance' },
];

export const mockBudgets: Budget[] = [
  { id: '1', category: 'Alimentação', limit: 1000 },
  { id: '2', category: 'Transporte', limit: 300 },
  { id: '3', category: 'Lazer', limit: 500 },
];

export const mockGoals: Goal[] = [
  { id: '1', name: 'Viagem para a Europa', targetAmount: 15000, currentAmount: 7500 },
  { id: '2', name: 'Reserva de Emergência', targetAmount: 20000, currentAmount: 18000 },
];
