import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import UsuarioModal from "@/components/modalusuario";

const Usuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [name, setName] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState<any>(null);

    useEffect(() => {
        const fetchUsuarios = async (page: number) => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:80/api/users?page=${page}`);
                const data = await response.json();
                console.log('API response:', data);
                if (data && Array.isArray(data.data)) {
                    setUsuarios(data.data);
                    setTotalUsuarios(data.total || 0);
                    setTotalPages(Math.ceil((data.total || 0) / 10)); // Assuming 10 items per page
                } else {
                    console.error('API data format is incorrect');
                }
            } catch (errors) {
                console.log('error', errors);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios(page);
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

    const handleUsuarioClick = (usuario: any) => {
        setSelectedUsuario(usuario);
    };

    const closeModal = () => {
        setSelectedUsuario(null); // Fechar modal
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar name={name}/>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Usuários</h1>

                <div className="overflow-x-auto">
                    <table className="table w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3">Nome</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-6 py-3">{usuario.name}</td>
                                <td className="px-6 py-3">{usuario.email}</td>
                                <td className="px-6 py-3">
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleUsuarioClick(usuario)}
                                    >
                                        Detalhes
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

            {selectedUsuario && (
                <UsuarioModal
                    usuario={selectedUsuario}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

export default Usuarios;
