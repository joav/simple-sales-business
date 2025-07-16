import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className = '' }) => {
  return (
    <h2 className={`text-xl font-bold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
};

export default Title;
