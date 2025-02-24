import React from 'react';
import { useRouter } from "next/router";

interface VeiculoModalProps {
    veiculoData: any;
    closeModal: () => void;
}

const VeiculoModal: React.FC<VeiculoModalProps> = ({ veiculoData, closeModal }) => {
    const router = useRouter();
    const veiculo = veiculoData.vehicle;

    function handleEditClick() {
        router.push(`/vehicle/${veiculoData.id}`);
    }


    const completePath = `storage/${veiculoData.path}`;
    return (
        <div className="modal modal-open">
            <div className="modal-box relative">
                <button
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                    onClick={closeModal}
                >
                    ✕
                </button>
                <h1 className="text-3xl text-center">Detalhes do Veículo</h1>
                <hr/>
                <div className="flex justify-center my-4">
                <img src={`http://localhost:80/storage/${veiculoData.path}`} alt="Imagem do Veículo" className="w-64 h-auto my-4" />
                </div>
                <h3 className="font-bold text-lg mt-5">Tipo: {veiculo.vehicle_type}</h3>
                <p className="py-4">Modelo: {veiculo.model}</p>
                <p className="py-4">Marca: {veiculo.brand}</p>
                <p className="py-4">Cor: {veiculo.color}</p>
                <p className="py-4">Preço Diário: {veiculo.daily_price}</p>
                <div className="modal-action flex justify-between">
                    <button className="btn btn-primary" onClick={handleEditClick}>Editar Veículo</button>
                    <button className="btn" onClick={closeModal}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default VeiculoModal;
