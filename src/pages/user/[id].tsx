import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar";

const EditUser: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUser = async (userId: string) => {
            try {
                const response = await fetch(`http://localhost:80/api/users/${userId}`);
                const data = await response.json();
                setUser(data);
                setName(data.name);
                setEmail(data.email);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (id) {
            fetchUser(id as string);
        }
    }, [id]);

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:80/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            if (response.ok) {
                router.push('/usuarios'); // Redireciona de volta para a página de usuários
            } else {
                console.error('Error saving user:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    if (!user) {
        return <div className="flex justify-center items-center h-screen">
            <div className="loading loading-spinner loading-lg"></div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar name={name}/>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Editar Usuário</h1>
                <div className="mb-4">
                    <label className="block text-gray-700">Nome</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleSave}>Salvar</button>
            </div>
        </div>
    );
};

export default EditUser;
