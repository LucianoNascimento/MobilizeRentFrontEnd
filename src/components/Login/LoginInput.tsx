// src/components/Input.tsx
import React from "react";

interface InputProps {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string; // Adicionado para permitir classes customizadas
}

const Input: React.FC<InputProps> = ({
     id,
     type,
     placeholder,
     value,
     onChange,
     className, // Adicionado para permitir classes customizadas
 }) => (
    <div>
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`} // Atualizado para usar className
        />
    </div>
);

export default Input;
