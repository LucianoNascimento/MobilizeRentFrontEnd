import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Tooltip from "@/components/Tooltip"; // Correção

interface LoginFormProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (data: any) => void;
    handleGoogleLogin: () => void;
    register: any;
    errors: any;
    clearErrors: any;
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyForm = () => {
    const { register, handleSubmit, formState: { errors }, setFocus, clearErrors } = useForm();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const handleGoogleLogin = () => {
        // Implementar funcionalidade de login com Google
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errors.email) {
            clearErrors("email");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit(onSubmit)}
                handleGoogleLogin={handleGoogleLogin}
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
            />
        </div>
    );
};

const LoginForm: React.FC<LoginFormProps> = ({
                                                 email,
                                                 password,
                                                 handleSubmit,
                                                 handleGoogleLogin,
                                                 register,
                                                 errors,
                                                 handleEmailChange,
                                                 handlePasswordChange
                                             }) => (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                Digite seu e-mail:
                <Tooltip text="Campo obrigatório">
                    <FontAwesomeIcon icon={faExclamationCircle} className="ml-1 text-red-500" />
                </Tooltip>
            </label>
            <Input
                type="text"
                id="email"
                {...register('email', { required: 'e-mail obrigatório' })}
                placeholder="email@email.com"
                value={email}
                onChange={handleEmailChange}
                className={`border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} rounded px-2 py-1 mt-1`}
            />
            {errors.email && <span className="text-red-500 text-sm mt-0.5">{errors.email.message}</span>}
        </div>
        <div className="mb-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
                Digite sua senha:
                <Tooltip text="Campo obrigatório">
                    <FontAwesomeIcon icon={faExclamationCircle} className="ml-1 text-red-500" />
                </Tooltip>
            </label>
            <Input
                type="password"
                id="password"
                {...register('password', { required: 'Senha obrigatória' })}
                placeholder="********"
                value={password}
                onChange={handlePasswordChange}
                className={`border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} rounded px-2 py-1 mt-1`}
            />
            {errors.password && <span className="text-red-500 text-sm mt-0.5">{errors.password.message}</span>}
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
);

export default MyForm;
