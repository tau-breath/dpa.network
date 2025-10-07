
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const renderApp = () => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
};

// i18n이 이미 초기화되었으면 바로 렌더, 아니면 기다림
if (i18n.isInitialized) {
  renderApp();
} else {
  i18n.on('initialized', renderApp);
}
