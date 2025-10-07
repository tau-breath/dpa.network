import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DpaLogo } from './DpaLogo';
import { Menu, X, Globe } from 'lucide-react';

const languages = [
    { code: 'ko', name: '한국어', display: 'KO' },
    { code: 'en', name: 'English', display: 'EN' },
    { code: 'ja', name: '日本語', display: 'JA' },
    { code: 'zh-CN', name: '中文 (简体)', display: 'ZH' },
    { code: 'zh-HK', name: '中文 (繁體)', display: 'HK' },
    { code: 'ru', name: 'Русский', display: 'RU' },
    { code: 'es', name: 'Español', display: 'ES' },
    { code: 'pt', name: 'Português', display: 'PT' },
    { code: 'fr', name: 'Français', display: 'FR' },
    { code: 'de', name: 'Deutsch', display: 'DE' },
    { code: 'hi', name: 'हिन्दी', display: 'HI' },
];

export const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const desktopLangDropdownRef = useRef<HTMLDivElement>(null);
    const mobileLangDropdownRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { href: '#purpose', label: t('nav.purpose') },
        { href: '#functions', label: t('nav.functions') },
        { href: '#tech', label: t('nav.tech') },
        { href: '#feelink', label: t('nav.feelink') },
        { href: '#vision', label: t('nav.vision') },
        { href: '#faq', label: t('nav.faq') },
        { href: '#contact', label: t('nav.contact') },
    ];

    const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const clickedInsideDesktop = desktopLangDropdownRef.current && desktopLangDropdownRef.current.contains(event.target as Node);
            const clickedInsideMobile = mobileLangDropdownRef.current && mobileLangDropdownRef.current.contains(event.target as Node);

            if (!clickedInsideDesktop && !clickedInsideMobile) {
                setIsLangDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = navLinks.map(link => document.querySelector(link.href));
        
        sections.forEach(sec => {
            if (sec) observer.observe(sec);
        });

        return () => {
            sections.forEach(sec => {
                if (sec) observer.unobserve(sec);
            });
        };
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };
    
    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMenuOpen(false);
    }
    
    const handleLangSelect = (code: string) => {
        console.log('handleLangSelect called with:', code);
        console.log('Current language:', i18n.language);
        i18n.changeLanguage(code);
        console.log('Language changed to:', code);
        setIsLangDropdownOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#top" onClick={handleLogoClick} className="flex-shrink-0 flex items-center gap-2" aria-label="Back to top">
                        <DpaLogo className="h-8 w-auto text-black" />
                        <span className="font-orbitron font-bold text-lg hidden sm:block">DPA</span>
                    </a>

                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <a 
                                key={link.label} 
                                href={link.href} 
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`text-sm transition-colors px-2 py-1 ${activeSection === link.href.substring(1) ? 'font-bold text-black' : 'font-medium text-gray-700 hover:text-black'}`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="relative" ref={desktopLangDropdownRef}>
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black transition-colors px-2 py-1"
                                aria-haspopup="true"
                                aria-expanded={isLangDropdownOpen}
                            >
                                <Globe size={18} />
                                <span>{currentLang.display}</span>
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-sm rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                                    <div className="py-1">
                                        {languages.map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLangSelect(lang.code)}
                                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="p-2 rounded-md text-gray-700 hover:text-black focus:outline-none">
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm">
                    {navLinks.map(link => (
                        <a 
                            key={link.label} 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === link.href.substring(1) ? 'text-black bg-gray-100' : 'text-gray-700 hover:text-black hover:bg-gray-100'}`}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="border-t border-gray-200 mt-4 pt-4">
                        <div className="flex justify-center">
                            <div className="relative" ref={mobileLangDropdownRef}>
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black transition-colors px-2 py-1"
                                aria-haspopup="true"
                                aria-expanded={isLangDropdownOpen}
                            >
                                <Globe size={18} />
                                <span>{currentLang.display}</span>
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-sm rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                                    <div className="py-1">
                                        {languages.map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLangSelect(lang.code)}
                                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};