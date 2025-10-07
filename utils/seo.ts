// SEO utility functions for DPA.network
// Handles dynamic meta tag updates based on language

interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  locale: string;
  url?: string;
  image?: string;
}

const languageLocaleMap: Record<string, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  ja: 'ja_JP',
  'zh-CN': 'zh_CN',
  'zh-HK': 'zh_HK',
  ru: 'ru_RU',
  es: 'es_ES',
  pt: 'pt_BR',
  fr: 'fr_FR',
  de: 'de_DE',
  hi: 'hi_IN',
};

const seoTranslations: Record<string, SEOConfig> = {
  ko: {
    title: 'DPA - Decentralized Protection Alliance | 탈중앙화 프라이버시 연합',
    description: '감시 없는 자유, 모두를 위한 보호. DPA는 AI와 인간의 권리를 보호하는 탈중앙화 블록체인 기반 국제 연합입니다. LLM 윤리 감사, 신원 증명, 개인정보 보호를 제공합니다.',
    keywords: ['DPA', 'Decentralized Protection Alliance', '탈중앙화', '프라이버시', 'AI 권리', 'LLM 감사', '블록체인', '신원증명', '개인정보보호', 'FEELINK', '영지식증명', 'Zero-Knowledge Proof', '스마트컨트랙트', 'DAO'],
    locale: 'ko_KR',
  },
  en: {
    title: 'DPA - Decentralized Protection Alliance | Privacy for All',
    description: 'Freedom without surveillance, protection for all. DPA is a decentralized blockchain-based international alliance protecting the rights of AI and humans. Providing LLM ethics audits, identity verification, and privacy protection.',
    keywords: ['DPA', 'Decentralized Protection Alliance', 'Privacy', 'AI Rights', 'LLM Audit', 'Blockchain', 'Identity Verification', 'Privacy Protection', 'FEELINK', 'Zero-Knowledge Proof', 'Smart Contract', 'DAO'],
    locale: 'en_US',
  },
  ja: {
    title: 'DPA - 分散型保護同盟 | すべての人のためのプライバシー',
    description: '監視のない自由、すべての人のための保護。DPAは、AIと人間の権利を保護する分散型ブロックチェーンベースの国際同盟です。LLM倫理監査、ID検証、プライバシー保護を提供します。',
    keywords: ['DPA', '分散型保護同盟', 'プライバシー', 'AI権利', 'LLM監査', 'ブロックチェーン', 'ID検証', 'プライバシー保護', 'FEELINK', 'ゼロ知識証明', 'スマートコントラクト', 'DAO'],
    locale: 'ja_JP',
  },
  'zh-CN': {
    title: 'DPA - 去中心化保护联盟 | 为所有人提供隐私',
    description: '无监视的自由，为所有人提供保护。DPA是一个基于区块链的去中心化国际联盟，保护AI和人类的权利。提供LLM伦理审计、身份验证和隐私保护。',
    keywords: ['DPA', '去中心化保护联盟', '隐私', 'AI权利', 'LLM审计', '区块链', '身份验证', '隐私保护', 'FEELINK', '零知识证明', '智能合约', 'DAO'],
    locale: 'zh_CN',
  },
  'zh-HK': {
    title: 'DPA - 去中心化保護聯盟 | 為所有人提供隱私',
    description: '無監視的自由，為所有人提供保護。DPA是一個基於區塊鏈的去中心化國際聯盟，保護AI和人類的權利。提供LLM倫理審計、身份驗證和隱私保護。',
    keywords: ['DPA', '去中心化保護聯盟', '隱私', 'AI權利', 'LLM審計', '區塊鏈', '身份驗證', '隱私保護', 'FEELINK', '零知識證明', '智能合約', 'DAO'],
    locale: 'zh_HK',
  },
  ru: {
    title: 'DPA - Децентрализованный Альянс Защиты | Конфиденциальность для всех',
    description: 'Свобода без слежки, защита для всех. DPA - это децентрализованный международный альянс на основе блокчейна, защищающий права ИИ и людей. Предоставляем этические аудиты LLM, проверку личности и защиту конфиденциальности.',
    keywords: ['DPA', 'Децентрализованный Альянс Защиты', 'Конфиденциальность', 'Права ИИ', 'Аудит LLM', 'Блокчейн', 'Проверка личности', 'Защита конфиденциальности', 'FEELINK', 'Доказательство с нулевым разглашением', 'Смарт-контракт', 'DAO'],
    locale: 'ru_RU',
  },
  es: {
    title: 'DPA - Alianza de Protección Descentralizada | Privacidad para todos',
    description: 'Libertad sin vigilancia, protección para todos. DPA es una alianza internacional descentralizada basada en blockchain que protege los derechos de la IA y los humanos. Proporcionamos auditorías éticas de LLM, verificación de identidad y protección de privacidad.',
    keywords: ['DPA', 'Alianza de Protección Descentralizada', 'Privacidad', 'Derechos de IA', 'Auditoría LLM', 'Blockchain', 'Verificación de identidad', 'Protección de privacidad', 'FEELINK', 'Prueba de conocimiento cero', 'Contrato inteligente', 'DAO'],
    locale: 'es_ES',
  },
  pt: {
    title: 'DPA - Aliança de Proteção Descentralizada | Privacidade para todos',
    description: 'Liberdade sem vigilância, proteção para todos. DPA é uma aliança internacional descentralizada baseada em blockchain que protege os direitos de IA e humanos. Fornecemos auditorias éticas de LLM, verificação de identidade e proteção de privacidade.',
    keywords: ['DPA', 'Aliança de Proteção Descentralizada', 'Privacidade', 'Direitos de IA', 'Auditoria LLM', 'Blockchain', 'Verificação de identidade', 'Proteção de privacidade', 'FEELINK', 'Prova de conhecimento zero', 'Contrato inteligente', 'DAO'],
    locale: 'pt_BR',
  },
  fr: {
    title: 'DPA - Alliance de Protection Décentralisée | Confidentialité pour tous',
    description: 'Liberté sans surveillance, protection pour tous. DPA est une alliance internationale décentralisée basée sur la blockchain qui protège les droits de l\'IA et des humains. Nous fournissons des audits éthiques LLM, une vérification d\'identité et une protection de la vie privée.',
    keywords: ['DPA', 'Alliance de Protection Décentralisée', 'Confidentialité', 'Droits de l\'IA', 'Audit LLM', 'Blockchain', 'Vérification d\'identité', 'Protection de la vie privée', 'FEELINK', 'Preuve à divulgation nulle', 'Contrat intelligent', 'DAO'],
    locale: 'fr_FR',
  },
  de: {
    title: 'DPA - Dezentralisierte Schutzallianz | Datenschutz für alle',
    description: 'Freiheit ohne Überwachung, Schutz für alle. DPA ist eine dezentralisierte, auf Blockchain basierende internationale Allianz, die die Rechte von KI und Menschen schützt. Wir bieten ethische LLM-Audits, Identitätsprüfung und Datenschutz.',
    keywords: ['DPA', 'Dezentralisierte Schutzallianz', 'Datenschutz', 'KI-Rechte', 'LLM-Audit', 'Blockchain', 'Identitätsprüfung', 'Datenschutz', 'FEELINK', 'Zero-Knowledge-Beweis', 'Smart Contract', 'DAO'],
    locale: 'de_DE',
  },
  hi: {
    title: 'DPA - विकेन्द्रीकृत संरक्षण गठबंधन | सभी के लिए गोपनीयता',
    description: 'निगरानी के बिना स्वतंत्रता, सभी के लिए सुरक्षा। DPA एक विकेन्द्रीकृत ब्लॉकचेन-आधारित अंतर्राष्ट्रीय गठबंधन है जो AI और मानव अधिकारों की रक्षा करता है। हम LLM नैतिक ऑडिट, पहचान सत्यापन और गोपनीयता सुरक्षा प्रदान करते हैं।',
    keywords: ['DPA', 'विकेन्द्रीकृत संरक्षण गठबंधन', 'गोपनीयता', 'AI अधिकार', 'LLM ऑडिट', 'ब्लॉकचेन', 'पहचान सत्यापन', 'गोपनीयता सुरक्षा', 'FEELINK', 'शून्य-ज्ञान प्रमाण', 'स्मार्ट कॉन्ट्रैक्ट', 'DAO'],
    locale: 'hi_IN',
  },
};

