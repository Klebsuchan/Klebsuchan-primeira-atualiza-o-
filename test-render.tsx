import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.tsx';
import { HelmetProvider } from 'react-helmet-async';
try {
  const html = renderToString(<HelmetProvider><App /></HelmetProvider>);
  console.log('RENDER SUCCESS');
} catch (e) {
  console.error('RENDER ERROR:', e);
}
