import '../../styles/Tarjetas.css'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'wouter'

export default function Tarjetas({
  autos = [],
  admin = false,
  onEditar,
  onEliminar,
  onSeleccionarAuto
}) {
  return (
    <div className="tarjetas">
      {autos.map((auto) => (
        <article className="tarjeta" key={auto.id}>
          <div className="tarjeta__imagen">
            {auto.imagen && (
              <img src={auto.imagen} alt={auto.nombre} />
            )}
          </div>

          <div className="tarjeta__info">
            <p className="tarjeta__categoria">{auto.tipo}</p>
            <h3 className="tarjeta__nombre">{auto.modelo}</h3>
            <p className="tarjeta__specs">
              {[
                auto.motor,
                auto.potencia_cv ? `${auto.potencia_cv}CV` : null,
                auto.traccion
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
            <p className="tarjeta__precio">{auto.precio}</p>

            {auto.estado && (
              <p className={`tarjeta__estado tarjeta__estado--${auto.estado.toLowerCase()}`}>
                {auto.estado}
              </p>
            )}

            {admin ? (
              <div className="tarjeta__acciones">
                <button
                  type="button"
                  className="boton boton--azul"
                  onClick={() => onEditar?.(auto)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="boton boton--rojo"
                  onClick={() => onEliminar?.(auto.vehiculo_id)}
                >
                  Eliminar
                </button>
              </div>
            ) : (
              <Link
                href={`/usuario/Vista_producto/${auto.vehiculo_id}`}
                className="boton boton--rojo"
                onClick={() => onSeleccionarAuto(auto)}
              >
                Saber más <FiArrowRight size={12} strokeWidth={2.5} />
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}