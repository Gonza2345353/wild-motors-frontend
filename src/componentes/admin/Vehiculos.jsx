
import { useState } from 'react'
import { FiPlus, FiSearch, FiX } from 'react-icons/fi'
import Listadoprod from '../UsuariosAdmin/Listadopord'
import useVehiculo from '../Hooks/useVehiculos'
import '../../styles/Vehiculos.css'

const campos = {
    general: [
        ['marca', 'Marca'],
        ['modelo', 'Modelo'],
        ['anio', 'Año', 'number'],
        ['precio_usd', 'Precio (USD)', 'number'],
        ['tipo_vehiculo', 'Tipo de vehículo'],
        ['color_exterior', 'Color exterior'],
    ],
    tecnicos: [
        ['motorizacion', 'Motorización'],
        ['motor', 'Motor'],
        ['potencia_cv', 'Potencia (CV)', 'number'],
        ['kilometraje_km', 'Kilometraje (km)', 'number'],
    ],
}

const imagenesVehiculo = [
    ['imagen_frontal_3_4', 'Vista frontal 3/4'],
    ['imagen_trasera_3_4', 'Vista trasera 3/4'],
    ['imagen_lateral', 'Vista lateral completa'],
    ['imagen_frontal', 'Vista frontal directa'],
    ['imagen_trasera', 'Vista trasera directa'],
    ['imagen_interior', 'Vista del interior'],
]

const opciones = {
    tipo_vehiculo: ['SuperDeportivo', 'Deportivo', 'SUV', 'Sedan', 'Coupe'],
    transmision: ['Manual', 'Automática'],
    traccion: ['Trasera', 'Delantera', 'Integral'],
    estado: ['Disponible', 'Reservado', 'Vendido'],
}

export default function Vehiculos() {
    const [busqueda, setBusqueda] = useState('')

    const {
        formAbierto, recarga, datos, imagenes,
        abrirNuevo, abrirEdicion, cambiarValor, cambiarImagen,
        cambiarTexto, agregarTexto, eliminarTexto,
        guardar, cerrarFormulario,
    } = useVehiculo()

    // Generador de campos
    const renderCampos = (lista) => lista.map(([name, label, type]) => (
        <label key={name}>
            {label}

            {opciones[name] ? (
                <select
                    value={datos[name]}
                    onChange={(e) => cambiarValor(name, e.target.value)}
                >
                    <option value="">Seleccionar</option>
                    {opciones[name].map((opcion) => (
                        <option key={opcion} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type || 'text'}
                    value={datos[name] ?? ''}
                    onChange={(e) => cambiarValor(name, e.target.value)}
                    required={['marca', 'modelo'].includes(name)}
                />
            )}
        </label>
    ))

    return (
        <section className="vehiculos-admin">
            {/* CABECERA */}
            <div className="vehiculos-admin__cabecera">
                <h1 className="vehiculos-admin__titulo">Vehículos</h1>
                <button
                    type="button"
                    className="vehiculos-admin__agregar"
                    onClick={abrirNuevo}
                >
                    Agregar <FiPlus size={14} />
                </button>
            </div>

            {/* FORMULARIO */}
            {formAbierto && (
                <div className="vehiculos-admin__formulario">
                    <h2>
                        {formAbierto === 'nuevo' ? 'Agregar vehículo' : 'Editar vehículo'}
                    </h2>

                    <form onSubmit={guardar}>
                        {/* INFORMACIÓN GENERAL */}
                        <section className="formulario__seccion">
                            <h3>01 - Información general</h3>
                            <div className="formulario__grid">
                                {renderCampos(campos.general)}
                            </div>
                        </section>

                        {/* CARACTERÍSTICAS TÉCNICAS */}
                        <section className="formulario__seccion">
                            <h3>02 - Características técnicas</h3>
                            <div className="formulario__grid">
                                {renderCampos(campos.tecnicos)}
                                {renderCampos([
                                    ['transmision', 'Transmisión'],
                                    ['traccion', 'Tracción'],
                                ])}
                            </div>
                        </section>

                        {/* IMÁGENES */}
                        <section className="formulario__seccion">
                            <h3>03 - Imágenes</h3>
                            <div className="formulario__imagenes">
                                {imagenesVehiculo.map(([name, label]) => (
                                    <label className="formulario__imagen" key={name}>
                                        <span>{label}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => cambiarImagen(name, e.target.files)}
                                        />
                                        <small>
                                            {imagenes[name]?.name || 'Seleccionar imagen'}
                                        </small>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* TEXTO PRINCIPAL */}
                        <section className="formulario__seccion">
                            <h3>04 - Texto principal</h3>
                            <label>
                                Título principal
                                <input
                                    value={datos.titulo_principal}
                                    onChange={(e) => cambiarValor('titulo_principal', e.target.value)}
                                />
                            </label>
                            <label>
                                Descripción
                                <textarea
                                    rows="4"
                                    value={datos.texto_principal}
                                    onChange={(e) => cambiarValor('texto_principal', e.target.value)}
                                />
                            </label>
                        </section>

                        {/* TEXTOS SECUNDARIOS */}
                        <section className="formulario__seccion">
                            <h3>05 - Textos secundarios</h3>

                            {datos.textos_secundarios.map((texto, index) => (
                                <div className="formulario__texto-secundario" key={index}>
                                    <label>
                                        Título {index + 1}
                                        <input
                                            value={texto.titulo}
                                            onChange={(e) => cambiarTexto(index, 'titulo', e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Descripción
                                        <textarea
                                            rows="3"
                                            value={texto.texto}
                                            onChange={(e) => cambiarTexto(index, 'texto', e.target.value)}
                                        />
                                    </label>

                                    {datos.textos_secundarios.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => eliminarTexto(index)}
                                        >
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

                        {/* IMÁGENES COMPLEMENTARIAS */}
                        <section className="formulario__seccion">
                            <h3>06 - Imágenes complementarias</h3>
                            <div className="formulario__imagenes">
                                {datos.textos_secundarios.map((texto, index) => {
                                    const nombre = `imagen_texto_secundario_${index + 1}`

                                    return (
                                        <label className="formulario__imagen" key={index}>
                                            <span>Texto secundario {index + 1}</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => cambiarImagen(nombre, e.target.files)}
                                            />
                                            <small>
                                                {imagenes[nombre]?.name || 'Seleccionar imagen'}
                                            </small>
                                        </label>
                                    )
                                })}
                            </div>
                        </section>

                        {/* ESTADO */}
                        <section className="formulario__seccion">
                            <h3>07 - Estado</h3>
                            {renderCampos([['estado', 'Estado']])}
                        </section>

                        <div className="formulario__acciones">
                            <button type="submit">
                                {formAbierto === 'nuevo' ? 'Guardar vehículo' : 'Guardar cambios'}
                            </button>
                            <button type="button" onClick={cerrarFormulario}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* BUSCADOR */}
            <div className="vehiculos-admin__barra">
                <label className="vehiculos-admin__buscador">
                    <span className="vehiculos-admin__oculto">Buscar vehículo</span>
                    <FiSearch size={16} />
                    <input
                        type="search"
                        placeholder="Buscar..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </label>
            </div>

            {/* LISTADO */}
            <ul className="vehiculos-admin__lista">
                <li className="vehiculos-admin__item">
                    <Listadoprod
                        key={recarga}
                        admin
                        busqueda={busqueda}
                        onEditar={abrirEdicion}
                    />
                </li>
            </ul>
        </section>
    )
}
