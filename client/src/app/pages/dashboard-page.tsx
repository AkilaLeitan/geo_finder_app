import { JSX, useEffect, useState } from "react";
import logoImage from '../../assets/logo.png';
import searchIcon from '../../assets/search.png';
import '../styles/dashboard.scss';
import AppLocationComponent from "../components/app-location-component";
import { GetLocationsRequest } from "../../controllers/dashboard-model";
import { useGetLocationsQuery } from "../../queries/dashboard-queries";
import PageLoadingIndicator from "../components/app-page-loading-indicator";

interface DashboardPageProps {
    isAdmin: boolean;
}

const DashboardPage = ({ isAdmin }: DashboardPageProps): JSX.Element => {
    const geoLocation = JSON.parse(localStorage.getItem('geoLocation') || '{}');
    const [serchText, setSerchText] = useState<string>('');
    const DEFAULT_LIMIT = 10;

    const getLocationsModel = (): GetLocationsRequest => {
        return {
            latitude: geoLocation.latitude,
            longitude: geoLocation.longitude,
            searchText: serchText,
            limit: DEFAULT_LIMIT
        };
    }

    const { data, isLoading } = useGetLocationsQuery(getLocationsModel());

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            {/* Header */}
            <header className="header">
                <div className="header-logo">
                    <img src={logoImage} alt="Logo" />
                    <h1 className="header-title">GEO Finder</h1>
                </div>
                {isAdmin && (
                    <button className="create-location-btn hidden md:block">
                        Create location
                    </button>
                )}
            </header>

            {/* Sub-header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <h2 className="text-lg font-semibold text-primary">Locations</h2>
                {isAdmin && (
                    <button className="create-location-btn md:hidden">
                        Create location
                    </button>
                )}
            </div>

            {/* Search Box */}
            <div className="search-box">
                <input
                    name="search"
                    type="text"
                    placeholder="Search location"
                    className="search-input"
                    onChange={(e) => setSerchText(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="Search"
                    className="search-icon"
                />
            </div>

            {/* Location List */}
            <PageLoadingIndicator isLoading={isLoading}>
                {data && data.data && data.data.locations && data.data.locations.length > 0 ? (
                    <div className="location-list">
                        {data.data.locations.map(loc => (
                            <AppLocationComponent
                                key={loc.id}
                                title={loc.name}
                                description={loc.description}
                                distance={"0lm"}
                                isAdmin={isAdmin} // Pass isAdmin to AppLocationComponent
                            />
                        ))}
                    </div>) : (
                    <div className="no-locations-message">
                        No locations found.
                    </div>
                )}
                {/* Load More Button */}

                {/* Show All Text */}
                <div className="show-all-container">
                    <span className="show-all-text">Show All</span>
                </div>
            </PageLoadingIndicator>
        </div>
    );
};

export default DashboardPage;