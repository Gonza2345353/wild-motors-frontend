import '../../styles/Consultas.css'

const asuntos = [
  'Consultar por un auto',
  'Financiación en cuotas',
  'Envíos a todo el país',
  'Otro motivo',
]

const consultasCliente = [
  {
    consulta_id: 3,
    usuario_id: 1,
    nombre: 'Gonzalo Oliva',
    telefono: '1122334455',
    correo_electronico: 'olivagonzalo@gmail.com',
    asunto: 'Consultar por un auto',
    mensaje:
      'Hola, quería consultar por el Pagani Zonda 760 2017. ¿Está disponible para verlo en persona?',
  },
  {
    consulta_id: 2,
    usuario_id: 1,
    nombre: 'Gonzalo Oliva',
    telefono: '1122334455',
    correo_electronico: 'olivagonzalo@gmail.com',
    asunto: 'Financiación en cuotas',
    mensaje: 'Quisiera saber qué plazos hay para financiar un auto con tasa del 0%.',
  },
  {
    consulta_id: 1,
    usuario_id: 1,
    nombre: 'Gonzalo Oliva',
    telefono: '1122334455',
    correo_electronico: 'olivagonzalo@gmail.com',
    asunto: 'Envíos a todo el país',
    mensaje: '¿Hacen envíos al interior? ¿Cómo funciona el descuento del 50%?',
  },
]

export default function Consultas() {
  return (
    <main className="consulta">
      <div className="consulta__contenedor">
        <h1 className="consulta__intro">
          Haz tus consultas y te responderemos lo antes posible. Gracias por tu atención
        </h1>

        <section className="consulta__tarjeta" aria-labelledby="consulta-titulo">
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 id="consulta-titulo" className="consulta__titulo">Consulta</h2>

            <div className="consulta__campos">
              <div className="consulta__campo consulta__campo--izq">
                <label htmlFor="consulta-nombre">Nombre</label>
                <input
                  id="consulta-nombre"
                  name="nombre"
                  type="text"
                  required
                />
              </div>

              <div className="consulta__campo">
                <label htmlFor="consulta-correo">Correo electronico</label>
                <input
                  id="consulta-correo"
                  name="correo"
                  type="email"
                  required
                />
              </div>

              <div className="consulta__campo consulta__campo--izq">
                <label htmlFor="consulta-telefono">Telefono</label>
                <input id="consulta-telefono" name="telefono" type="tel" autoComplete="tel" />
              </div>

              <div className="consulta__campo">
                <label htmlFor="consulta-asunto">Asunto</label>
                <select id="consulta-asunto" name="asunto" defaultValue={asuntos[0]}>
                  {asuntos.map((asunto) => (
                    <option key={asunto} value={asunto}>
                      {asunto}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="consulta__campo consulta__campo--mensaje">
              <label htmlFor="consulta-mensaje">Mensaje:</label>
              <textarea id="consulta-mensaje" name="mensaje" required />
            </div>

            <div className="consulta__acciones">
              <button type="submit" className="consulta__boton consulta__boton--enviar">
                Enviar consulta
              </button>
              <button type="reset" className="consulta__boton consulta__boton--cancelar">
                Cancelar
              </button>
            </div>
          </form>
        </section>

        {/* ===== Consultas del cliente ===== */}
        <section
          className="consulta__tarjeta consultas-lista"
          aria-labelledby="consultas-lista-titulo"
        >
          <h2 id="consultas-lista-titulo" className="consulta__titulo">Tus consultas</h2>

          {consultasCliente.length === 0 ? (
            <p className="consultas-lista__vacio">Todavía no enviaste consultas.</p>
          ) : (
            <ul className="consultas-lista__items">
              {consultasCliente.map((c) => (
                <li key={c.consulta_id} className="consultas-item">
                  <div className="consultas-item__cabecera">
                    <h3 className="consultas-item__asunto">{c.asunto}</h3>
                    <span className="consultas-item__numero">N° {c.consulta_id}</span>
                  </div>

                  <p className="consultas-item__mensaje">{c.mensaje}</p>

                  <dl className="consultas-item__datos">
                    <div>
                      <dt>Nombre</dt>
                      <dd>{c.nombre}</dd>
                    </div>
                    <div>
                      <dt>Telefono</dt>
                      <dd>{c.telefono}</dd>
                    </div>
                    <div>
                      <dt>Correo</dt>
                      <dd>{c.correo_electronico}</dd>
                    </div>
                  </dl>

                  <div className="consultas-item__acciones">
                    <button
                      className="consultas-item__editar"
                      onClick={() => editarConsulta(c)}
                    >
                      Editar
                    </button>

                    <button
                      className="consultas-item__eliminar"
                      onClick={() => eliminarConsulta(c.consulta_id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}