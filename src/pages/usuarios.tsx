import React, {useState} from "react";
import Navbar from "@/components/Navbar";
import UsuarioModal from "@/components/modalusuario";
import NavbarLogado from "@/components/NavbarLogado";
import Pagination from "@/components/Pagination";
import UsuariosTable from "@/components/UsuariosTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import useUsuarios from "@/hooks/useUsuarios";
import ContainerPage from "@/components/Container";

const Usuarios: React.FC = () => {
    const [page, setPage] = useState(1);
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
    const {usuarios, totalPages, loading} = useUsuarios(page);

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Navbar name={""}/>
                <NavbarLogado/>
                <ContainerPage>
                    <h1 className="text-3xl font-bold mb-4">Usuários</h1>
                    <UsuariosTable
                        usuarios={usuarios}
                        onUsuarioClick={(usuario: Usuario) => setSelectedUsuario(usuario)} // Certificando de que o tipo está correto
                    />
                    {loading && <LoadingSpinner/>}
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} loading={loading}/>

                    {selectedUsuario && (
                        <UsuarioModal usuario={selectedUsuario} closeModal={() => setSelectedUsuario(null)}/>
                    )}
                </ContainerPage>
            </div>
        </>
    );
};

export default Usuarios;
