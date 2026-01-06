
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Card } from './Card';
import { DownloadIcon } from './icons';
import type { Transaction } from '../types';

interface ReportsPageProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

export const ReportsPage: React.FC<ReportsPageProps> = ({ transactions }) => {
  const today = new Date().toISOString().split('T')[0];
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
  
  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(today);
  const [isLoading, setIsLoading] = useState(false);

  const generatePDF = () => {
    setIsLoading(true);

    const filteredTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
    });

    const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;

    const doc = new jsPDF();

    // Título
    doc.setFontSize(22);
    doc.text("Relatório Financeiro", 14, 20);

    // Período
    doc.setFontSize(12);
    doc.text(`Período: ${formatDate(startDate)} a ${formatDate(endDate)}`, 14, 30);
    
    // Resumo
    autoTable(doc, {
      startY: 40,
      head: [['Resumo Financeiro', '']],
      body: [
          ['Total de Receitas', { content: formatCurrency(totalIncome), styles: { halign: 'right', fontStyle: 'bold', textColor: [0, 128, 0] } }],
          ['Total de Despesas', { content: formatCurrency(totalExpenses), styles: { halign: 'right', fontStyle: 'bold', textColor: [255, 0, 0] } }],
          ['Saldo Final', { content: formatCurrency(balance), styles: { halign: 'right', fontStyle: 'bold', textColor: balance >= 0 ? [0, 0, 255] : [255, 0, 0] } }],
      ],
      theme: 'grid',
      headStyles: { fillColor: [22, 163, 74] },
    });

    // Tabela de Transações
    const tableData = filteredTransactions.map(t => [
      formatDate(t.date),
      t.description,
      t.category,
      { 
        content: formatCurrency(t.amount), 
        styles: { 
          halign: 'right', 
          textColor: t.type === 'income' ? [0, 128, 0] : [255, 0, 0]
        } 
      }
    ]);
    
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Data', 'Descrição', 'Categoria', 'Valor']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235] },
    });
    
    doc.save(`Relatorio_Financeiro_${startDate}_a_${endDate}.pdf`);

    setIsLoading(false);
  };

  return (
    <Card title="Gerar Relatório Financeiro">
      <div className="max-w-md mx-auto">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de Início</label>
              <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de Fim</label>
              <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            </div>
          </div>
          <button
            type="button"
            onClick={generatePDF}
            disabled={isLoading}
            className="w-full flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 disabled:opacity-50"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            {isLoading ? 'Gerando...' : 'Gerar e Baixar PDF'}
          </button>
        </div>
      </div>
    </Card>
  );
};