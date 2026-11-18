import '../../styles/Listadoprod.css'
import Filrosprod from './Filtroprod'
import Tarjetas  from '../UsuariosAdmin/Tarjetas'


export default function Listadoprod() {
  return (
    <main className="listado">
      <header className="listado__encabezado">
        <h1 className="listado__titulo">
          Encuentra tu Auto acá y disfruta de las mejores ofertas
        </h1>
        <p className="listado__subtitulo">
          Elegí tu auto y recibilo en todo el país con una tasa de interés del 0%.
        </p>
      </header>

      <div className="listado__cuerpo">
        <Filrosprod />

        <section className="listado__resultados" aria-label="Autos disponibles">
          <div className="listado__barra">
            <label>
              <span className="listado__oculto">Tipo de motorización</span>
              <select className="listado__select" name="motorizacion" defaultValue="electricos">
                <option value="todos">Todos</option>
                <option value="electricos">Electricos</option>
                <option value="nafteros">Nafteros</option>
                <option value="hibridos">Híbridos</option>
              </select>
            </label>
          </div>

          <div className="listado__panel">
            <div className="listado__grid">
                <Tarjetas />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}