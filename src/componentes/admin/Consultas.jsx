import ListadoConsultas from '../UsuariosAdmin/ListadoConsultas'
import '../../styles/ConsultasAdmin.css'

export default function Consultas() {
  return (
    <section className="consultas-admin">
      <h1 className="consultas-admin__titulo">
        Consultas Recibidas
      </h1>
      <ListadoConsultas />
    </section>
  )
}