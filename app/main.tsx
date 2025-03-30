// app/main.tsx
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import '@/styles/reset.css'
import '@/styles/globals.css'
import App from "@/app/App";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
  </StrictMode>,
)
