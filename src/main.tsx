import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './context/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgetProvider> {/* Provider es donde vienen los datos - Envolvemos la app en el provider */}
      <App />
    </BudgetProvider>
  </StrictMode>,
)
