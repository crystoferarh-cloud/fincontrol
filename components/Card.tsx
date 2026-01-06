
import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', titleClassName = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 ${className}`}>
      {title && (
        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${titleClassName}`}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
