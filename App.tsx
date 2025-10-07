import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { CoreFunctions } from './components/CoreFunctions';
import { PurposeBlock, TechBlock, FeelinkBlock, VisionBlock, FaqBlock, ContactBlock } from './components/ContentBlocks';
import { Footer } from './components/Footer';
import { initializeSEO, updateMetaTags, updateStructuredData } from './utils/seo';

function App() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [, forceUpdate] = useState({});
  const bgVisual1Ref = useRef<HTMLDivElement>(null);
  const bgVisual2Ref = useRef<HTMLDivElement>(null);

  // Initialize SEO on mount
  useEffect(() => {
    const currentLanguage = i18n.language || 'ko';
    initializeSEO(currentLanguage);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      console.log('Language changed to:', lng);
      // Update SEO meta tags and structured data
      updateMetaTags(lng);
      updateStructuredData(lng);
      forceUpdate({});
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);
  
  useEffect(() => {
    if (loading) return;

    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (bgVisual1Ref.current) {
          bgVisual1Ref.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        if (bgVisual2Ref.current) {
          bgVisual2Ref.current.style.transform = `translateY(${scrollY * 0.05}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [loading]);


  return (
    <div className="bg-white text-gray-800 relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgVisual1Ref}
          className="absolute top-1/4 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 filter blur-3xl"
          style={{ transition: 'transform 0.2s ease-out' }}
        ></div>
        <div
          ref={bgVisual2Ref}
          className="absolute top-3/4 right-10 w-80 h-80 bg-gray-200 rounded-full opacity-20 filter blur-3xl"
          style={{ transition: 'transform 0.2s ease-out' }}
        ></div>
      </div>
      
      <div className="relative z-10">
        <Preloader loading={loading} />
        <div className={`main-content ${!loading ? 'visible' : ''}`}>
          <Header />
          <main>
            <Hero />
            <Section id="purpose" title={t('sections.purpose.title')} subtitle={t('sections.purpose.subtitle')}>
              <PurposeBlock />
            </Section>
            <Section id="functions" title={t('sections.functions.title')} subtitle={t('sections.functions.subtitle')}>
              <CoreFunctions />
            </Section>
            <Section id="tech" title={t('sections.tech.title')} subtitle={t('sections.tech.subtitle')}>
              <TechBlock />
            </Section>
            <Section id="feelink" title={t('sections.feelink.title')} subtitle={t('sections.feelink.subtitle')}>
              <FeelinkBlock />
            </Section>
            <Section id="vision" title={t('sections.vision.title')} subtitle={t('sections.vision.subtitle')}>
              <VisionBlock />
            </Section>
            <Section id="faq" title={t('sections.faq.title')} subtitle={t('sections.faq.subtitle')}>
              <FaqBlock />
            </Section>
            <Section id="contact" title={t('sections.contact.title')} subtitle={t('sections.contact.subtitle')}>
              <ContactBlock />
            </Section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
