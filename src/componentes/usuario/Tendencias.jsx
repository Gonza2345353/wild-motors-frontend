import '../../styles/Tendencias.css'
import { Link } from 'wouter'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Tarjetas from '../UsuariosAdmin/Tarjetas'

const datos = [
  { id: 1, etiqueta: 'Consultas esta semana', valor: '1.240' },
  { id: 2, etiqueta: 'Marca más buscada', valor: 'Pagani' },
  { id: 3, etiqueta: 'Consultas por cuotas al 0%', valor: '68%' },
]

export default function Tendencias() {
  const [vehiculos, setVehiculos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/vehiculos')
      .then((respuesta) => {
        setVehiculos(respuesta.data.slice(0, 3))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <main className="tendencias">

      {/* ===== Portada ===== */}
      <section className="tend-portada">
        <h1>Tendencias del mercado</h1>
        <p>Lo que más buscan, consultan y eligen nuestros clientes esta semana.</p>
      </section>

      {/* ===== Los más buscados ===== */}
      <section className="tend-seccion">
        <h2>Los más buscados de la semana</h2>

        <div className="tend-lista">
          <Tarjetas autos={vehiculos} />
        </div>
      </section>

      {/* ===== Números de la semana ===== */}
      <section className="tend-datos">
        <ul>
          {datos.map((d) => (
            <li key={d.id}>
              <span className="tend-datos__etiqueta">{d.etiqueta}</span>
              <span className="tend-datos__valor">{d.valor}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== Cierre ===== */}
      <section className="tend-cierre">
        <h2>¿No encontraste lo que buscabas?</h2>
        <p>Escribinos y te ayudamos a encontrar el auto ideal para vos.</p>

        <div className="tend-cierre__botones">
          <Link href="/Consultas" className="tend-boton tend-boton--claro">
            Consultar
          </Link>
          <Link href="/Modelos" className="tend-boton tend-boton--contorno">
            Ver catálogo
          </Link>
        </div>
      </section>

    </main>
  )
}