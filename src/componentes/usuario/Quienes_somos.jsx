import '../../styles/Quienes_somos.css'

const diferenciales = [
  {
    id: 'curaduria',
    titulo: 'Curaduría automotriz',
    imagen: '/img/nosotros/curaduria.jpg',
    alt: 'Vehículos deportivos seleccionados por Wild Motors',
    texto:
      'En Wild Motors, seleccionamos vehículos que destacan por su ingeniería, diseño y personalidad. Desde la elegancia de BMW hasta la exclusividad de Pagani, cada modelo representa una forma única de vivir la pasión por el automovilismo. Nuestra propuesta va más allá de ofrecer automóviles: buscamos acercarte a vehículos que transmiten valor, carácter y detalle en una experiencia extraordinaria.',
  },
  {
    id: 'identidad',
    titulo: 'Elección con identidad',
    imagen: '/img/nosotros/identidad.jpg',
    alt: 'Cliente eligiendo su auto',
    texto:
      'Cada conductor tiene sus propias preferencias: potencia, elegancia, innovación o un diseño capaz de captar todas las miradas. En Wild Motors, te ayudamos a explorar las opciones disponibles para encontrar el vehículo que mejor se adapte a tus expectativas. A través de nuestras consultas por correo electrónico, podés recibir orientación personalizada y descubrir un automóvil que conecte con tu forma de entender la conducción.',
  },
  {
    id: 'exclusividad',
    titulo: 'Exclusividad sin fronteras',
    imagen: '/img/nosotros/exclusividad.jpg',
    alt: 'Envío de vehículos a todo el país',
    texto:
      'En Wild Motors, queremos que la distancia no limite tu búsqueda. Por eso, acercamos nuestra selección de vehículos deportivos y de lujo a clientes de toda Argentina, con un 50% de descuento en los envíos a todo el país. Además, atendemos tus consultas con inmediatez y dedicación personalizada para que encuentres el auto ideal para vos.',
  },
]

// Si la imagen todavía no existe, se oculta y queda el recuadro gris limpio
// (así el navegador no muestra el texto alternativo adentro).
const ocultarSiFalla = (e) => {
  e.currentTarget.style.display = 'none'
}

export default function Quienes_somos() {
  return (
    <main className="nosotros">
      {/* ===== Escena: franja azul arriba, pestaña "Quienes Somos" y foto circular ===== */}
      <section className="nosotros__escena">
        <h1 className="nosotros__titulo">Sobre Nosotros</h1>

        <article className="nosotros__tarjeta">
          <h2 className="nosotros__tarjeta-titulo">Quienes Somos</h2>
          <p>
            Somos una concesionaria dedicada a la venta y reventa activa de autos deportivos de
            lujo.
          </p>
          <p>
            Nos encargamos de ayudar al cliente a recorrer su camino hacia la elección de su
            vehículo, además contamos con un equipo de asesoramiento que está activo las 24hs listo
            para responder cualquier consulta o darle asesoría personalizada a cada cliente.
          </p>
        </article>

        <div className="nosotros__foto">
          <img
            src="/img/nosotros/equipo.jpg"
            alt="Asesor de Wild Motors pensativo, con un signo de pregunta a su lado"
            onError={ocultarSiFalla}
          />
        </div>
      </section>

      {/* Franja azul que separa la escena del resto */}
      <div className="nosotros__franja" aria-hidden="true" />

      {/* ===== Qué nos diferencia ===== */}
      <section className="diferencias">
        <h2 className="diferencias__titulo">Que nos diferencia del resto</h2>

        <div className="diferencias__grilla">
          {diferenciales.map((d) => (
            <article key={d.id} className="diferencia">
              <div className="diferencia__imagen">
                <img src={d.imagen} alt={d.alt} onError={ocultarSiFalla} />
              </div>
              <h3 className="diferencia__titulo">{d.titulo}</h3>
              <p className="diferencia__texto">{d.texto}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}