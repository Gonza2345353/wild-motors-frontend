
import '../../styles/Footer.css'

const columnasFooter = [
  {
    titulo: 'Wild Motors',
    enlaces: ['Quienes somos y que hacemos', 'Porpuesta', 'Atencion por correo', 'Ver catalógo'],
  },
  {
    titulo: 'Categorías',
    enlaces: ['Electricos', 'Suv de alta gama', 'Nafteros', 'Modelos Destacados'],
  },
  {
    titulo: 'Politícas y ayuda',
    enlaces: ['Politicas de privacidad', 'Terminos y condiciones', 'Preguntas Frecuentes', 'Conusulta por ayuda'],
  },
]

function IconoFacebook() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z" />
    </svg>
  )
}

function IconoInstagram() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  )
}

function IconoGithub() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__columnas">
        {columnasFooter.map((col) => (
          <nav key={col.titulo} className="footer__columna" aria-label={col.titulo}>
            <h3 className="footer__titulo">{col.titulo}</h3>
            <ul>
              {col.enlaces.map((enlace) => (
                <li key={enlace}>
                  <a href="#">{enlace}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer__columna footer__columna--redes">
          <h3 className="footer__titulo">Seguinos</h3>
          <ul className="footer__redes">
            <li><a href="#" aria-label="Facebook"><IconoFacebook /></a></li>
            <li><a href="#" aria-label="Instagram"><IconoInstagram /></a></li>
            <li><a href="#" aria-label="GitHub"><IconoGithub /></a></li>
          </ul>
        </div>
      </div>

      <p className="footer__legal">
        Todos los derechos reservados- Wild Motors 2026- Programacion 7°1- Gonzalo German Oliva
      </p>
    </footer>
  )
}