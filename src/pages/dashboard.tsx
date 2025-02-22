import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MetaHeader from "@/components/MetaHeader";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import NavbarLogado from "@/components/NavbarLogado";

const Dashboard: React.FC = () => {
    const router = useRouter();
    const user = "Luciano Nascimento"; // Você pode substituir isso pelo nome real do usuário

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-100">
            <MetaHeader />
            <NavBar />
            <NavbarLogado />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-4">Bem-vindo(a), {user}!</h1>
                    <p className="text-lg text-gray-700 mb-4">Aqui estão suas informações e atividades recentes:</p>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Item 1: Detalhes do item 1</li>
                        <li>Item 2: Detalhes do item 2</li>
                        <li>Item 3: Detalhes do item 3</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
