
import React from 'react';
import { Card } from './Card';
import { DownloadIcon, FileTextIcon } from './icons';

export const ReportsPage: React.FC = () => {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center text-center p-8">
        <FileTextIcon className="w-16 h-16 text-primary-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Relatórios Avançados</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Em breve, você poderá gerar relatórios detalhados em PDF e Excel para uma análise aprofundada de suas finanças.
        </p>
        <button
          type="button"
          className="flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          <DownloadIcon className="w-5 h-5 mr-2" />
          Baixar Relatório de Exemplo
        </button>
      </div>
    </Card>
  );
};
