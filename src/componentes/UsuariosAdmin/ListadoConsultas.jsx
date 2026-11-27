import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import axios from 'axios'
import TarjetaCons from './Tarjetas_consultas'

export default function ListadoConsultas({ onEditar }) {
  const [consultas, setConsultas] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const admin = localStorage.getItem('rol') === 'admin'
  const config = { headers: { Authorization: localStorage.getItem('token') } }

  useEffect(() => {
    axios.get('http://localhost:3000/api/consultas', config)
      .then(r => setConsultas(r.data.consultas))
      .catch(error => console.error('Error al obtener consultas:', error))
  }, [])

  const texto = busqueda.trim().toLowerCase()
  const visibles = consultas.filter(c =>
    [c.nombre, c.correo_electronico, c.asunto, c.mensaje]
      .some(campo => String(campo ?? '').toLowerCase().includes(texto))
  )

  const lista = admin ? visibles : consultas

  const eliminarConsulta = (id) => {
    if (!window.confirm('¿Estás seguro de que querés eliminar esta consulta?')) return
    setConsultas(prev => prev.filter(c => c.consulta_id !== id))
  }

  return (
    <div className="consultas-listado">
      {admin && (
        <div className="consultas-admin__barra">
          <label className="consultas-admin__buscador">
            <span className="consultas-admin__oculto">Buscar consulta</span>
            <FiSearch size={16} />
            <input type="search" placeholder="Buscar..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
          </label>
          <p className="consultas-admin__total">Consultas: {consultas.length}</p>
        </div>
      )}

      <ul className="consultas-admin__lista">
        {lista.map(consulta => (
          <TarjetaCons key={consulta.consulta_id} consulta={consulta} admin={admin} onEditar={onEditar} onEliminar={eliminarConsulta} />
        ))}
      </ul>

      {lista.length === 0 && <p className="consultas-admin__vacio">No se encontraron consultas.</p>}
    </div>
  )
}