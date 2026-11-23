
import { useState } from 'react'
import { FiPlus, FiSearch, FiX } from 'react-icons/fi'
import Listadoprod from '../UsuariosAdmin/Listadopord'
import useVehiculo from '../Hooks/useVehiculos'
import '../../styles/Vehiculos.css'

export default function Vehiculos() {
    const [busqueda, setBusqueda] = useState('')

    const {
        formAbierto, recarga, datos, imagenes,
        abrirNuevo, abrirEdicion, cambiarValor, cambiarImagen,
        cambiarTexto, agregarTexto, eliminarTexto, guardar, cerrarFormulario,
    } = useVehiculo()

    return (
        <section className="vehiculos-admin">

            {/* CABECERA */}
            <div className="vehiculos-admin__cabecera">
                <h1 className="vehiculos-admin__titulo">Vehículos</h1>
                <button type="button" className="vehiculos-admin__agregar" onClick={abrirNuevo}>
                    Agregar <FiPlus size={14} />
                </button>
            </div>

            
            {/* BUSCADOR */}
            <div className="vehiculos-admin__barra">
                <label className="vehiculos-admin__buscador">
                    <span className="vehiculos-admin__oculto">Buscar vehículo</span>
                    <FiSearch size={16} />
                    <input type="search" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                </label>
            </div>
            {/* FORMULARIO */}
            {formAbierto && (
                <div className="vehiculos-admin__formulario">
                    <h2>{formAbierto === 'nuevo' ? 'Agregar vehículo' : 'Editar vehículo'}</h2>

                    <form onSubmit={guardar}>

                        {/* 01 - INFORMACIÓN GENERAL */}
                        <section className="formulario__seccion">
                            <h3>01 - Información general</h3>
                            <div className="formulario__grid">

                                <label>Marca
                                    <input type="text" value={datos.marca ?? ''} onChange={(e) => cambiarValor('marca', e.target.value)} required />
                                </label>

                                <label>Modelo
                                    <input type="text" value={datos.modelo ?? ''} onChange={(e) => cambiarValor('modelo', e.target.value)} required />
                                </label>

                                <label>Año
                                    <input type="number" value={datos.anio ?? ''} onChange={(e) => cambiarValor('anio', e.target.value)} />
                                </label>

                                <label>Precio
                                    <input type="number" value={datos.precio ?? ''} onChange={(e) => cambiarValor('precio', e.target.value)} />
                                </label>

                                <label>Tipo de vehículo
                                    <select value={datos.tipo ?? ''} onChange={(e) => cambiarValor('tipo', e.target.value)}>
                                        <option value="">Seleccionar</option>
                                        <option value="superdeportivo">SuperDeportivo</option>
                                        <option value="deportivo">Deportivo</option>
                                        <option value="suv">SUV</option>
                                        <option value="sedan">Sedan</option>
                                        <option value="coupe">Coupe</option>
                                    </select>
                                </label>

                                <label>Color
                                    <input type="text" value={datos.color ?? ''} onChange={(e) => cambiarValor('color', e.target.value)} />
                                </label>

                            </div>
                        </section>

                        {/* 02 - CARACTERÍSTICAS TÉCNICAS */}
                        <section className="formulario__seccion">
                            <h3>02 - Características técnicas</h3>
                            <div className="formulario__grid">

                                <label>Motorización
                                    <input type="text" value={datos.motorizacion ?? ''} onChange={(e) => cambiarValor('motorizacion', e.target.value)} />
                                </label>

                                <label>Motor
                                    <input type="text" value={datos.motor ?? ''} onChange={(e) => cambiarValor('motor', e.target.value)} />
                                </label>

                                <label>Potencia (CV)
                                    <input type="number" value={datos.potencia_cv ?? ''} onChange={(e) => cambiarValor('potencia_cv', e.target.value)} />
                                </label>

                                <label>Cilindrada
                                    <input type="text" value={datos.cilindrada ?? ''} onChange={(e) => cambiarValor('cilindrada', e.target.value)} />
                                </label>

                                <label>Kilometraje
                                    <input type="number" value={datos.kilometraje ?? ''} onChange={(e) => cambiarValor('kilometraje', e.target.value)} />
                                </label>

                                <label>Transmisión
                                    <select value={datos.transmision ?? ''} onChange={(e) => cambiarValor('transmision', e.target.value)}>
                                        <option value="">Seleccionar</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Automática">Automática</option>
                                    </select>
                                </label>

                                <label>Tracción
                                    <select value={datos.traccion ?? ''} onChange={(e) => cambiarValor('traccion', e.target.value)}>
                                        <option value="">Seleccionar</option>
                                        <option value="Trasera">Trasera</option>
                                        <option value="Delantera">Delantera</option>
                                        <option value="Integral">Integral</option>
                                    </select>
                                </label>

                                <label>Aceleración
                                    <input type="text" value={datos.aceleracion ?? ''} onChange={(e) => cambiarValor('aceleracion', e.target.value)} />
                                </label>

                                <label>Velocidad máxima
                                    <input type="text" value={datos.velocidad_max ?? ''} onChange={(e) => cambiarValor('velocidad_max', e.target.value)} />
                                </label>

                            </div>
                        </section>

                        {/* 03 - IMÁGENES */}
                        <section className="formulario__seccion">
                            <h3>03 - Imágenes</h3>
                            <div className="formulario__imagenes">

                                <label className="formulario__imagen">
                                    <span>Frontal 3/4</span>
                                    <input type="file" accept="image/*" onChange={(e) => cambiarImagen('imagen_frontal_3_4', e.target.files)} />
                                    <small>{imagenes.imagen_frontal_3_4?.name || 'Seleccionar imagen'}</small>
                                </label>

                                <label className="formulario__imagen">
                                    <span>Trasera 3/4</span>
                                    <input type="file" accept="image/*" onChange={(e) => cambiarImagen('imagen_trasera_3_4', e.target.files)} />
                                    <small>{imagenes.imagen_trasera_3_4?.name || 'Seleccionar imagen'}</small>
                                </label>

                                <label className="formulario__imagen">
                                    <span>Lateral</span>
                                    <input type="file" accept="image/*" onChange={(e) => cambiarImagen('imagen_lateral', e.target.files)} />
                                    <small>{imagenes.imagen_lateral?.name || 'Seleccionar imagen'}</small>
                                </label>

                                <label className="formulario__imagen">
                                    <span>Frontal</span>
                                    <input type="file" accept="image/*" onChange={(e) => cambiarImagen('imagen_frontal', e.target.files)} />
                                    <small>{imagenes.imagen_frontal?.name || 'Seleccionar imagen'}</small>
                                </label>

                                <label className="formulario__imagen">
                                    <span>Trasera</span>
                                    <input type="file" accept="image/*" onChange={(e) => cambiarImagen('imagen_trasera', e.target.files)} />
                                    <small>{imagenes.imagen_trasera?.name || 'Seleccionar imagen'}</small>
                                </label>

                                <label className="formulario__imagen">
                                    <span>Interior</span>
                                    <input type="file" accept="image/*" onChange={(e) => cambiarImagen('imagen_interior', e.target.files)} />
                                    <small>{imagenes.imagen_interior?.name || 'Seleccionar imagen'}</small>
                                </label>

                            </div>
                        </section>

                        {/* 04 - TEXTO PRINCIPAL */}
                        <section className="formulario__seccion">
                            <h3>04 - Texto principal</h3>

                            <label>Título principal
                                <input type="text" value={datos.titulo_principal ?? ''} onChange={(e) => cambiarValor('titulo_principal', e.target.value)} />
                            </label>

                            <label>Descripción
                                <textarea rows="4" value={datos.texto_principal ?? ''} onChange={(e) => cambiarValor('texto_principal', e.target.value)} />
                            </label>
                        </section>

                        {/* 05 - TEXTOS SECUNDARIOS */}
                        <section className="formulario__seccion">
                            <h3>05 - Textos secundarios</h3>

                            {datos.textos_secundarios.map((texto, index) => (
                                <div className="formulario__texto-secundario" key={index}>
                                    <label>Título {index + 1}
                                        <input type="text" value={texto.titulo} onChange={(e) => cambiarTexto(index, 'titulo', e.target.value)} />
                                    </label>

                                    <label>Descripción
                                        <textarea rows="3" value={texto.texto} onChange={(e) => cambiarTexto(index, 'texto', e.target.value)} />
                                    </label>

                                    {datos.textos_secundarios.length > 1 && (
                                        <button type="button" onClick={() => eliminarTexto(index)}>
                                            <FiX /> Eliminar
                                        </button>
                                    )}
                                </div>
                            ))}

                            {datos.textos_secundarios.length < 3 && (
                                <button type="button" onClick={agregarTexto}>
                                    + Texto secundario
                                </button>
                            )}
                        </section>

                        {/* 06 - IMÁGENES COMPLEMENTARIAS */}
                        <section className="formulario__seccion">
                            <h3>06 - Imágenes complementarias</h3>
                            <div className="formulario__imagenes">

                                {datos.textos_secundarios.map((texto, index) => {
                                    const nombre = `imagen_texto_secundario_${index + 1}`

                                    return (
                                        <label className="formulario__imagen" key={index}>
                                            <span>Texto secundario {index + 1}</span>
                                            <input type="file" accept="image/*" onChange={(e) => cambiarImagen(nombre, e.target.files)} />
                                            <small>{imagenes[nombre]?.name || 'Seleccionar imagen'}</small>
                                        </label>
                                    )
                                })}

                            </div>
                        </section>

                        {/* 07 - ESTADO */}
                        <section className="formulario__seccion">
                            <h3>07 - Estado</h3>
                            <label>Estado
                                <select value={datos.estado ?? ''} onChange={(e) => cambiarValor('estado', e.target.value)}>
                                    <option value="">Seleccionar</option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="Reservado">Reservado</option>
                                    <option value="Vendido">Vendido</option>
                                </select>
                            </label>
                        </section>

                        {/* ACCIONES */}
                        <div className="formulario__acciones">
                            <button type="submit">
                                {formAbierto === 'nuevo' ? 'Guardar vehículo' : 'Guardar cambios'}
                            </button>
                            <button type="button" onClick={cerrarFormulario}>Cancelar</button>
                        </div>

                    </form>
                </div>
            )}

            {/* LISTADO */}
            <ul className="vehiculos-admin__lista">
                <li className="vehiculos-admin__item">
                    <Listadoprod key={recarga} admin busqueda={busqueda} onEditar={abrirEdicion} />
                </li>
            </ul>
        </section>
    )
}
