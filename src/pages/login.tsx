import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import Tooltip from "@/components/Tooltip";

const MyForm = () => {
    const { control, handleSubmit, formState: { errors }, setFocus, clearErrors } = useForm();
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (router.query.logged_in === 'true') {
            router.push('/dashboard');
        }
    }, [router.query]);

    const onSubmit = async (data: any) => {
        try {
            const response = await fetch('http://localhost:80/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log('Resposta do servidor', result);

            if (response.ok) {
                // Armazena o token no local storage
                localStorage.setItem('token', result.token);
                await router.push('/dashboard'); // Redireciona para o dashboard
            } else {
                console.error('Erro no login:', result);
            }
        } catch (errors) {
            console.log('deu erro', errors);
        }
    };

    const handleGoogleLogin = async () => {
        // Redireciona para a rota de autenticação do Google
        window.location.href = 'http://localhost:80/auth/google';
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            clearErrors("password");
        }
    };

    useEffect(() => {
        if (errors.email) {
            setFocus("email");
        } else if (errors.password) {
            setFocus("password");
        }
    }, [errors, setFocus]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-80">
                <div className="mb-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                        Digite seu e-mail:
                        <Tooltip text="Campo obrigatório">
                            <FontAwesomeIcon icon={faExclamationCircle} className="ml-1 text-red-500" />
                        </Tooltip>
                    </label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'e-mail obrigatório' }}
                        render={({ field }) => (
                            <Input
                                type="text"
                                id="email"
                                placeholder="email@email.com"
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                                className={`border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} rounded px-2 py-1 mt-1`}
                            />
                        )}
                    />
                    {errors.email && <span className="text-red-500 text-sm mt-0.5">{errors.email.message?.toString() ?? ''}</span>}
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
                        Digite sua senha:
                        <Tooltip text="Campo obrigatório">
                            <FontAwesomeIcon icon={faExclamationCircle} className="ml-1 text-red-500" />
                        </Tooltip>
                    </label>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Senha obrigatória' }}
                        render={({ field }) => (
                            <Input
                                type="password"
                                id="password"
                                placeholder="********"
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    handlePasswordChange(e);
                                }}
                                className={`border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} rounded px-2 py-1 mt-1`}
                            />
                        )}
                    />
                    {errors.password && <span className="text-red-500 text-sm mt-0.5">{errors.password.message?.toString() ?? ''}</span>}
                </div>
                <Button type="submit" className="mt-4 w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Entrar
                </Button>
                <div className="text-center text-gray-500 my-2">ou</div>
                <Button type="button" onClick={handleGoogleLogin} className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-400">
                    <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                    Entrar com Google
                </Button>
                <div className="mt-4 text-center text-xl">
                    <Link href="/register" legacyBehavior>
                        <a className="text-indigo-500 hover:text-indigo-700 font-bold">Fazer Cadastro</a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default MyForm;
