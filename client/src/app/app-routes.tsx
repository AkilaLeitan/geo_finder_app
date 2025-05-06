import React, { JSX, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartUpPage from './pages/start-up-page';
import DashboardPage from './pages/dashboard-page';

const AppRoutes = (): JSX.Element => {

    useEffect(() => {
        const updateGeoLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        localStorage.setItem('geoLocation', JSON.stringify({ latitude, longitude }));
                    },
                    () => {
                        // Do nothing if permission is denied
                    }
                );
            }
        };

        updateGeoLocation();
    }, []); // Runs once on component mount

    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartUpPage />} />
                {/* Public Dashboard */}
                <Route path="/dashboard" element={<DashboardPage isAdmin={false} />} />

                {/* Admin Dashboard */}
                <Route path="/admin/dashboard" element={<DashboardPage isAdmin={true} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;