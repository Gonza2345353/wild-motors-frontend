import Logo from '../../imagenes/complementarias/Logo.png'
import { useState } from 'react'
import { Link, useRoute } from 'wouter'
import { FaUserCircle } from 'react-icons/fa'
import { FiChevronDown, FiMapPin } from 'react-icons/fi'
import '../../styles/Header.css'

export default function Header({ admin = false }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [enInicio] = useRoute('/')

  const nombre = localStorage.getItem('nombre')
  const correo = localStorage.getItem('correo')

  function cerrarSesion() {
    localStorage.clear()
    window.location.href = 'http://localhost:5173'
  }

  return (
    <header className={!admin && enInicio ? 'header' : 'header header--solido'}>
      <div className="header__contenido">
        <Link href="/">
          <img src={Logo} alt="Wild Motors" style={{ width: '100px' }} />
        </Link>

        {!admin && (
          <nav className="nav">
            <Link href="/Modelos" className="nav__item">Modelos <FiChevronDown size={16} /></Link>
            <Link href="/Tendencias" className="nav__item">Tendencias</Link>
            <Link href="/Quienes_somos" className="nav__item">Sobre nosotros</Link>
            <Link href="/Consultas" className="nav__item">Consultas</Link>
          </nav>
        )}

        <div className="header__usuario">
          <button className="header__icono" onClick={() => setMenuAbierto(!menuAbierto)}>
            <FaUserCircle size={38} />
          </button>

          {menuAbierto && (
            <div className="menu-usuario">
              <FaUserCircle size={56} />

              <p className="menu-usuario__nombre">{nombre}</p>
              <p className="menu-usuario__correo">{correo}</p>
              <p className="menu-usuario__estado">Sesión activa</p>

              <button className="menu-usuario__enlace menu-usuario__enlace--salir" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>

        <button className="header__icono" aria-label="Ubicación">
          <FiMapPin size={38} strokeWidth={1.4} />
        </button>
      </div>
    </header>
  )
}
