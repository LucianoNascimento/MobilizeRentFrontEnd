import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";

const Usuarios: React.FC = () => {

    const [usuarios, setUsuarios] = useState([])
    const [totalUsuarios, setTotalUsuarios] = useState(0)
    const [name, setName] = useState<string | null>(null)

    useEffect(() => {
        fetch('http://localhost:80/api/users')
            .then(response => response.json())
            .then(data => {
                console.log('dados recebidos', data)
                setUsuarios(data)
                setTotalUsuarios(data.length)
            }).catch(errors => {
            console.log('error', errors)
        })
    }, []);

    return (
        <div>
            <Navbar name={name}/>
            <h1 className="m-3 text-2xl font-bold">Total de Usuários:{totalUsuarios} </h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Usuarios