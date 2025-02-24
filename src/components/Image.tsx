'use client';
import React from 'react';

interface Vehicle {
    vehicle_type: string;
    model: string;
    brand: string;
    color: string;
    daily_price: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface ImageProps {
    path: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    vehicle: Vehicle;
}

const Image: React.FC<{ image: ImageProps }> = ({ image }) => {
    const completePath = `storage/${image.path}`;
    console.log(`http://localhost:80/${completePath}`);
    return (
        <div className="p-4 border rounded-xl hover-in">
            <img src={`http://localhost:80/${completePath}`} alt={`${image.vehicle.brand} ${image.vehicle.model}`} className="w-full h-64 object-cover hover-zoom-in" />
            <div className="mt-2 text-xl text-center">
                <p><strong>Tipo:</strong> {image.vehicle.vehicle_type}</p>
                <p><strong>Modelo:</strong> {image.vehicle.model}</p>
                <p><strong>Marca:</strong> {image.vehicle.brand}</p>
                <p><strong>Cor:</strong> {image.vehicle.color}</p>
                <p>
                    <strong>Preço Diário:</strong>
                    <span>{image.vehicle.daily_price}</span>
                </p>
            </div>
        </div>
    );
};

export default Image;
