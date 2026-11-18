import '../../styles/Tarjetas.css'
import { FiArrowRight } from 'react-icons/fi'

// Datos de ejemplo para la página de inicio
const autos = [
  {
    id: 1,
    categoria: 'Autos Deportivos',
    nombre: 'Paggani Zonda 760',
    specs: 'V12 - 760CV - TRACCION TRASERA',
    precio: 'USD 10,000,000',
    imagen: '/img/pagani-zonda-760.png',
    alt: 'Pagani Zonda 760 gris',
  },
  {
    id: 2,
    categoria: 'Autos Deportivos',
    nombre: 'Paggani Zonda 760',
    specs: 'V12 - 760CV - TRACCION TRASERA',
    precio: 'USD 10,000,000',
    imagen: '/img/bmw-serie-4.png',
    alt: 'BMW Serie 4 gris',
  },
  {
    id: 3,
    categoria: 'Autos Deportivos',
    nombre: 'Paggani Zonda 760',
    specs: 'V12 - 760CV - TRACCION TRASERA',
    precio: 'USD 10,000,000',
    imagen: '/img/pagani-zonda-760.png',
    alt: 'Pagani Zonda 760 gris',
  },
]

// admin = true  → en vez de "Saber más" se muestran los botones "Editar" y "Eliminar"
// estado (opcional) → muestra "Disponible", "Reservado" o "Vendido" debajo del precio
export function Tarjeta({
  categoria,
  nombre,
  specs,
  precio,
  estado,
  imagen,
  alt = '',
  admin = false,
  onEditar,
  onEliminar,
}) {
  return (
    <article className="tarjeta">
      <div className="tarjeta__imagen">
        {imagen && <img src={imagen} alt={alt} />}
      </div>

      <div className="tarjeta__info">
        <p className="tarjeta__categoria">{categoria}</p>
        <h3 className="tarjeta__nombre">{nombre}</h3>
        <p className="tarjeta__specs">{specs}</p>
        <p className="tarjeta__precio">{precio}</p>

        {estado && (
          <p className={`tarjeta__estado tarjeta__estado--${estado.toLowerCase()}`}>{estado}</p>
        )}

        {admin ? (
          <div className="tarjeta__acciones">
            <button type="button" className="boton boton--azul" onClick={onEditar}>
              Editar
            </button>
            <button type="button" className="boton boton--rojo" onClick={onEliminar}>
              Eliminar
            </button>
          </div>
        ) : (
          <button type="button" className="boton boton--rojo">
            Saber más <FiArrowRight size={12} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </article>
  )
}

export default function Tarjetas() {
  return (
    <div className="tarjetas">
      {autos.map((auto) => (
        <Tarjeta key={auto.id} {...auto} />
      ))}
    </div>
  )
}