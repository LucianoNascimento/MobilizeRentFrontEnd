import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import VeiculoModal from "@/components/modalveiculo";
import NavbarLogado from "@/components/NavbarLogado"; // Importe o modal de veículos

const Veiculos: React.FC = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [name, setName] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedVeiculo, setSelectedVeiculo] = useState<any>(null);
    const [veiculoDetails, setVeiculoDetails] = useState<any>(null);

    useEffect(() => {
        const fetchVeiculos = async (page: number) => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:80/api/vehicles?page=${page}`);
                const data = await response.json();
                console.log('API response:', data);
                if (data && Array.isArray(data.data)) {
                    setVeiculos(data.data);
                    setTotalPages(Math.ceil((data.total || 0) / 10)); // Supondo 10 itens por página
                } else {
                    console.error('Formato de dados da API está incorreto');
                }
            } catch (errors) {
                console.log('error', errors);
            } finally {
                setLoading(false);
            }
        };

        fetchVeiculos(page);
    }, [page]);

    const fetchVeiculoDetails = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:80/api/images/${id}`);
            const data = await response.json();
            console.log('dados:', data)
            setVeiculoDetails(data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do veículo:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 5;

        let startPage = Math.max(1, page - Math.floor(maxPageNumbersToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

        if (endPage - startPage < maxPageNumbersToShow - 1) {
            startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`btn ${page === i ? 'btn-active' : ''}`}
                >
                    {i}
                </button>
            );
        }

        if (startPage > 1) {
            pageNumbers.unshift(<span key="startEllipsis">...</span>);
            pageNumbers.unshift(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`btn ${page === 1 ? 'btn-active' : ''}`}
                >
                    1
                </button>
            );
        }

        if (endPage < totalPages) {
            pageNumbers.push(<span key="endEllipsis">...</span>);
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`btn ${page === totalPages ? 'btn-active' : ''}`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    const handleVeiculoClick = async (veiculo: any) => {
        await fetchVeiculoDetails(veiculo.id);
        setSelectedVeiculo(veiculo);
    };

    const closeModal = () => {
        setSelectedVeiculo(null); // Fechar modal
        setVeiculoDetails(null); // Limpar detalhes do veículo
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar name={name} />
            <NavbarLogado/>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Veículos</h1>

                <div className="overflow-x-auto">
                    <table className="table w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3">Tipo</th>
                            <th className="px-6 py-3">Modelo</th>
                            <th className="px-6 py-3">Marca</th>
                            <th className="px-6 py-3">Cor</th>
                            <th className="px-6 py-3">Preço Diário</th>
                            <th className="px-6 py-3">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {veiculos.map((veiculo, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-6 py-3">{veiculo.vehicle_type}</td>
                                <td className="px-6 py-3">{veiculo.model}</td>
                                <td className="px-6 py-3">{veiculo.brand}</td>
                                <td className="px-6 py-3">{veiculo.color}</td>
                                <td className="px-6 py-3">{veiculo.daily_price}</td>
                                <td className="px-6 py-3">
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleVeiculoClick(veiculo)}
                                    >
                                        Exibir Detalhes
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {loading && (
                    <div className="flex justify-center my-4">
                        <div className="loading loading-spinner" style={{width:"100px",height:"100px"}}></div>
                    </div>
                )}

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        className="btn btn-primary"
                        disabled={page === 1 || loading}
                    >
                        Anterior
                    </button>
                    <div className="space-x-2">
                        {renderPageNumbers()}
                    </div>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        className="btn btn-primary"
                        disabled={page === totalPages || loading}
                    >
                        Próximo
                    </button>
                </div>
            </div>

            {selectedVeiculo && veiculoDetails && (
                <VeiculoModal
                    veiculoData={veiculoDetails}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

export default Veiculos;
