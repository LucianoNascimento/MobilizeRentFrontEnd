// components/UsuariosTable.tsx
import React from "react";

interface Usuario {
    id: number;
    name: string;
    email: string;
}

interface UsuariosTableProps {
    usuarios: Usuario[];
    onUsuarioClick: (usuario: Usuario) => void;
}

const UsuariosTable: React.FC<UsuariosTableProps> = ({ usuarios, onUsuarioClick }) => {
    return (
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
                {usuarios.map(({ id, name, email }, index) => (
                    <tr key={index} className="border-t">
                        <td className="px-6 py-3">{name}</td>
                        <td className="px-6 py-3">{email}</td>
                        <td className="px-6 py-3">
                            <button className="btn btn-warning btn-sm" onClick={() => onUsuarioClick({ id, name, email })}>
                                Detalhes
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsuariosTable;
