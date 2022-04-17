declare global {
  interface Window {
    selectedAddress: string;
    ethereum: string;
  }
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
