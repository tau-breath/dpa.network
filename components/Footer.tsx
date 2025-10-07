// Fix: Replaced placeholder content with a complete Footer component.
// This adds the final section to the page and resolves compilation errors.
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOnScreen } from '../hooks/useOnScreen';
import { DpaLogo } from './DpaLogo';
import { Github, MessageSquare } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com/dpa-network', icon: <Github size={24} />, label: 'GitHub' },
  { href: 'https://matrix.to/#/#dpa_network:matrix.org', icon: <MessageSquare size={24} />, label: 'Matrix' },
];

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.1 });

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div ref={ref} className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">

        <div className={`flex justify-center items-center mb-4 animate-fadeIn ${isVisible ? 'visible' : ''}`}>
          <DpaLogo className="h-8 w-auto text-gray-500" />
          <span className="ml-3 text-lg font-orbitron text-gray-700">{t('hero.subtitle')}</span>
        </div>

        <p className={`text-sm text-gray-500 mb-8 animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '150ms' }}>
            {t('footer.tagline')}
        </p>

        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`text-gray-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-110 animate-fadeIn ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${300 + index * 150}ms` }}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <p className={`text-sm text-gray-500 animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '600ms' }}>
          {t('footer.copyright').replace('2025', new Date().getFullYear().toString())}
        </p>
      </div>
    </footer>
  );
};