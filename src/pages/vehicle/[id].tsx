import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Navbar from "@/components/Navbar";

interface Vehicle {
    vehicle_type: string;
    model: string;
    brand: string;
    color: string;
    daily_price: string;
    path?: string;
}

const EditVehicle: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [vehicleType, setVehicleType] = useState('');
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [dailyPrice, setDailyPrice] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [newImage, setNewImage] = useState<File | null>(null);
    const [newImageUrl, setNewImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVehicle = async (vehicleId: string) => {
            try {
                const response = await fetch(`http://localhost:80/api/images/${vehicleId}`);
                const text = await response.text();
                console.log('Response text:', text); // Log para ver o texto da resposta
                const data = JSON.parse(text);
                console.log('Parsed data:', data); // Log para ver os dados parseados
                setVehicle(data.vehicle);
                setVehicleType(data.vehicle.vehicle_type);
                setModel(data.vehicle.model);
                setBrand(data.vehicle.brand);
                setColor(data.vehicle.color);
                setDailyPrice(data.vehicle.daily_price);
                setImagePath(data.path); // Define o caminho da imagem
            } catch (error) {
                console.error('Error fetching vehicle:', error);
            }
        };

        if (id) {
            fetchVehicle(id as string);
        }
    }, [id]);

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:80/api/vehicle/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({vehicle_type: vehicleType, model, brand, color, daily_price: dailyPrice}),
            });

            if (response.ok) {
                if (newImage) {
                    const formData = new FormData();
                    formData.append('images[]', newImage);

                    const imageResponse = await fetch(`http://localhost:80/api/images/${id}`, {
                        method: 'PUT',
                        body: formData,
                    });

                    if (!imageResponse.ok) {
                        console.error('Error updating image:', imageResponse.statusText);
                    }
                }
                router.push('/veiculos'); // Redireciona de volta para a página de veículos
            } else {
                console.error('Error saving vehicle:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving vehicle:', error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewImage(file);
            const newImageUrl = URL.createObjectURL(file);
            setNewImageUrl(newImageUrl);
        }
    };

    if (!vehicle) {
        return <div className="flex justify-center items-center h-screen">
            <div className="loading loading-spinner loading-lg"></div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar name={vehicleType}/>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">Editar Veículo</h1>
                <div className="grid grid-cols-3 gap-4">
                    {/* Primeira Linha */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Tipo de Veículo</label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Modelo</label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Marca</label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>
                    {/* Segunda Linha */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Cor</label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Preço Diário</label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            value={dailyPrice}
                            onChange={(e) => setDailyPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        {imagePath && (
                            <div>
                                <label className="block text-gray-700">Imagem do Veículo</label>
                                <img src={newImageUrl || `http://localhost:80/storage/${imagePath}`}
                                     alt="Imagem do Veículo" className="w-64 h-auto my-4"/>
                            </div>
                        )}
                        <label className="block text-gray-700">Alterar Imagem</label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                               onChange={handleImageChange}/>
                    </div>
                </div>
                <div className="text-right mr-24">
                <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg col-span-3 mt-4"
                        onClick={handleSave}>Salvar
                </button>
                </div>
            </div>
        </div>

    );

};

export default EditVehicle;
