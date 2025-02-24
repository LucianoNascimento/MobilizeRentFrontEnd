import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const Reservas: React.FC = () => {
    const [reservas, setReservas] = useState([]);
    const [name, setName] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReservas = async (page: number) => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:80/api/reservations?page=${page}`);
                const data = await response.json();
                console.log('API response:', data);
                if (data && Array.isArray(data.data)) {
                    setReservas(data.data);
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

        fetchReservas(page);
    }, [page]);

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

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'cancelled':
                return 'bg-red-500 text-white';
            case 'confirmed':
                return 'bg-green-500 text-white';
            case 'pending':
                return 'bg-orange-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar name={name} />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Reservas</h1>

                <div className="overflow-x-auto">
                    <table className="table w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3">Cliente</th>
                            <th className="px-6 py-3">Veículo</th>
                            <th className="px-6 py-3">Tipo - Cor</th>
                            <th className="px-6 py-3">Preço</th>
                            <th className="px-6 py-3">Data de Início</th>
                            <th className="px-6 py-3">Data de Fim</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reservas.map((reserva, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-6 py-3">{reserva.user.name}</td>
                                <td className="px-6 py-3">{reserva.vehicle.vehicle_type}</td>
                                <td className="px-6 py-3">{reserva.vehicle.brand} - {reserva.vehicle.color} </td>
                                <td className="px-6 py-3">{reserva.price} </td>
                                <td className="px-6 py-3">{reserva.created_at}</td>
                                <td className="px-6 py-3">{reserva.updated_at}</td>
                                <td className={`px-6 py-3 ${getStatusClass(reserva.status)}`}>{reserva.status}</td>
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
        </div>
    );
}

export default Reservas;
