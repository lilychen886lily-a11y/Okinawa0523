/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { TopBar } from '@/components/TopBar';
import { BottomNav } from '@/components/BottomNav';
import { Dashboard } from '@/screens/Dashboard';
import { Itinerary } from '@/screens/Itinerary';
import { CarRental } from '@/screens/CarRental';
import { ParkingDetails } from '@/screens/ParkingDetails';
import { AirportInfo } from '@/screens/AirportInfo';
import { Accommodation } from '@/screens/Accommodation';
import { FlightOverview } from '@/screens/FlightOverview';
import { FlightDetails } from '@/screens/FlightDetails';
import { Budget } from '@/screens/Budget';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background relative selection:bg-primary/20">
        <TopBar />
        
        <main className="mx-auto max-w-5xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/car-rental" element={<CarRental />} />
            <Route path="/parking" element={<ParkingDetails />} />
            <Route path="/airport-info" element={<AirportInfo />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/flights" element={<FlightOverview />} />
            <Route path="/flights/:code" element={<FlightDetails />} />
            <Route path="/budget" element={<Budget />} />
            {/* Fallback */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </Router>
  );
}

