import React from 'react';
import { DpaLogo } from './DpaLogo';

interface PreloaderProps {
  loading: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ loading }) => {
  return (
    <div className={`preloader ${!loading ? 'hidden' : ''}`}>
      <div className="w-24 h-24">
        <DpaLogo className="w-full h-full text-black preloader-logo" />
      </div>
    </div>
  );
};