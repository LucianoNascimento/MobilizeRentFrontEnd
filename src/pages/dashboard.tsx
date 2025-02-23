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

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
        } else {
            fetch('http://localhost:80/api/users')
                .then(response => response.json())
                .then(data => {
                    if (data && data.total) {
                        setTotalUsers(data.total);
                    } else {
                        console.error('API data format is incorrect');
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar o total de usuários:", error);
                });
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
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
