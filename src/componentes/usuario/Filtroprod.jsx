
import '../../styles/Filtroprod.css'

import suvdeportivo from '../../imagenes/Filtrocategoria/suvdeportivo.png'
import sedan from '../../imagenes/Filtrocategoria/sedan.png'
import coupe from '../../imagenes/Filtrocategoria/coupe.png'
import descapotable from '../../imagenes/Filtrocategoria/descapotable.png'
import superdeportivo from '../../imagenes/Filtrocategoria/superdeportivo.png'

const categorias = [
  { id: 'Suv Deportivo', nombre: 'Suv Deportivo', imagen: suvdeportivo },
  { id: 'Sedán', nombre: 'Sedán', imagen: sedan },
  { id: 'Coupé', nombre: 'Coupé', imagen: coupe },
  { id: 'Descapotable', nombre: 'Descapotable', imagen: descapotable },
  { id: 'Superdeportivo', nombre: 'Superdeportivo', imagen: superdeportivo },
]

const marcas = ['BMW', 'Lamborghini', 'Pagani', 'Ferrari']

export default function Filrosprod({ onCambios }) {
  return (
    <aside className="filtros" aria-label="Filtros de búsqueda">

      <form onChange={(e) => {
        const datos = new FormData(e.currentTarget)

        onCambios({
          categoria: datos.get('categoria'),
          marcas: datos.getAll('marca'),
          precioMinimo: datos.get('precio-minimo'),
          precioMaximo: datos.get('precio-maximo')
        })
      }}>

        <fieldset className="filtros__grupo">
          <legend className="filtros__titulo">Categoría</legend>

          <div className="filtros__categorias">
            {categorias.map((cat) => (
              <label key={cat.id} className="filtros__opcion">
                <input
                  className="filtros__control"
                  type="radio"
                  name="categoria"
                  value={cat.id}
                />

                <span className="filtros__tile">
                  <img src={cat.imagen} alt="" />
                  <span>{cat.nombre}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="filtros__grupo">
          <legend className="filtros__titulo">Marca</legend>

          <div className="filtros__marcas">
            {marcas.map((marca) => (
              <label key={marca} className="filtros__opcion">
                <input
                  className="filtros__control"
                  type="checkbox"
                  name="marca"
                  value={marca}
                />

                <span className="filtros__chip">{marca}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="filtros__grupo">
          <legend className="filtros__titulo">Precio</legend>

          <div className="filtros__precio">
            <label>
              <span>Mínimo</span>
              <input type="number" name="precio-minimo" min="0" placeholder="USD" />
            </label>

            <label>
              <span>Máximo</span>
              <input type="number" name="precio-maximo" min="0" placeholder="USD" />
            </label>
          </div>
        </fieldset>

      </form>
    </aside>
  )
}
