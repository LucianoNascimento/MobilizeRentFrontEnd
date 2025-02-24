import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Russo_One } from "next/font/google";

const russo = Russo_One({
    subsets: ['latin'],
    weight: "400",
});

interface NavBarProps {
    name: string
}

const NavBar: React.FC<NavBarProps> = ({ name }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    return (
        <header className="navbar bg-[#6368F5] p-2 w-full">
            <nav className="navbar-start">
                <img src="/logo.png" alt="logo" style={{ height: '6.25rem' }} className="m1 mr-6" />
                <h1 className={`text-4xl font-bold whitespace-nowrap ${russo.className}`}>Sistema de Aluguel de Veículos</h1>
            </nav>
            <nav className="navbar-end">
                {token === null ? null : (
                    token ? (
                        <div className="flex items-center">
                            <span className='text-md mr-2'>Seja Bem Vindo(a), {name} </span>
                            <div className="avatar">
                                <div className="w-24 rounded">
                                    {/*<img src="/logo.png" alt="logo" style={{ height: '6.25rem' }} className="m1 mr-6" />*/}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" legacyBehavior>
                            <a className="text-white px-12 py-3 mr-3 rounded w-100">
                                Entrar
                            </a>
                        </Link>
                    )
                )}
            </nav>
        </header>
    );
};

export default NavBar;
