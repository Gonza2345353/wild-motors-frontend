import '../../styles/Panel.css'
import { Link } from 'wouter'
import { BsCarFrontFill  } from 'react-icons/bs'
import { PiPersonArmsSpread } from 'react-icons/pi'
import { FiEdit2 } from 'react-icons/fi'

// Datos de ejemplo: después van a salir del backend
const resumen = [
  { id: 'registrados', etiqueta: 'Vehículos Registrados', valor: '15', color: 'azul', Icono: BsCarFrontFill },
  { id: 'disponibles', etiqueta: 'Vehículos Disponibles', valor: '13', color: 'verde', Icono: BsCarFrontFill },
  { id: 'reservados', etiqueta: 'Vehículos Reservados', valor: '7', color: 'amarillo', Icono: BsCarFrontFill },
  { id: 'usuarios', etiqueta: 'Usuarios Registrados', valor: '37,000', color: 'violeta', Icono: PiPersonArmsSpread },
]

// imagen vacía = recuadro gris
const recientes = [
  { id: 1, nombre: 'Pagani Zonda', anio: 2017, precio: 'USD 10,000,000', estado: 'Disponible', imagen: '/img/pagani-zonda-760.png' },
  { id: 2, nombre: 'Lamborghini Temerario', anio: 2022, precio: 'USD 380,000', estado: 'Reservado', imagen: '' },
  { id: 3, nombre: 'Pagani Zonda', anio: 2017, precio: 'USD 10,000,000', estado: 'Disponible', imagen: '' },
]

export default function Panel() {
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
      <ul className="recientes">
        {recientes.map((v) => (
          <li key={v.id}>
            <Link href={`/admin/vehiculos/${v.id}/editar`} className="auto-card">
              <span className="auto-card__imagen">
                {v.imagen && <img src={v.imagen} alt="" />}
                <span className={`auto-card__estado auto-card__estado--${v.estado.toLowerCase()}`}>
                  {v.estado}
                </span>
              </span>

              <span className="auto-card__cuerpo">
                <span className="auto-card__nombre">{v.nombre}</span>
                <span className="auto-card__anio">Año {v.anio}</span>
                <span className="auto-card__pie">
                  <span className="auto-card__precio">{v.precio}</span>
                  <span className="auto-card__editar">
                    <FiEdit2 size={14} /> Editar
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}