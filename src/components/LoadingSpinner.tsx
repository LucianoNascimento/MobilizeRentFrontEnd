import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center my-4">
            <div className="loading loading-spinner" style={{ width: '100px', height: '100px' }}></div>
        </div>
    );
};

export default LoadingSpinner;
