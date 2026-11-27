import '../../styles/Footer.css'
import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__columnas">

        <nav className="footer__columna" aria-label="Wild Motors">
          <h3 className="footer__titulo">Wild Motors</h3>

          <ul>
            <li><a href="#">Quienes somos y que hacemos</a></li>
            <li><a href="#">Propuesta</a></li>
            <li><a href="#">Atención por correo</a></li>
            <li><a href="#">Ver catálogo</a></li>
          </ul>
        </nav>

        <nav className="footer__columna" aria-label="Categorías">
          <h3 className="footer__titulo">Categorías</h3>

          <ul>
            <li><a href="#">Eléctricos</a></li>
            <li><a href="#">SUV de alta gama</a></li>
            <li><a href="#">Naftenos</a></li>
            <li><a href="#">Modelos destacados</a></li>
          </ul>
        </nav>

        <nav className="footer__columna" aria-label="Políticas y ayuda">
          <h3 className="footer__titulo">Políticas y ayuda</h3>

          <ul>
            <li><a href="#">Políticas de privacidad</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Consulta por ayuda</a></li>
          </ul>
        </nav>

        <div className="footer__columna footer__columna--redes">
          <h3 className="footer__titulo">Seguinos</h3>

          <ul className="footer__redes">
            <li>
              <a href="#" aria-label="Facebook">
                <FaFacebook style={{ width: '30px', height: '30px' }} />
              </a>
            </li>

            <li>
              <a href="#" aria-label="Instagram">
                <FaInstagram style={{ width: '30px', height: '30px' }} />
              </a>
            </li>

            <li>
              <a href="#" aria-label="GitHub">
                <FaGithub style={{ width: '30px', height: '30px' }} />
              </a>
            </li>
          </ul>
        </div>

      </div>

      <p className="footer__legal">
        Todos los derechos reservados - Wild Motors 2026 -
        Programación 7°1 - Gonzalo German Oliva
      </p>
    </footer>
  )
}
