import '../../styles/Panel.css'
import { BsCarFrontFill } from 'react-icons/bs'
import { PiPersonArmsSpread } from 'react-icons/pi'
import Tarjetas from '../UsuariosAdmin/Tarjetas'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Panel() {
  const [vehiculos, setVehiculos] = useState([])
  const [totales, setTotales] = useState({
    registrados: 0,
    disponibles: 0,
    reservados: 0,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {}

    axios
      .get('http://localhost:3000/api/vehiculos', config)
      .then((respuesta) => {
        const lista = respuesta.data || []

        setTotales({
          registrados: lista.length,
          disponibles: lista.filter(
            (v) => v.estado?.toLowerCase() === 'disponible'
          ).length,
          reservados: lista.filter(
            (v) => v.estado?.toLowerCase() === 'reservado'
          ).length,
        })

        // Muestra los últimos 3 registrados (del más nuevo al más viejo)
        setVehiculos(lista.slice(-3).reverse())
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const resumen = [
    {
      id: 'registrados',
      etiqueta: 'Vehículos Registrados',
      valor: totales.registrados,
      color: 'azul',
      Icono: BsCarFrontFill,
    },
    {
      id: 'disponibles',
      etiqueta: 'Vehículos Disponibles',
      valor: totales.disponibles,
      color: 'verde',
      Icono: BsCarFrontFill,
    },
    {
      id: 'reservados',
      etiqueta: 'Vehículos Reservados',
      valor: totales.reservados,
      color: 'amarillo',
      Icono: BsCarFrontFill,
    },
    {
      id: 'usuarios',
      etiqueta: 'Usuarios Registrados',
      valor: '37,000',
      color: 'violeta',
      Icono: PiPersonArmsSpread,
    },
  ]

  return (
    <section className="panel">
      <h1 className="panel__titulo">Panel de Administración</h1>

      <h2 className="panel__subtitulo">Resumen del Sistema</h2>
      <ul className="panel__resumen">
        {resumen.map((item) => (
          <li key={item.id} className={`resumen resumen--${item.color}`}>
            <p className="resumen__etiqueta">{item.etiqueta}</p>
            <div className="resumen__cuerpo">
              <item.Icono size={64} />
              <span className="resumen__valor">{item.valor}</span>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="panel__subtitulo panel__subtitulo--lista">
        Vehículos registrados recientemente
      </h2>

      <Tarjetas autos={vehiculos} admin={true} />
    </section>
  )
}