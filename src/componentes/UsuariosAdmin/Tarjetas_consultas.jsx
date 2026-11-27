
import { FaUserCircle } from 'react-icons/fa'
import '../../styles/ConsultasAdmin.css'

const formatearFecha = (fecha) =>
  new Date(fecha).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

export default function TarjetaConsulta({
  consulta,
  admin = false,
  onEditar,
  onEliminar,
}) {
  return (
    <li className="consulta-card">
      <FaUserCircle className="consulta-card__avatar" size={52} />

      <div className="consulta-card__cuerpo">
        <div className="consulta-card__cabecera">
          <p className="consulta-card__nombre">{consulta.nombre}</p>

          <time className="consulta-card__fecha" dateTime={consulta.fecha_creacion}>
            {formatearFecha(consulta.fecha_creacion)}
          </time>
        </div>

        <p className="consulta-card__contacto">
          {consulta.correo_electronico} · {consulta.telefono}
        </p>

        <p className="consulta-card__asunto">{consulta.asunto}</p>
        <p className="consulta-card__mensaje">{consulta.mensaje}</p>
      </div>

      {!admin && (
        <div className="consulta-card__acciones">
          <button
            type="button"
            className="consulta-card__boton consulta-card__boton--editar"
            onClick={() => onEditar?.(consulta)}
          >
            Editar
          </button>

          <button
            type="button"
            className="consulta-card__boton consulta-card__boton--eliminar"
            onClick={() => onEliminar(consulta.consulta_id)}
          >
            Eliminar
          </button>
        </div>
      )}
    </li>
  )
}
