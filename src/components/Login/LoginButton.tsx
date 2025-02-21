import React from 'react';

const LoginButton: React.FC<{ handleSubmit:
        (event: React.FormEvent<HTMLFormElement>) => void }> = ({ handleSubmit }) => (
    <button type="submit" className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white
    font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-2" onClick={handleSubmit}>
        Login
    </button>
);

export default LoginButton;
