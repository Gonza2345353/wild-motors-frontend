import './App.css'
import { Switch, Route } from 'wouter'
import Home from './componentes/usuario/Home'
import Header from './componentes/UsuariosAdmin/Header'
import Footer from './componentes/UsuariosAdmin/Footer'
import Login from './componentes/usuario/Login'
import Listadoprod from './componentes/usuario/Listadopord'
import Quienes_somos from './componentes/usuario/Quienes_somos'
import Consultas from './componentes/usuario/Consultas'
import Tendencias from './componentes/usuario/Tendencias'
import PanelAdmin from './componentes/admin/PanelAdmin'

export default function App() {


  return (
    <>
       <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/Modelos" component={Listadoprod} />
        <Route path="/Quienes_somos" component={Quienes_somos} />
        <Route path="/Consultas" component={Consultas} />
        <Route path="/Tendencias" component={Tendencias} />
        <Route path="/PanelAdmin" component={PanelAdmin} />

        <Route>
          <main className="no-encontrado">
            <h1>Página no encontrada</h1>
          </main>
        </Route>
      </Switch>
      <Footer />
    </>
  )
}