// import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import './App.css'
// import {StoreProvider} from "./ui/containers/store-provider";
// import {AuthProvider} from "@/app/ui/containers/auth-provider";
// import {Route, Routes} from 'react-router-dom';
// import {MainPage} from "@/app/ui/components/main-page";
// import {RegisterPage} from "@/app/ui/components/auth/RegisterPage";
// import {LoginPage} from "@/app/ui/components/auth/LoginPage";
// import ScreenShare from './ui/components/screen-share/ScreenShare';

// const queryClient = new QueryClient();

// export function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <StoreProvider>
//         <AuthProvider>
//           <Routes>
//             <Route path="/" element={<MainPage/>}/>
//             <Route path="/register" element={<RegisterPage/>}/>
//             <Route path="/login" element={<LoginPage/>}/>
//             <Route path='/screen' element={<ScreenShare/>}/>
//           </Routes>
//         </AuthProvider>
//       </StoreProvider>
//     </QueryClientProvider>
// )
// }

// export default App


// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './ui/components/Layout/MainLayout';
import Home from './pages/Home/Home';
import WorkerDashboard from './pages/Worker/WorkerDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import GuestDashboard from './pages/Guest/GuestDashboard';
import {LoginPage} from './ui/components/auth/LoginPage';
import {RegisterPage} from './ui/components/auth/RegisterPage';
import './App.css';
import WorkerLandingPage from './pages/Worker/WorkerLandingPage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public authentication routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Main layout wraps the app's primary content */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* Worker Dashboard as a parent route */}
        <Route path="worker" element={<WorkerDashboard />}>
          {/* Default worker landing page */}
          <Route index element={<WorkerLandingPage />} />
          {/* Nested route for adding a vehicle */}
          <Route path="add-vehicle" element={<WorkerDashboard.AddVehiclePage />} />
        </Route>
        <Route path="admin/*" element={<AdminDashboard />} />
        <Route path="guest/*" element={<GuestDashboard />} />
      </Route>

      {/* Fallback */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
};

export default App;
