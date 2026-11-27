import '../../styles/Aside.css'
import { Link, useLocation } from 'wouter'
import { FiGrid, FiMail } from 'react-icons/fi'
import { BsCarFront } from 'react-icons/bs'
import { PiPersonArmsSpread } from 'react-icons/pi'

const enlaces = [
  { href: '/', texto: 'Panel de Admin', Icono: FiGrid, exacto: true },
  { href: '/admin/vehiculos', texto: 'Vehiculos', Icono: BsCarFront },
  { href: '/admin/usuarios', texto: 'Usuarios', Icono: PiPersonArmsSpread },
  { href: '/admin/consultas', texto: 'Consultas', Icono: FiMail },
]

export default function Aside() {
  const [ubicacion] = useLocation()

  const estaActivo = (enlace) =>
    enlace.exacto ? ubicacion === enlace.href : ubicacion.startsWith(enlace.href)
  return (
    <aside className="admin-aside">
      <nav aria-label="Administración">
        <ul>
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <Link
                href={enlace.href}
                className="admin-aside__enlace"
                title={enlace.texto}
                aria-label={enlace.texto}
                aria-current={estaActivo(enlace) ? 'page' : undefined}
              >
                <enlace.Icono size={22} />
                <span className="admin-aside__texto">{enlace.texto}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}