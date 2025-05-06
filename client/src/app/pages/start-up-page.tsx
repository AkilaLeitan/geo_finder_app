import React, { JSX, useState } from 'react';
import { Button } from '@mui/material';
import startUpImage from '../../assets/start.png';
import logoImage from '../../assets/logo.png';
import Toast from '../components/app-toast-component';
import '../styles/start-up.scss';
import { useNavigate } from 'react-router-dom';

const StartUpPage = (): JSX.Element => {
    const navigate = useNavigate();
    const [toast, setToast] = useState<{ type: 'danger' | 'warning' | 'info'; message: string } | null>(null);

    const handleGetGeoLocation = () => {
        if (!navigator.geolocation) {
            setToast({ type: 'danger', message: 'Geolocation is not supported by your browser.' });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                localStorage.setItem('geoLocation', JSON.stringify({ latitude, longitude }));
                navigate('/dashboard');
            },
            (error) => {
                setToast({ type: 'danger', message: 'Your current location is needed to proceed.' });
            }
        );
    };

    return (
        <div className="start-up-page">
            {/* Left Side - Image with Background */}
            <div className="start-up-left">
                <img src={startUpImage} alt="Login" className="start-up-image" />
            </div>

            {/* Right Side - Content */}
            <div className="start-up-right">
                <img src={logoImage} alt="Logo" className="start-up-logo" />
                <h1 className="start-up-title">GEO Finder</h1>
                <Button
                    variant="outlined"
                    color="primary"
                    className="start-up-button"
                    onClick={handleGetGeoLocation}
                >
                    Start
                </Button>
            </div>

            {/* Toast Message */}
            {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        </div>
    );
};

export default StartUpPage;