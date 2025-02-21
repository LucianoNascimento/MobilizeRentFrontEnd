import React from 'react';

const LoginInput: React.FC<{
    label: string;
    type: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ label, type, value, setValue }) => (
    <div>
        <label htmlFor={label} className="block text-sm font-medium text-gray-700">{label}:</label>
        <input
            type={type}
            id={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
);

export default LoginInput;
