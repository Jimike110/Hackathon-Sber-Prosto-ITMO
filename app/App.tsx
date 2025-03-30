// ./app/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './ui/components/Layout/MainLayout';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
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
import { AddGuest } from './pages/Worker/AddGuest';
import ProtectedRoute from './ui/components/ProtectedRoute';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Unauthorized fallback */}
            <Route path="/not-found" element={<div>Not found</div>} />

            {/* Protected Routes under MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Map />} handle={{ title: 'Parking Map Overview' }} />

              {/* Worker Routes */}
              <Route element={<ProtectedRoute allowedRoles={["worker"]} />}>
                <Route path="worker">
                  <Route index element={<WorkerLandingPage />} handle={{ title: 'My Vehicles' }} />
                  <Route path="add-vehicle" element={<AddVehiclePage />} handle={{ title: 'Add New Vehicle' }} />
                  <Route path="guests">
                    <Route index element={<MyGuests />} handle={{ title: 'My Guests' }} />
                    <Route path="add" element={<AddGuest />} handle={{ title: 'Add Guest' }} />
                  </Route>
                </Route>
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="admin">
                  <Route index element={<AdminDashboard />} handle={{ title: 'Administration Panel' }} />
                  <Route path="qr" element={<QRScanner />} handle={{ title: 'QR Scanner' }} />
                  <Route path="screen" element={<ScreenShare />} handle={{ title: 'Screen Sharing' }} />
                </Route>
              </Route>

              {/* Guest Routes */}
              <Route element={<ProtectedRoute allowedRoles={["guest"]} />}>
                <Route path="guest" element={<div>Guest Dashboard</div>} handle={{ title: 'Guest Access' }} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </AuthProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
