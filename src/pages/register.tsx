    import React, {useState} from 'react';
    import MetaHeader from '@/components/MetaHeader';
    import {useRouter} from 'next/router';

    const RegisterPage: React.FC = () => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [userType] = useState('client'); // Campo oculto user_type com valor padrão 'client'
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');

        const router = useRouter();

        const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = {name, email, password, user_type: userType};

            try {
                const response = await fetch('http://localhost:80/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error('Erro ao fazer o cadastro');
                }

                const result = await response.json();
                console.log(result);
                setSuccess('Cadastro realizado com sucesso!');
                setError('');
                router.push('/login');
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocorreu um erro desconhecido');
                }
                setSuccess('');
            }
        };

        const handleGoogleSignIn = () => {
            window.location.href = 'http://localhost:80/auth/google';
        };

        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <MetaHeader/>
                <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
                <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <input type="hidden" name="user_type" value={userType}/>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                    <button type="submit"
                            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400">
                        Cadastro
                    </button>
                </form>
                <button onClick={handleGoogleSignIn}
                        className="mt-4 w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-400">
                    Cadastrar com o Google
                </button>
            </div>
        );
    };
    export default RegisterPage;
