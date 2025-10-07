import React from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children }) => {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.2 });

  // Clone children and pass isVisible prop
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // Assuming the child component can accept an isVisible prop
      return React.cloneElement(child as React.ReactElement<{ isVisible: boolean }>, { isVisible });
    }
    return child;
  });

  return (
    <section id={id} className="min-h-screen py-16 md:py-24 px-4 flex items-center justify-center">
      <div ref={ref} className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`font-orbitron text-3xl md:text-4xl font-bold text-black tracking-wider animate-fadeIn ${isVisible ? 'visible' : ''}`}>{subtitle}</h2>
          <p className={`text-lg text-gray-600 mt-2 animate-fadeIn ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '100ms' }}>{title}</p>
        </div>
        {childrenWithProps}
      </div>
    </section>
  );
};