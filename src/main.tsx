import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import { ReactionWrapper } from './components';
import { ReactionProvider } from './providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactionProvider>
      <ReactionWrapper>
        <App />
      </ReactionWrapper>
    </ReactionProvider>
  </React.StrictMode>
);
