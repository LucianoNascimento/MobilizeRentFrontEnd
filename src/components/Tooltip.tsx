import React from 'react';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => (
    <div className="relative flex items-center group">
        {children}
        <div className="absolute left-full ml-2 w-32 p-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {text}
        </div>
    </div>
);

export default Tooltip;
