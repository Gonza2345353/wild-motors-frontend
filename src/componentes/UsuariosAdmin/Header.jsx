import Logo from '../../imagenes/complementarias/Logo.png'
import { useState } from 'react'
import { Link, useRoute } from 'wouter'
import { FaUserCircle } from 'react-icons/fa'
import { FiChevronDown, FiMapPin } from 'react-icons/fi'
import '../../styles/Header.css'

const usuario = {
  nombre: 'Gonzalo German',
  correo: 'gonzalo.german@gmail.com',
}

// admin = true  → solo logo e íconos (sin el menú de navegación)
export default function Header({ admin = false }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  // Solo en el inicio el header se superpone al hero
  const [enInicio] = useRoute('/')

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <header className={!admin && enInicio ? 'header' : 'header header--solido'}>
      <div className="header__contenido">
        <Link href="/" >
          <img src={Logo} alt="Wild Motors" style={{ width: '100px' }} />
        </Link>

        {!admin && (
          <nav className="nav" aria-label="Principal">
            <Link href="/Modelos" className="nav__item">
              Modelos <FiChevronDown size={16} />
            </Link>
            <Link href="/Tendencias" className="nav__item">Tendencias</Link>
            <Link href="/Quienes_somos" className="nav__item">Sobre nosotros</Link>
            <Link href="/Consultas" className="nav__item">Contacto</Link>

          </nav>
        )}

        <div className="header__acciones">
          {usuario ? (
            <div className="header__usuario">
              <button
                type="button"
                className="header__icono"
                aria-label="Menú de usuario"
                aria-expanded={menuAbierto}
                aria-controls="menu-usuario"
                onClick={() => setMenuAbierto((abierto) => !abierto)}
              >
                <FaUserCircle size={38} />
              </button>

              {menuAbierto && (
                <div id="menu-usuario" className="menu-usuario">
                  <span className="menu-usuario__avatar">
                    <FaUserCircle size={56} />
                  </span>
                  <p className="menu-usuario__nombre">{usuario.nombre}</p>
                  <p className="menu-usuario__correo">{usuario.correo}</p>
                  <p className="menu-usuario__estado">Sesión activa</p>
                  <Link href="/perfil" className="menu-usuario__enlace" onClick={cerrarMenu}>
                    Editar perfil
                  </Link>
                  <Link
                    href="/login"
                    className="menu-usuario__enlace menu-usuario__enlace--salir"
                    onClick={cerrarMenu}
                  >
                    Cerrar sesión
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="header__icono" aria-label="Iniciar sesión">
              <FaUserCircle size={38} />
            </Link>
          )}

          <button type="button" className="header__icono" aria-label="Ubicación">
            <FiMapPin size={38} strokeWidth={1.4} />
          </button>
        </div>
      </div>
    </header>
  )
}