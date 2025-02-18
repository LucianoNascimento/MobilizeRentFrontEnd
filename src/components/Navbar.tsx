// components/NavBar.tsx
import React from "react";
import Link from "next/link";
import {Russo_One} from "next/font/google";

const russo = Russo_One({
    subsets: ['latin'],
    weight: "400",
})

const NavBar: React.FC = () => {
    return (
        <header className="w-full bg-[#FA433B] shadow p-2 flex justify-between items-center">
            <div className="flex items-center">
                <img src="/logo.png" alt="logo" style={{height: '6.25rem'}} className="m1 mr-6"/>
                <h1 className={`text-4xl font-bold ${russo.className}`}>Sistema de Aluguel de Veículos</h1>
            </div>
            <nav>
                <Link href="/login" legacyBehavior>
                    <a className=" text-white px-12 py-3 mr-3 rounded w-100">
                        Entrar
                    </a>
                </Link>
            </nav>
        </header>
    );
};

export default NavBar;
