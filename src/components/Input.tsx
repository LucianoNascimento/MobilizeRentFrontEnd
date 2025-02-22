import React from "react";

interface InputProps {
    id: string;
    type: string;
    label?: string; // Torne a label opcional
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string; // Adicione className como opcional
}

const Input: React.FC<InputProps> = ({
                                         id,
                                         type,
                                         label,
                                         placeholder,
                                         value,
                                         onChange,
                                         className
                                     }) => (
    <div>
        {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>} {/* Exiba a label, se fornecida */}
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`} // Use a className personalizada
        />
    </div>
);

export default Input;
