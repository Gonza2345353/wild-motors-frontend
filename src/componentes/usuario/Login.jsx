import '../../styles/Login.css'
import Logo from '../../imagenes/complementarias/Logo.png'
import axios from 'axios'

export default function Login() {

  
const handleLogin = (e) => {

    e.preventDefault()
    const formulario = new FormData(e.target)
    const url = 'http://localhost:3000/api/usuarios/Login'
    const datos = {
      correo: formulario.get('correo'),
      contrasena: formulario.get('contrasena'),
    }
    const config = {
      headers: { Authorization: 48401155 }
    }

    axios.post(url, datos, config)
      .then((respuesta) => {
        localStorage.setItem('token', respuesta.data.token)
        localStorage.setItem('rol', respuesta.data.rol)
        localStorage.setItem('nombre', respuesta.data.nombre)

        window.location.reload()
      })
      .catch((error) => {
        console.error(error)
        alert(error.response?.data || 'No se pudo iniciar sesión')
      })
  }

  const handleRegistro = (e) => {

    e.preventDefault()

    const formulario = new FormData(e.target)
    
    const datos = {
      nombre: formulario.get('nombre'),
      correo: formulario.get('correo'),
      contrasena: formulario.get('contrasena'),
    }

    const url = 'http://localhost:3000/api/usuarios'

    const config = {
      headers: { Authorization: 48401155 }
    }

    axios.post(url, datos, config)
      .then(() => {
        alert('Cuenta creada. Ya puedes iniciar sesión.')
        e.target.reset()
      })
      .catch((error) => {
        console.error(error)
        alert(error.response?.data || 'No se pudo crear la cuenta')
      })
  }
 
  return (
    <main className="login">

      <section className="login__lado login__lado--formulario">
        <h1 className="login__bienvenida">Bienvenido</h1>

        <form className="login__form" onSubmit={handleLogin}>
          <h2 className="login__titulo">Inicio de Sesión</h2>

          <div className="login__campo">
            <label htmlFor="login-correo">Correo:</label>
            <input id="login-correo" name="correo" type="email" required />
          </div>

          <div className="login__campo">
            <label htmlFor="login-contrasena">Contraseña:</label>
            <input id="login-contrasena" name="contrasena" type="password" required />
          </div>

          <button type="submit" className="login__boton login__boton--oscuro">
            Continuar
          </button>
        </form>
      </section>

      <img className="login__logo" src={Logo} alt="Wild Motors" />

      <section className="login__lado login__lado--oscuro">
        <p className="login__invitacion">¿No tenés una cuenta? Registrate aquí</p>

        <form className="login__form login__form--registro" onSubmit={handleRegistro}>
          <h2 className="login__titulo">Registrarse</h2>

          <div className="login__campo">
            <label htmlFor="registro-nombre">Nombre</label>
            <input id="registro-nombre" name="nombre" type="text" required />
          </div>

          <div className="login__campo">
            <label htmlFor="registro-correo">Correo:</label>
            <input id="registro-correo" name="correo" type="email" required />
          </div>

          <div className="login__campo">
            <label htmlFor="registro-contrasena">Contraseña:</label>
            <input id="registro-contrasena" name="contrasena" type="password" required />
          </div>

          <button type="submit" className="login__boton login__boton--claro">
            Continuar
          </button>
        </form>
      </section>

    </main>
  )
}