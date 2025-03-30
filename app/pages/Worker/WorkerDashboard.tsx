// app/pages/Worker/WorkerDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AddVehiclePage from './AddVehiclePage';

interface WorkerDashboardProps {}

interface Vehicle {
  key: string,
  manufacturer: string,
  model: string,
  plate: string,
  color: string,
  active: boolean
}


const WorkerDashboard: React.FC<WorkerDashboardProps> & {
  AddVehiclePage: typeof AddVehiclePage;
} = () => {
  const [cars, setCars] = useState<Vehicle[]>([]);

  useEffect(() => {
    const initialCars = [
      { key: '1', manufacturer: "Toyota", model: 'Toyota Camry', plate: 'ABC-123', color: 'Silver', active: true },
      { key: '2', manufacturer: "Honda", model: 'Honda Civic', plate: 'XYZ-789', color: 'Black', active: false },
      { key: '3', manufacturer: "Ford", model: 'Ford Focus', plate: 'DEF-456', color: 'White', active: false },
    ];
    setCars(initialCars);
  }, [])
  return <Outlet context={{ cars, setCars }}/>;
};

// Attach AddVehiclePage as a property so it can be used in the route definition if needed.
WorkerDashboard.AddVehiclePage = AddVehiclePage;

export default WorkerDashboard;
