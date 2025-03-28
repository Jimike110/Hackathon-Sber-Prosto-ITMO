// src/pages/Worker/WorkerDashboard.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import WorkerLandingPage from './WorkerLandingPage';
import AddVehiclePage from './AddVehiclePage';

interface WorkerDashboardProps {}

const WorkerDashboard: React.FC<WorkerDashboardProps> & {
  AddVehiclePage: typeof AddVehiclePage;
} = () => {
  return <Outlet />;
};

// Attach AddVehiclePage as a property so it can be used in the route definition if needed.
WorkerDashboard.AddVehiclePage = AddVehiclePage;

export default WorkerDashboard;
