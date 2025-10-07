import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOnScreen } from '../hooks/useOnScreen';

const DigitalCoreVisual: React.FC = () => {
    const layer1Ref = useRef<SVGGElement>(null);
    const layer2Ref = useRef<SVGGElement>(null);
    const layer3Ref = useRef<SVGGElement>(null);

    useEffect(() => {
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            cancelAnimationFrame(animationFrameId);

            animationFrameId = requestAnimationFrame(() => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 2; // range from -1 to 1
                const y = (clientY / window.innerHeight - 0.5) * 2; // range from -1 to 1
                
                // Direct DOM manipulation for performance
                if (layer1Ref.current) {
                    layer1Ref.current.style.transform = `translateX(${x * 8}px) translateY(${y * 8}px)`;
                }
                if (layer2Ref.current) {
                    layer2Ref.current.style.transform = `translateX(${x * -12}px) translateY(${y * -12}px)`;
                }
                if (layer3Ref.current) {
                    layer3Ref.current.style.transform = `translateX(${x * 4}px) translateY(${y * 4}px)`;
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
      <div className="relative w-full h-full flex items-center justify-center scale-75 md:scale-100">
        <svg viewBox="0 0 400 400" className="w-[400px] h-[400px]">
          <defs>
            <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="coreGradient">
                <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                <stop offset="70%" stopColor="rgba(0,0,0,0.05)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </radialGradient>
          </defs>
          
          <g ref={layer1Ref} className="animate-slow-spin" style={{ transformOrigin: '200px 200px', transition: 'transform 0.5s ease-out' }}>
            <path d="M 50 200 A 150 150 0 0 1 350 200" stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="none" />
            <path d="M 60 200 A 140 140 0 0 1 340 200" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" fill="none" strokeDasharray="5 5" className="animate-flicker" style={{animationDelay: '1.5s'}} />
          </g>
          
          <g ref={layer2Ref} className="animate-slower-spin" style={{ transformOrigin: '200px 200px', animationDirection: 'reverse', transition: 'transform 0.5s ease-out' }}>
             <circle cx="200" cy="200" r="120" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" fill="none"/>
             <g className="animate-jitter" style={{ animationDelay: '-2s' }}>
                <path d="M 100 150 L 150 100 L 250 100 L 300 150 L 300 250 L 250 300 L 150 300 L 100 250 Z" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" fill="url(#coreGradient)" />
             </g>
          </g>

          <g ref={layer3Ref} className="animate-slow-spin" style={{ transformOrigin: '200px 200px', animationDelay: '-5s', transition: 'transform 0.5s ease-out' }}>
              <circle cx="200" cy="200" r="30" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" fill="none" />
              <circle cx="200" cy="200" r="10" fill="rgba(0,0,0,1)" filter="url(#coreGlow)" className="animate-pulse" />
          </g>
        </svg>
      </div>
    );
};


export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.2 });

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const purposeSection = document.querySelector('#purpose');
    if (purposeSection) {
      purposeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center text-center relative px-4 pt-20">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-50">
        <DigitalCoreVisual />
      </div>
      <div className="relative z-10">
        <h1 className={`font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest text-black animate-fadeIn ${isVisible ? 'visible' : ''}`}>
          {t('hero.title')}
        </h1>
        <p className={`text-sm md:text-base text-gray-600 mt-2 tracking-widest font-orbitron animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '100ms' }}>
          {t('hero.subtitle')}
        </p>
        <p className={`mt-8 max-w-md md:max-w-3xl mx-auto text-lg md:text-2xl text-gray-700 leading-relaxed animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '200ms' }}>
          "{t('hero.tagline')}"
        </p>
        <p className={`mt-2 text-base text-gray-500 max-w-md md:max-w-3xl mx-auto animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '300ms' }}>
          "{t('hero.taglineEn')}"
        </p>
      </div>
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
         <a href="#purpose" onClick={handleScrollDown} className="transition-transform transform hover:scale-125 inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/50"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
         </a>
      </div>
    </section>
  );
};
