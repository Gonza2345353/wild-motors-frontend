import '../../styles/Login.css'
import Logo from '../../imagenes/complementarias/Logo.png'

export default function Login() {
  return (
    <main className="login">
      {/* Mitad izquierda: formulario */}
      <section className="login__lado login__lado--formulario">
        <h1 className="login__bienvenida">Bienvenido</h1>

        <form className="login__form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="login__titulo">Inicio de Sesion</h2>

          <div className="login__campo">
            <label htmlFor="login-correo">Corrreo o Gmail:</label>
            <input id="login-correo" name="correo" type="email" autoComplete="email" />
          </div>

          <div className="login__campo">
            <label htmlFor="login-contrasena">Contraseña:</label>
            <input
              id="login-contrasena"
              name="contrasena"
              type="password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login__boton login__boton--oscuro">
            Continuar
          </button>
        </form>
      </section>

      {/* Logo centrado sobre la unión de las dos mitades */}
      <img
        className="login__logo"
        src={Logo}
        alt="Wild Motors"
      />

      {/* Mitad derecha: fondo negro */}
      <section className="login__lado login__lado--oscuro">
        <p className="login__invitacion">No tienes una cuenta? Registrate aquí</p>

        <form className="login__form login__form--registro" onSubmit={(e) => e.preventDefault()}>
          <h2 className="login__titulo">Registrarse</h2>

          <div className="login__campo">
            <label htmlFor="registro-nombre">Nombre</label>
            <input id="registro-nombre" name="nombre" type="text" autoComplete="name" />
          </div>

          <div className="login__campo">
            <label htmlFor="registro-correo">Correo:</label>
            <input id="registro-correo" name="correo" type="email" autoComplete="email" />
          </div>

          <div className="login__campo">
            <label htmlFor="registro-contrasena">Contraseña:</label>
            <input
              id="registro-contrasena"
              name="contrasena"
              type="password"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="login__boton login__boton--claro">
            Continuar
          </button>
        </form>
      </section>
    </main>
  )
}