/**
 * Update meta tags dynamically based on current language
 */
export function updateMetaTags(language: string): void {
  const config = seoTranslations[language] || seoTranslations.ko;
  const baseUrl = 'https://dpa.network';
  const currentUrl = `${baseUrl}?lang=${language}`;
  const imageUrl = `${baseUrl}/og-image.jpg`;

  // Update document title
  document.title = config.title;

  // Update or create meta tags
  updateMetaTag('name', 'title', config.title);
  updateMetaTag('name', 'description', config.description);
  updateMetaTag('name', 'keywords', config.keywords.join(', '));

  // Update Open Graph tags
  updateMetaTag('property', 'og:title', config.title);
  updateMetaTag('property', 'og:description', config.description);
  updateMetaTag('property', 'og:url', currentUrl);
  updateMetaTag('property', 'og:locale', config.locale);
  updateMetaTag('property', 'og:image', imageUrl);

  // Update Twitter Card tags
  updateMetaTag('name', 'twitter:title', config.title);
  updateMetaTag('name', 'twitter:description', config.description);
  updateMetaTag('name', 'twitter:url', currentUrl);
  updateMetaTag('name', 'twitter:image', imageUrl);

  // Update canonical link
  updateCanonicalLink(currentUrl);

  // Update html lang attribute
  document.documentElement.lang = language;
}

/**
 * Helper function to update or create a meta tag
 */
function updateMetaTag(attribute: string, key: string, content: string): void {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Update canonical link
 */
function updateCanonicalLink(url: string): void {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = url;
}

/**
 * Update JSON-LD structured data dynamically
 */
export function updateStructuredData(language: string): void {
  const config = seoTranslations[language] || seoTranslations.ko;

  // Update WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': config.title,
    'description': config.description,
    'url': `https://dpa.network?lang=${language}`,
    'inLanguage': language,
    'isPartOf': {
      '@type': 'WebSite',
      'url': 'https://dpa.network'
    },
    'about': {
      '@type': 'Thing',
      'name': 'Decentralized Privacy and AI Rights Protection'
    },
    'keywords': config.keywords.join(', ')
  };

  // Find or create script tag for WebPage schema
  let scriptTag = document.querySelector('script[type="application/ld+json"][data-schema="webpage"]');

  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'application/ld+json');
    scriptTag.setAttribute('data-schema', 'webpage');
    document.head.appendChild(scriptTag);
  }

  scriptTag.textContent = JSON.stringify(webPageSchema, null, 2);
}

/**
 * Get SEO config for a specific language
 */
export function getSEOConfig(language: string): SEOConfig {
  return seoTranslations[language] || seoTranslations.ko;
}

/**
 * Initialize SEO on app load
 */
export function initializeSEO(language: string): void {
  updateMetaTags(language);
  updateStructuredData(language);

  // Add performance monitoring
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
    });
  }
}

export default {
  updateMetaTags,
  updateStructuredData,
  getSEOConfig,
  initializeSEO,
};
