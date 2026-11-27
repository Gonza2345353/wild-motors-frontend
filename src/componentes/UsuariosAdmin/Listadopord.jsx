
import '../../styles/Listadoprod.css'
import Filrosprod from '../usuario/Filtroprod'
import Tarjetas from './Tarjetas'
import { useState, useEffect } from 'react'
import axios from 'axios'

const URL_BASE = 'http://localhost:3000/api'

export default function Listadoprod({
  admin = false,
  busqueda = '',
  onEditar,
  onCambios,
  onSeleccionarAuto
}) {
  const [vehiculos, setVehiculos] = useState([])

  const [filtros, setFiltros] = useState({
    categoria: '',
    marcas: [],
    precioMinimo: '',
    precioMaximo: ''
  })

  const [motorizacion, setMotorizacion] = useState('todos')

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  useEffect(() => {
    if (admin) {
      Actualizar()
      return
    }

    const params = {
      tipo_id: filtros.categoria,
      marcas: filtros.marcas.join(','),
      precioMinimo: filtros.precioMinimo,
      precioMaximo: filtros.precioMaximo,
      motorizacion
    }

    axios.get(`${URL_BASE}/vehiculos`, {
      ...config,
      params
    })
      .then((respuesta) => setVehiculos(respuesta.data))
      .catch((error) => {
        console.error(error)
        alert(error.response?.data || 'No se pudo extraer los vehículos')
      })
  }, [filtros, motorizacion, admin])

  function Actualizar() {
    axios.get(`${URL_BASE}/vehiculos`, config)
      .then((respuesta) => setVehiculos(respuesta.data))
      .catch((error) => {
        console.error(error)
        alert(error.response?.data || 'No se pudo extraer los vehículos')
      })
  }

  function Eliminar(vehiculo_id) {
    if (!window.confirm('¿Estás seguro de eliminar este vehículo?')) return

    axios.delete(`${URL_BASE}/vehiculos/${vehiculo_id}`, config)
      .then(() => Actualizar())
      .catch((error) => {
        console.error(error)
        const mensaje = error.response?.data
        alert(typeof mensaje === 'string' ? mensaje : 'No se pudo eliminar el vehículo')
      })
  }

  const normalizar = (texto) =>
    String(texto ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()

  const autosMostrar = admin
    ? vehiculos.filter((auto) =>
        !busqueda ||
        normalizar(auto.marca).includes(normalizar(busqueda)) ||
        normalizar(auto.modelo).includes(normalizar(busqueda))
      )
    : vehiculos

  return (
    <main className={`listado ${admin ? 'listado--admin' : ''}`}>

      {!admin && (
        <header className="listado__encabezado">
          <h1 className="listado__titulo">
            Encuentra tu Auto acá y disfruta de las mejores ofertas
          </h1>

          <p className="listado__subtitulo">
            Elegí tu auto y recibilo en todo el país con una tasa de interés del 0%.
          </p>
        </header>
      )}

      <div className="listado__cuerpo">

        {!admin && (
          <Filrosprod
            onCambios={setFiltros}
            onLimpiar={() => setMotorizacion('todos')}
          />
        )}

        <section className="listado__resultados" aria-label="Autos disponibles">

          {!admin && (
            <div className="listado__barra">
              <label>
                <span className="listado__oculto">Tipo de motorización</span>

                <select
                  className="listado_select"
                  value={motorizacion}
                  onChange={(e) => setMotorizacion(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="Eléctrico">Eléctricos</option>
                  <option value="Nafta">Nafteros</option>
                  <option value="Híbrido">Híbridos</option>
                </select>
              </label>
            </div>
          )}

          <div className="listado__panel">
            <div className="listado__grid">
              <Tarjetas
                autos={autosMostrar}
                admin={admin}
                onEditar={onEditar}
                onEliminar={Eliminar}
                onSeleccionarAuto={onSeleccionarAuto}  
              />
            </div>
          </div>

        </section>
      </div>
    </main>
  )
}
