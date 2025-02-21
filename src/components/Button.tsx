import React from "react";

interface ButtonProps {
    type: "button" | "submit"
    onClick?: () => void
    className?: string
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
   type,
   onClick,
   className,
   children
}) => (
    <button
        type={type}
        onClick={onClick}
        className={`w-full py-2 px-4 font-bold rounded shadow-md focus:outline-none ${className}`}
    >
        {children}
    </button>
)

export default Button