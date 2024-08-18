import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./sass/main.scss"
import { ThemeProvider } from './Context';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
