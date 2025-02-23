import React from 'react';
import { useRouter } from "next/router";

interface UsuarioModalProps {
    usuario: any;
    closeModal: () => void;
}

const UsuarioModal: React.FC<UsuarioModalProps> = ({ usuario, closeModal }) => {
    const router = useRouter();

    function handleEditClick() {
        router.push(`/user/${usuario.id}`);
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box relative">
                <button
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                    onClick={closeModal}
                >
                    ✕
                </button>
                <h1 className="text-3xl text-center">Detalhes do Usuário</h1>
                <hr/>
                <h3 className="font-bold text-lg mt-5">Nome: {usuario.name}</h3>
                <p className="py-4">Email: {usuario.email}</p>
                <div className="modal-action flex justify-between">
                    <button className="btn btn-primary" onClick={handleEditClick}>Editar Usuário</button>
                    <button className="btn" onClick={closeModal}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default UsuarioModal;
