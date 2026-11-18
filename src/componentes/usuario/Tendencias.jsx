import '../../styles/Tendencias.css'
import { Link } from 'wouter'
import Tarjetas from '../UsuariosAdmin/Tarjetas'

// Datos de ejemplo: reemplazalos por los reales
const autos = [
  {
    id: 1,
    nombre: 'Lamborghini Temerario',
    specs: 'V12 - 760CV - TRACCION TRASERA',
    precio: 'USD 380,000',
    imagen: '/img/lamborghini-temerario.jpg',
  },
  {
    id: 2,
    nombre: 'Pagani Zonda 760',
    specs: 'V12 - 760CV - TRACCION TRASERA',
    precio: 'USD 10,000,000',
    imagen: '/img/pagani-zonda-760.png',
  },
  {
    id: 3,
    nombre: 'BMW Serie 4',
    specs: 'L6 - 374CV - TRACCION TRASERA',
    precio: 'USD 85,000',
    imagen: '/img/bmw-serie-4.png',
  },
]

const datos = [
  { id: 1, etiqueta: 'Consultas esta semana', valor: '1.240' },
  { id: 2, etiqueta: 'Marca más buscada', valor: 'Pagani' },
  { id: 3, etiqueta: 'Consultas por cuotas al 0%', valor: '68%' },
]

export default function Tendencias() {
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
          {autos.map((auto, i) => (
            <span className="tend-auto__puesto">{i + 1}</span>
          ))}
           <Tarjetas />
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
          <Link href="/Consultas" className="tend-boton tend-boton--claro">Consultar</Link>
          <Link href="/Modelos" className="tend-boton tend-boton--contorno">Ver catálogo</Link>
        </div>
      </section>
    </main>
  )
}