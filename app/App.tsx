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
import { Routes, Route } from 'react-router-dom';
import MainLayout from './ui/components/Layout/MainLayout';
import {LoginPage} from './ui/components/auth/LoginPage';
import {RegisterPage} from './ui/components/auth/RegisterPage';
import WorkerLandingPage from './pages/Worker/WorkerLandingPage';
import Map from './ui/components/Map';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from './ui/containers/store-provider';
import { AuthProvider } from './ui/containers/auth-provider';
import AddVehiclePage from './pages/Worker/AddVehiclePage';
import ScreenShare from './ui/components/screen-share/ScreenShare';
import AdminDashboard from './pages/Admin/AdminDashboard';
import QRScanner from './ui/components/QRScanner';
import MyGuests from './pages/Worker/MyGuests';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Main layout with dynamic titles */}
            <Route element={<MainLayout />}>
              <Route 
                path="/" 
                element={<Map />} 
                handle={{ title: 'Parking Map Overview' }}
              />
              <Route 
                path="worker" 
                handle={{ title: 'Worker Dashboard' }}
              >
                <Route 
                  index 
                  element={<WorkerLandingPage />} 
                  handle={{ title: 'My Vehicles' }}
                />
                <Route 
                  path="add-vehicle" 
                  element={<AddVehiclePage />} 
                  handle={{ title: 'Add New Vehicle' }}
                />
                <Route 
                  path="guests" 
                  element={<MyGuests />} 
                  handle={{ title: 'My Guests' }}
                />
              </Route>
              <Route path='/admin'>
                <Route 
                  index 
                  element={<AdminDashboard />} 
                  handle={{ title: 'Administration Panel' }}
                />
                <Route 
                  path='/admin/qr' 
                  element={<QRScanner />} 
                  handle={{ title: 'QR Scanner' }}
                />
                <Route 
                  path='/admin/screen' 
                  element={<ScreenShare />} 
                  handle={{ title: 'Administration Panel' }}
                />
              </Route>
              <Route 
                path="admin/*" 
                element={<div>Admin Dashboard</div>} 
                handle={{ title: 'Administration Panel' }}
              />
              <Route 
                path="guest/*" 
                element={<div>Guest Dashboard</div>} 
                handle={{ title: 'Guest Access' }}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;