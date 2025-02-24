// src/hooks/useUsuarios.ts

import { useState, useEffect } from "react";

interface Usuario {
    id: number;
    name: string;
    email: string;
}

const useUsuarios = (page: number) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:80/api/users?page=${page}`);
                const { data, total } = await response.json();
                if (Array.isArray(data)) {
                    setUsuarios(data);
                    setTotalPages(Math.ceil(total / 10)); // Assuming 10 items per page
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, [page]);

    return { usuarios, totalPages, loading };
};

export default useUsuarios;
