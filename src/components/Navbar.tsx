import React from "react";
import Link from "next/link";
import {Russo_One} from "next/font/google";

const russo = Russo_One({
    subsets: ['latin'],
    weight: "400",
})

const NavBar: React.FC = () => {
    return (
        <header className="navbar bg-[#6368F5] p-2 w-full">
            <nav className="navbar-start">
                <img src="/logo.png" alt="logo" style={{height: '6.25rem'}} className="m1 mr-6"/>
                <h1 className={`text-4xl font-bold ${russo.className}`}>Sistema de Aluguel de Veículos</h1>
            </nav>
            <nav className="navbar-end">
                <Link href="/login" legacyBehavior>
                    <a className="text-white px-12 py-3 mr-3 rounded w-100">
                        Entrar
                    </a>
                </Link>
            </nav>
        </header>
    );
};

export default NavBar;
