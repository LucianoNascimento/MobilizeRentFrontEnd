import React from "react";

const LoginGoogleButton: React.FC<{ handleGoogleLogin: () => void }> = ({handleGoogleLogin}) => (
    <button
        type="button"
        onClick={handleGoogleLogin}
        className="  w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-bold
         rounded shadow-md focus:outline-none focus:ring-2  focus:ring-red-400">
        Login com Google
    </button>
);

export default LoginGoogleButton;
