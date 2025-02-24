import React, { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

const ContainerPage: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="container mx-auto p-4">
            {children}
        </div>
    );
};

export default ContainerPage;
