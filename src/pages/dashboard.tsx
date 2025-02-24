import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MetaHeader from "@/components/MetaHeader";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import NavbarLogado from "@/components/NavbarLogado";

const Dashboard: React.FC = () => {
    const router = useRouter();
    const user = "Luciano Nascimento";
    const [totalUsers, setTotalUsers] = useState<number | null>(null);
    const [totalVeiculos, setTotalVeiculos] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
        } else {
            const fetchData = async () => {
                // Função para verificar se a resposta é JSON válido
                const isJsonResponse = (response) => {
                    const contentType = response.headers.get('content-type');
                    return contentType && contentType.indexOf('application/json') !== -1;
                };

                // Função para buscar dados da API
                const fetchAPI = async (url, setData, storageKey) => {
                    try {
                        const response = await fetch(url);
                        if (!isJsonResponse(response)) {
                            throw new Error("A resposta não é JSON");
                        }
                        const data = await response.json();
                        if (data && data.total) {
                            setData(data.total);
                            localStorage.setItem(storageKey, data.total.toString());
                            localStorage.setItem(`${storageKey}Timestamp`, Date.now().toString());
                        } else {
                            console.error('Formato de dados da API está incorreto');
                        }
                    } catch (error) {
                        console.error(`Erro ao buscar ${storageKey}:`, error);
                    }
                };

                // Verificar e buscar total de usuários
                const cachedUsers = localStorage.getItem('totalUsers');
                const cachedUsersTimestamp = localStorage.getItem('totalUsersTimestamp');
                const usersAge = Date.now() - (cachedUsersTimestamp ? parseInt(cachedUsersTimestamp) : 0);
                const usersCacheValid = cachedUsers && usersAge < 3600000; // 1 hora

                if (usersCacheValid) {
                    setTotalUsers(parseInt(cachedUsers));
                } else {
                    await fetchAPI('http://localhost:80/api/users', setTotalUsers, 'totalUsers');
                }

                // Verificar e buscar total de veículos
                const cachedVeiculos = localStorage.getItem('totalVeiculos');
                const cachedVeiculosTimestamp = localStorage.getItem('totalVeiculosTimestamp');
                const veiculosAge = Date.now() - (cachedVeiculosTimestamp ? parseInt(cachedVeiculosTimestamp) : 0);
                const veiculosCacheValid = cachedVeiculos && veiculosAge < 3600000; // 1 hora

                if (veiculosCacheValid) {
                    setTotalVeiculos(parseInt(cachedVeiculos));
                } else {
                    await fetchAPI('http://localhost:80/api/vehicles', setTotalVeiculos, 'totalVeiculos');
                }
            };

            fetchData();
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-100">
            <MetaHeader />
            <NavBar name={user} />  {/* Passar o nome do usuário como prop */}
            <NavbarLogado user={user} />  {/* Passar o nome do usuário como prop */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="card w-72 bg-base-100 shadow-xl mt-4">
                    <div className="card-body">
                        <h2 className="card-title">Tot. de Usuários: {totalUsers}</h2>
                    </div>
                </div>
                <div className="card w-72 bg-base-100 shadow-xl mt-4">
                    <div className="card-body">
                        <h2 className="card-title">Tot. de Veículos: {totalVeiculos}</h2>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
