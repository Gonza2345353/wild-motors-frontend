import Tarjetas from '../UsuariosAdmin/Tarjetas'
import Lambo from '../../imagenes/complementarias/lamborghini home.png'
import tasa0 from '../../imagenes/complementarias/pagatuautoencuotas.png'
import elecvs from '../../imagenes/complementarias/combustiblevselectricos.png'
import '../../styles/Home.css'


function IconoFlechaDerecha({ tamano = 26 }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

export default function Home() {
  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="hero">
        <img
          className="hero__imagen"
          src={Lambo}
          alt="Lamborghini Temerario negro en un garaje oscuro"
        />
        <div className="hero__contenido">
          <h1 className="hero__titulo">Lamborghini&nbsp; Temerario</h1>
          <p className="hero__specs">V12 &nbsp;-&nbsp; 760CV &nbsp;-&nbsp; TRACCION TRASERA</p>
          <button type="button" className="boton boton--blanco">Saber más</button>
        </div>
      </section>

      {/* ===== Por qué elegirnos ===== */}
      <section className="elegirnos">
        <h2 className="titulo-seccion">¿Porque Elegirnos ?</h2>
        <div className="elegirnos__textos">
          <p>
            En Wild Motors te ayudamos a encontrar el vehículo que mejor se adapte a tus necesidades,
            con una atención pensada para acompañarte durante todo el proceso.
          </p>
          <p>
            Contamos con atención disponible las 24 horas, los 7 días de la semana para responder tus
            consultas por correo electrónico. Además, ofrecemos envíos a todo el país con un 50% de
            descuento.
          </p>
          <p>Elegí Wild Motors, consultanos y encontrá el auto ideal para vos.</p>
        </div>
      </section>

      {/* ===== Financiación ===== */}
      <section className="financiacion">
        <div className="financiacion__imagen">
          <img src={tasa0} />
        </div>
        <div className="financiacion__panel">
          <h2 className="financiacion__titulo">
            Paga tu auto en cuotas
            <br />
            ¡¡con una tasa de interes del 0%!!
          </h2>
          <div className="financiacion__textos">
            <p>
              Accedé a un plan de financiación que te permite distribuir el pago de tu vehículo en
              cuotas fijas, sin intereses financieros durante el plazo acordado.
            </p>
            <p>
              Conocé las condiciones, los plazos y los vehículos incluidos en la promoción.
            </p>
          </div>
          <button type="button" className="boton boton--gris">
            Ver más <IconoFlechaDerecha />
          </button>
        </div>
      </section>

      {/* ===== Autos eléctricos ===== */}
      <section className="electricos">
        <img
          className="electricos__imagen"
          src={elecvs}
        />
        <div className="electricos__contenido">
          <h2 className="electricos__titulo">¿Autos electricos mejores que los de combustible?</h2>
          <p className="electricos__texto">
            La transición hacia la movilidad eléctrica ha dejado de ser una promesa del futuro para
            convertirse en una realidad cotidiana. Sin embargo, determinar si un vehículo eléctrico
            supera a uno de combustión interna depende de las prioridades, hábitos de manejo y
            necesidades de cada conductor.
          </p>
          <button type="button" className="boton boton--contorno">Descubrir más</button>
        </div>
      </section>

      {/* ===== Elegí tu auto ===== */}
      <section className="catalogo">
        <h2 className="titulo-seccion">¡¡Elejí tu auto y aprovcha &nbsp;tu tasa del 0% en intereses!!</h2>
        <Tarjetas />
      </section>
  
    </main>
  )
}