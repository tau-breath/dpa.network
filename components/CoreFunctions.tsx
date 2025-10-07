import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Eye, FileBadge, Lock } from 'lucide-react';

interface FunctionCardProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
  isVisible?: boolean;
  delay?: number;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ icon, title, details, isVisible, delay = 0 }) => (
  <div 
    className={`glass-card rounded-xl p-6 flex flex-col items-start h-full group transition-all duration-200 ease-out border-b-4 border-gray-200 hover:border-black/20 hover:-translate-y-1 hover:shadow-lg animate-fadeIn ${isVisible ? 'visible' : ''}`}
    style={{ animationDelay: `${delay}ms`}}
  >
    <div className={`mb-4 text-black group-hover:text-blue-500 transition-colors duration-300 animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${delay + 150}ms`}}>
      {icon}
    </div>
    <h3 className={`text-xl font-bold font-orbitron text-black mb-4 animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${delay + 250}ms`}}>{title}</h3>
    <ul className={`space-y-2 text-sm text-gray-700 list-none w-full flex-grow animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${delay + 450}ms`}}>
      {details.map((detail, index) => (
        <li key={index} className="flex items-start">
          <span className="text-blue-500 mr-2 mt-1">&#9679;</span>
          <span>{detail}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface CoreFunctionsProps {
  isVisible?: boolean;
}

export const CoreFunctions: React.FC<CoreFunctionsProps> = ({ isVisible }) => {
  const { t } = useTranslation();

  const functionsData = [
    {
      icon: <Shield size={32} />,
      title: t('sections.functions.protection.title'),
      details: t('sections.functions.protection.items', { returnObjects: true }) as string[]
    },
    {
      icon: <Eye size={32} />,
      title: t('sections.functions.audit.title'),
      details: t('sections.functions.audit.items', { returnObjects: true }) as string[]
    },
    {
      icon: <FileBadge size={32} />,
      title: t('sections.functions.identity.title'),
      details: t('sections.functions.identity.items', { returnObjects: true }) as string[]
    },
    {
      icon: <Lock size={32} />,
      title: t('sections.functions.encryption.title'),
      details: t('sections.functions.encryption.items', { returnObjects: true }) as string[]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {functionsData.map((func, index) => (
          <FunctionCard
            key={index}
            icon={func.icon}
            title={func.title}
            details={func.details}
            isVisible={isVisible}
            delay={index * 150}
          />
      ))}
    </div>
  );
};