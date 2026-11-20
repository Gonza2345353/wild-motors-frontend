
import '../../styles/Listadoprod.css'
import Filrosprod from './Filtroprod'
import Tarjetas from '../UsuariosAdmin/Tarjetas'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Listadoprod({ admin = false }) {

  const [vehiculos, setVehiculos] = useState([])
  const [cambios, setCambios] = useState({})

  // Obtener vehículos
  useEffect(() => {
    Actualizar()
  }, [])

  function Actualizar() {
    const url = 'http://localhost:3000/api/vehiculos'

    const config = {
      headers: { Authorization: 'Bearer 48401155' }
    }

    axios.get(url, config)
      .then((respuesta) => {
        setVehiculos(respuesta.data)
      })
      .catch((error) => {
        console.error(error)
        alert(error.response?.data || 'No se pudo extraer los vehículos')
      })
  }

  // Filtrar vehículos
  const vehiculosFiltrados = vehiculos.filter((auto) => {

    const coincideCategoria =
      !cambios.categoria || auto.tipo === cambios.categoria

    const coincideMarca =
      !cambios.marcas?.length || cambios.marcas.includes(auto.marca)

    const coincidePrecioMinimo =
      !cambios.precioMinimo || auto.precio >= Number(cambios.precioMinimo)

    const coincidePrecioMaximo =
      !cambios.precioMaximo || auto.precio <= Number(cambios.precioMaximo)

    const coincideMotorizacion =
      !cambios.motorizacion ||
      cambios.motorizacion === 'todos' ||
      auto.motorizacion === cambios.motorizacion

    return coincideCategoria &&
      coincideMarca &&
      coincidePrecioMinimo &&
      coincidePrecioMaximo &&
      coincideMotorizacion
  })

  return (
    <main className="listado">

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
          <Filrosprod onCambios={setCambios} />
        )}

        <section className="listado__resultados" aria-label="Autos disponibles">

          {!admin && (
            <div className="listado__barra">
              <label>
                <span className="listado__oculto">Tipo de motorización</span>

                <select
                  className="listado__select"
                  name="motorizacion"
                  defaultValue="todos"
                  onChange={(e) => setCambios({
                    ...cambios,
                    motorizacion: e.target.value
                  })}
                >
                  <option value="todos">Todos</option>
                  <option value="electricos">Electricos</option>
                  <option value="nafteros">Nafteros</option>
                  <option value="hibridos">Híbridos</option>
                </select>
              </label>
            </div>
          )}

          <div className="listado__panel">
            <div className="listado__grid">

              <Tarjetas
                autos={admin ? vehiculos : vehiculosFiltrados}
                admin={admin}
                onEditar={(auto) => console.log('Editar:', auto)}
                onEliminar={(auto) => console.log('Eliminar:', auto)}
              />

            </div>
          </div>

        </section>
      </div>
    </main>
  )
}
