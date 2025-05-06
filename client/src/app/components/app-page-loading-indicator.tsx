import React from 'react';
import '../styles/page-loading-indicator.scss';
import loadingIcon from '../../assets/loading.png';

interface PageLoadingIndicatorProps {
    isLoading: boolean;
    children: React.ReactNode;
}

const PageLoadingIndicator: React.FC<PageLoadingIndicatorProps> = ({ isLoading, children }) => {
    return (
        <div className="page-loading-indicator">
            {isLoading ? (
                <div className="loading-overlay">
                    <img
                        src={loadingIcon}
                        alt="loading"
                        className="loading-icon"
                    />
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default PageLoadingIndicator;