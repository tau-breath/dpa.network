import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { PurposeVisual, TechVisual, FeelinkVisual, VisionVisual } from './AnimatedIcons';

interface BlockProps {
  isVisible?: boolean;
}

const ContentWrapper: React.FC<{ isVisible?: boolean; children: React.ReactNode }> = ({ isVisible, children }) => (
  <div className={`transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    {children}
  </div>
);

// PurposeBlock
export const PurposeBlock: React.FC<BlockProps> = ({ isVisible }) => {
  const { t } = useTranslation();
  return (
    <ContentWrapper isVisible={isVisible}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={`flex justify-center md:justify-end animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '200ms' }}>
          <PurposeVisual />
        </div>
        <div className={`text-left animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '400ms' }}>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {t('sections.purpose.p1')}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('sections.purpose.p2')}
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
};

// TechBlock
export const TechBlock: React.FC<BlockProps> = ({ isVisible }) => {
  const { t } = useTranslation();
  return (
    <ContentWrapper isVisible={isVisible}>
      <div className="flex flex-col items-center">
        <div className={`w-full max-w-4xl mb-8 animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '200ms' }}>
          <TechVisual />
        </div>
        <div className={`text-center max-w-3xl animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '400ms' }}>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {t('sections.tech.p1')}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('sections.tech.p2')}
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
};

// FeelinkBlock
export const FeelinkBlock: React.FC<BlockProps> = ({ isVisible }) => {
  const { t } = useTranslation();
  return (
    <ContentWrapper isVisible={isVisible}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
         <div className={`text-left animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '400ms' }}>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {t('sections.feelink.p1')}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('sections.feelink.p2')}
          </p>
        </div>
        <div className={`flex justify-center md:justify-start animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '200ms' }}>
          <FeelinkVisual />
        </div>
      </div>
    </ContentWrapper>
  );
};

// VisionBlock
export const VisionBlock: React.FC<BlockProps> = ({ isVisible }) => {
  const { t } = useTranslation();
  return (
    <ContentWrapper isVisible={isVisible}>
      <div className="flex flex-col items-center">
        <div className={`mb-8 animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '200ms' }}>
          <VisionVisual />
        </div>
        <div className={`text-center max-w-3xl animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '400ms' }}>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {t('sections.vision.p1')}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('sections.vision.p2')}
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
};


// FaqBlock
const FaqItem: React.FC<{ q: string, a: string, isVisible?: boolean, delay: number }> = ({ q, a, isVisible, delay }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`border-b border-gray-200 py-4 animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${delay}ms` }}>
            <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-medium text-black">{q}</h3>
                <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
            >
                <p className="text-gray-700 leading-relaxed">{a}</p>
            </div>
        </div>
    );
};

export const FaqBlock: React.FC<BlockProps> = ({ isVisible }) => {
  const { t } = useTranslation();
  const faqItems = t('sections.faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <ContentWrapper isVisible={isVisible}>
      <div className="max-w-3xl mx-auto">
        {faqItems.map((item, index) => (
          <FaqItem key={index} q={item.q} a={item.a} isVisible={isVisible} delay={200 + index * 100} />
        ))}
      </div>
    </ContentWrapper>
  );
};


// ContactBlock
export const ContactBlock: React.FC<BlockProps> = ({ isVisible }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = t('sections.contact.email');
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <ContentWrapper isVisible={isVisible}>
      <div className="text-center max-w-2xl mx-auto">
        <p className={`text-lg text-gray-700 leading-relaxed mb-8 animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '200ms' }}>
          {t('sections.contact.message')}
        </p>
        <div className={`animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '400ms' }}>
          <button
            onClick={handleCopyEmail}
            className="inline-block bg-black text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {copied ? 'Copied!' : t('sections.contact.email')}
          </button>
        </div>
      </div>
    </ContentWrapper>
  );
};
