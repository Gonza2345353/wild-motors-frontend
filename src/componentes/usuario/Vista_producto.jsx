import '../../styles/Vista_producto.css'

const miniaturas = [1, 2, 3, 4, 5]

const metricas = [
  { id: 'velocidad', etiqueta: 'Velocidad Maxima', valor: '350 KM/h' },
  { id: 'aceleracion', etiqueta: 'Aceleracion 0 a 100km/h', valor: '2,6s' },
  { id: 'potencia', etiqueta: 'Potencia', valor: '760CV' },
  { id: 'kilometraje', etiqueta: 'Kilometraje', valor: '12000KM' },
]

// Cada sublista es una columna de la ficha técnica
const ficha = [
  ['Modelo: Zonda 760', 'Marca: Pagani', 'Año: 2017'],
  ['Motor: V12 7.2L', 'Motorizacion: Nafta', 'Cilindrada: 7.3 L'],
  ['Transmisión: Transmision Manual 6V', 'Tracción Tracción Trasera (RWD)', 'Tipo: SuperDeportivo'],
  ['Color: Gris'],
]

// posicion: dónde va la imagen respecto del texto
// 'derecha' | 'izquierda' | 'completa' (imagen ancha entre el título y el texto)
const razones = [
  {
    id: 1,
    posicion: 'derecha',
    titulo: 'Diseño exclusivo y personalidad inconfundible',
    imagen: '/img/producto/diseno.jpg',
    texto:
      'El Pagani Zonda 760 destaca por su diseño agresivo y sofisticado, donde cada línea de la carrocería cumple una función estética y aerodinámica. Sus proporciones, sus detalles artesanales y sus elementos inspirados en la competición le otorgan una presencia única. Es un vehículo que combina elegancia italiana con una identidad visual inconfundible, pensado para quienes buscan diferenciarse de los deportivos convencionales.',
  },
  {
    id: 2,
    posicion: 'izquierda',
    titulo: 'Potencia y rendimiento extraordinarios',
    imagen: '/img/producto/potencia.jpg',
    texto:
      'En las versiones Zonda 760 equipadas con el motor Mercedes-AMG V12 atmosférico de 7,3 litros, la potencia alcanza aproximadamente los 760 CV. Esta configuración ofrece una respuesta mecánica directa y un sonido característico que forma parte de su personalidad. Su enfoque en el rendimiento, la aceleración y la conexión con el conductor lo convierte en una propuesta excepcional para los apasionados por la ingeniería automotriz.',
  },
  {
    id: 3,
    posicion: 'completa',
    titulo: 'Una experiencia extraordinaria',
    imagen: '/img/producto/experiencia.jpg',
    texto:
      'El Pagani Zonda 760 combina la potencia de su motor V12, una construcción ligera y una ingeniería excepcional para ofrecer una experiencia de conducción intensa y envolvente. Su diseño, artesanía y exclusividad reflejan la tradición italiana y el espíritu de un auténtico hiperdeportivo, pensado para quienes buscan mucho más que velocidad: una conexión única con el automóvil y una personalidad que lo distingue de cualquier otro.',
  },
]

// Si la imagen todavía no existe se oculta y queda el recuadro limpio
const ocultarSiFalla = (e) => {
  e.currentTarget.style.display = 'none'
}

function Razon({ posicion, titulo, imagen, texto }) {
  const imagenEl = (
    <div className="razon__imagen">
      <img src={imagen} alt="" onError={ocultarSiFalla} />
    </div>
  )

  if (posicion === 'completa') {
    return (
      <article className="razon razon--completa">
        <h3 className="razon__titulo">{titulo}</h3>
        {imagenEl}
        <p className="razon__texto">{texto}</p>
      </article>
    )
  }

  return (
    <article className={`razon razon--${posicion}`}>
      <div className="razon__cuerpo">
        <h3 className="razon__titulo">{titulo}</h3>
        <p className="razon__texto">{texto}</p>
      </div>
      {imagenEl}
    </article>
  )
}

export default function VistaProducto() {
  return (
    <main className="producto-vista">
      {/* ===== Zona con degradé: producto, métricas y ficha técnica ===== */}
      <section className="producto">
        <div className="producto__principal">
          <div className="producto__galeria">
            <div className="producto__foto">
              <img
                src="/img/pagani-zonda-760.png"
                alt="Pagani Zonda 760 gris, vista frontal tres cuartos"
                onError={ocultarSiFalla}
              />
            </div>
            <ul className="producto__miniaturas">
              {miniaturas.map((n) => (
                <li key={n}>
                  <button type="button" aria-label={`Ver foto ${n}`} />
                </li>
              ))}
            </ul>
          </div>

          <div className="producto__info">
            <h1 className="producto__titulo">Pagani Zonda 760 &nbsp;-&nbsp; 2017</h1>
            <p className="producto__estado">Disponible</p>
            <p className="producto__precio">
              <span className="producto__precio-etiqueta">Precio:</span>
              <span className="producto__precio-valor">10,000,000</span>
              <span className="producto__precio-moneda">USD</span>
            </p>
            <h2 className="producto__subtitulo">Exclusividad para verdaderos apasionados</h2>
            <p className="producto__descripcion">
              Ideal para coleccionistas y apasionados del automovilismo que valoran la exclusividad,
              el diseño artesanal y el rendimiento excepcional, y buscan un vehículo que se destaque
              por su carácter único.
            </p>
            <button type="button" className="producto__boton">Consultar</button>
          </div>
        </div>

        <ul className="metricas">
          {metricas.map((m) => (
            <li key={m.id} className="metricas__item">
              <span className="metricas__etiqueta">{m.etiqueta}</span>
              <span className="metricas__valor">{m.valor}</span>
            </li>
          ))}
        </ul>

        <div className="ficha">
          <h2 className="ficha__titulo">Ficha Tecnica</h2>
          <div className="ficha__tabla">
            {ficha.map((columna, i) => (
              <ul key={i} className="ficha__columna">
                {columna.map((dato) => (
                  <li key={dato}>{dato}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Zona clara: por qué elegirlo ===== */}
      <section className="razones">
        <h2 className="razones__titulo">Porque elejír el Pagani Zonda 760 ?</h2>
        <div className="razones__lista">
          {razones.map((razon) => (
            <Razon key={razon.id} {...razon} />
          ))}
        </div>
      </section>
    </main>
  )
}