// lib/api.ts
export interface Vehicle {
    vehicle_type: string;
    model: string;
    brand: string;
    color: string;
    daily_price: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface ImageProps {
    path: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    vehicle: Vehicle;
}

export const fetchImages = async (): Promise<ImageProps[]> => {
    try {
        const response = await fetch('http://localhost:80/api/images');
        if (!response.ok) {
            throw new Error('Erro ao buscar imagens: ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar imagens:', error);
        throw error;
    }
};
