import '../../styles/Panel.css'
import { BsCarFrontFill } from 'react-icons/bs'
import { PiPersonArmsSpread } from 'react-icons/pi'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Panel() {
  const [marcas, setMarcas] = useState([])
  const [datosResumen, setDatosResumen] = useState({disponibles: 0, reservados: 0, vehiculoscant: 0, usuarioscant: 0})
  const [marcaEditando, setMarcaEditando] = useState(null)

  const config = {
    headers: { Authorization: localStorage.getItem('token') }
  }

  const Actualizar = () => {
    axios.get('http://localhost:3000/api/admin', config)
      .then((r) => setDatosResumen(r.data))
      .catch(console.error)
    axios.get('http://localhost:3000/api/marcas')
      .then((r) => setMarcas(r.data.marcas))
      .catch(console.error)
  }

  useEffect(() => {
    Actualizar()
  }, [])

  // Agregar o editar una marca
  const guardarMarca = async (e) => {
    e.preventDefault()

    const form = e.target
    const nombre = form.nombre.value.trim()
    const descripcion = form.descripcion.value.trim()

    if (nombre === '' || descripcion === '') {
      alert('Completá el nombre y la descripción')
      return
    }

    const repetida = marcas.some((m) =>
      m.nombre.toLowerCase() === nombre.toLowerCase() &&
      m.marca_id !== marcaEditando?.marca_id
    )

    if (repetida) {
      alert(`La marca "${nombre}" ya existe`)
      return
    }

    const datos = { nombre, descripcion }

    try {
      if (marcaEditando) {
        await axios.put(`http://localhost:3000/api/marcas/${marcaEditando.marca_id}`, datos, config)
      } else {
        await axios.post('http://localhost:3000/api/marcas', datos, config)
      }

      form.reset()
      setMarcaEditando(null)
      Actualizar()

    } catch (error) {
      console.error(error.response?.data || error)
      alert('No se pudo guardar la marca')
    }
  }

  // Eliminar una marca
  const eliminarMarca = async (marca) => {
    if (!window.confirm(`¿Eliminar la marca "${marca.nombre}"?`)) return

    try {
      await axios.delete(`http://localhost:3000/api/marcas/${marca.marca_id}`, config)

      if (marcaEditando?.marca_id === marca.marca_id) {
        setMarcaEditando(null)
      }

      Actualizar()

    } catch (error) {
      console.error(error.response?.data || error)
      alert('No se pudo eliminar la marca')
    }
  }

  // Datos del resumen
  const resumen = [
    { id: 'registrados', etiqueta: 'Vehículos Registrados', valor: datosResumen.vehiculoscant, color: 'azul', Icono: BsCarFrontFill },
    { id: 'disponibles', etiqueta: 'Vehículos Disponibles', valor: datosResumen.disponibles, color: 'verde', Icono: BsCarFrontFill },
    { id: 'reservados', etiqueta: 'Vehículos Reservados', valor: datosResumen.reservados, color: 'amarillo', Icono: BsCarFrontFill },
    { id: 'usuarios', etiqueta: 'Usuarios Registrados', valor: datosResumen.usuarioscant, color: 'violeta', Icono: PiPersonArmsSpread }
  ]

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

      <h2 className="panel__subtitulo">Marcas</h2>

      <div className="marcas">
        <form
          className="marcas__formulario"
          key={marcaEditando ? marcaEditando.marca_id : 'nuevo'}
          onSubmit={guardarMarca}
        >
          <h3 className="marcas__titulo">
            {marcaEditando ? 'Editar marca' : 'Agregar marca'}
          </h3>

          <label className="marcas__campo">
            Nombre
            <input name="nombre" defaultValue={marcaEditando?.nombre} maxLength={80} required />
          </label>

          <label className="marcas__campo">
            Descripción
            <textarea name="descripcion" defaultValue={marcaEditando?.descripcion} rows="4" required />
          </label>

          <div className="marcas__acciones">
            <button type="submit" className="marcas__boton">
              {marcaEditando ? 'Guardar cambios' : 'Agregar marca'}
            </button>

            {marcaEditando && (
              <button
                type="button"
                className="marcas__boton marcas__boton--secundario"
                onClick={() => setMarcaEditando(null)}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <ul className="marcas__lista">
          {marcas.length === 0 && (
            <li className="marcas__vacio">Todavía no hay marcas cargadas</li>
          )}

          {marcas.map((marca) => (
            <li key={marca.marca_id} className="marcas__item">
              <div>
                <p className="marcas__nombre">{marca.nombre}</p>
                <p className="marcas__detalle">{marca.cantidad_vehiculos} vehículo(s)</p>
              </div>

              <div className="marcas__botones">
                <button
                  type="button"
                  className="marcas__boton marcas__boton--secundario"
                  onClick={() => setMarcaEditando(marca.marca_id)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="marcas__boton marcas__boton--peligro"
                  onClick={() => eliminarMarca(marca.marca_id)}
                  disabled={marca.cantidad_vehiculos > 0}
                  title={marca.cantidad_vehiculos > 0 ? 'Tiene vehículos, no se puede eliminar' : ''}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
