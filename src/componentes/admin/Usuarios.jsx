import axios from 'axios'
import '../../styles/usuarios.css'
import { FiSearch } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([])
    const [busqueda, setBusqueda] = useState('')

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }

                const respuesta = await axios.get('http://localhost:3000/api/usuarios', config)

                setUsuarios(respuesta.data.usuarios)

            } catch (error) {
                console.error('Error al obtener usuarios:', error)
            }
        }
        obtenerUsuarios()
    },[])

    // Filtrar usuarios por nombre o correo
    const usuariosVisibles = usuarios.filter((usuario) =>
        [usuario.nombre, usuario.correo].some((campo) =>
            String(campo ?? '').toLowerCase().includes(busqueda.toLowerCase())
        )
    )

    return (
        <section className="usuarios-panel">

            <h1 className="panel__titulo">Usuarios Registrados</h1>

            <div className="usuarios-panel__barra">
                <label className="usuarios-panel__buscador">
                    <FiSearch size={18} />
                    <input type="search" placeholder="Buscar..." aria-label="Buscar usuario" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
                </label>
                <p className="usuarios-panel__total">
                    Usuarios: <strong>{usuarios.length}</strong>
                </p>
            </div>

            <ul className="usuarios-panel__lista">
                {usuariosVisibles.map((usuario) => (

                    <li key={usuario.usuario_id} className="usuario-tarjeta">

                        <FaUserCircle size={64} />

                        <div className="usuario-tarjeta__datos">
                            <p className="usuario-tarjeta__nombre">
                                {usuario.nombre}
                            </p>

                            <p className="usuario-tarjeta__email">
                                {usuario.correo}
                            </p>
                        </div>

                        <button type="button" className={Number(usuario.acceso) === 0 ? 'usuario-tarjeta__boton usuario-tarjeta__boton--devolver' : 'usuario-tarjeta__boton'}>
                            {Number(usuario.acceso) === 0 ? 'Devolver Acceso' : 'Restringir acceso'}
                        </button>

                    </li>

                ))}

            </ul>

            {usuariosVisibles.length === 0 && (<p>No se encontraron usuarios.</p>)}
        </section>
    )
}
