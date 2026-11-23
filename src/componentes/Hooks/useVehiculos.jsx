import { useState } from 'react'
import axios from 'axios'
const URL_BASE = 'http://localhost:3000/api'
const MAX_TEXTOS = 3

const CAMPOS = [
    'marca', 'modelo', 'anio', 'precio', 'tipo', 'color',
    'motorizacion', 'motor', 'potencia_cv', 'cilindrada', 'kilometraje',
    'transmision', 'traccion', 'aceleracion', 'velocidad_max', 'estado',
    'titulo_principal', 'texto_principal',
]

const NUMERICOS = [
    'anio', 'precio', 'potencia_cv', 'cilindrada',
    'kilometraje', 'aceleracion', 'velocidad_max',
]

const campoImagenTexto = (numero) => `imagen_texto_secundario_${numero}`

const iniciales = () => ({
    marca: '', modelo: '', anio: '', precio: '',
    tipo: '', color: '', motorizacion: '', motor: '',
    potencia_cv: '', cilindrada: '', kilometraje: '',
    transmision: '', traccion: '', aceleracion: '', velocidad_max: '',
    titulo_principal: '', texto_principal: '', estado: 'Disponible',
    textos_secundarios: [{ titulo: '', texto: '' }],
})

export default function useVehiculo() {
    const [formAbierto, setFormAbierto] = useState(null)
    const [recarga, setRecarga] = useState(0)
    const [datos, setDatos] = useState(iniciales())
    const [imagenes, setImagenes] = useState({})
    const [enviando, setEnviando] = useState(false) // evita enviar dos veces el mismo formulario

    const config = () => {
        const token = localStorage.getItem('token')
        return { headers: { Authorization: `Bearer ${token}` } }
    }

    // Modificar un campo del formulario
    const cambiarValor = (campo, valor) => {
        setDatos((datosAnteriores) => ({
            ...datosAnteriores,
            [campo]: valor,
        }))
    }

    // Abrir formulario para agregar un vehículo
    const abrirNuevo = () => {
        setDatos(iniciales())
        setImagenes({})
        setFormAbierto('nuevo')
    }

    // Abrir formulario para editar un vehículo
    const abrirEdicion = (auto) => {
        let textos = auto.textos_secundarios

        if (typeof textos === 'string') {
            try {
                textos = JSON.parse(textos)
            } catch {
                textos = []
            }
        }

        if (!textos || textos.length === 0) textos = [{ titulo: '', texto: '' }]

        setDatos({ ...iniciales(), ...auto, textos_secundarios: textos })
        setImagenes({})
        setFormAbierto(auto)
    }

    // Guardar la imagen elegida en un campo (cada campo admite un solo archivo)
    const cambiarImagen = (campo, archivos) => {
        if (!archivos || archivos.length === 0) return

        setImagenes((imagenesAnteriores) => ({
            ...imagenesAnteriores,
            [campo]: archivos[0],
        }))
    }

    // Modificar título o descripción de un texto secundario
    const cambiarTexto = (index, campo, valor) => {
        setDatos((datosAnteriores) => {
            const nuevosTextos = [...datosAnteriores.textos_secundarios]
            nuevosTextos[index] = { ...nuevosTextos[index], [campo]: valor }

            return { ...datosAnteriores, textos_secundarios: nuevosTextos }
        })
    }

    // Agregar un texto secundario
    const agregarTexto = () => {
        if (datos.textos_secundarios.length >= MAX_TEXTOS) return

        setDatos((datosAnteriores) => ({
            ...datosAnteriores,
            textos_secundarios: [
                ...datosAnteriores.textos_secundarios,
                { titulo: '', texto: '' },
            ],
        }))
    }

    // Eliminar un texto secundario
    const eliminarTexto = (index) => {
        setDatos((datosAnteriores) => ({
            ...datosAnteriores,
            textos_secundarios: datosAnteriores.textos_secundarios.filter(
                (_, posicion) => posicion !== index
            ),
        }))

        // Las imágenes de los textos que quedan después "suben" un lugar,
        // porque la imagen N siempre acompaña al texto N
        setImagenes((anteriores) => {
            const nuevas = { ...anteriores }

            for (let n = index + 1; n <= MAX_TEXTOS; n++) {
                const siguiente = anteriores[campoImagenTexto(n + 1)]

                if (siguiente) nuevas[campoImagenTexto(n)] = siguiente
                else delete nuevas[campoImagenTexto(n)]
            }

            return nuevas
        })
    }

    // Cerrar formulario
    const cerrarFormulario = () => {
        setFormAbierto(null)
        setDatos(iniciales())
        setImagenes({})
    }

    // Guardar vehículo en la base de datos
    const guardar = async (e) => {
        e.preventDefault()
        if (enviando) return

        const esNuevo = formAbierto === 'nuevo'
        const id = esNuevo ? null : formAbierto.vehiculo_id ?? formAbierto.id

        if (!esNuevo && !id) {
            alert('No se encontró el ID del vehículo')
            return
        }

        // FormData: así viajan juntos los datos, los textos y los archivos
        const formData = new FormData()

        // 1) Campos de texto (solo los que lee el backend)
        CAMPOS.forEach((campo) => {
            let valor = String(datos[campo] ?? '').trim()

            if (NUMERICOS.includes(campo)) valor = valor.replace(',', '.')

            formData.append(campo, valor)
        })

        // 2) Textos secundarios: una lista JSON. La posición decide qué imagen le toca.
        formData.append('textos_secundarios', JSON.stringify(datos.textos_secundarios))

        // 3) Imágenes: cada una con el nombre de campo que espera el backend
        Object.entries(imagenes).forEach(([campo, archivo]) => {
            formData.append(campo, archivo)
        })

        setEnviando(true)

        try {
            if (esNuevo) {
                await axios.post(`${URL_BASE}/vehiculos`, formData, config())
            } else {
                await axios.put(`${URL_BASE}/vehiculos/${id}`, formData, config())
            }

            alert(esNuevo ? 'Vehículo agregado correctamente' : 'Cambios guardados correctamente')
            cerrarFormulario()
            setRecarga((numeroAnterior) => numeroAnterior + 1)

        } catch (error) {
            console.error('Error al guardar:', error.response?.data || error)

            const mensaje = error.response?.data
            alert(typeof mensaje === 'string' ? mensaje : 'No se pudo guardar el vehículo')

        } finally {
            setEnviando(false)
        }
    }

    return {
        formAbierto, recarga, datos, imagenes, enviando,
        cambiarValor, abrirNuevo, abrirEdicion, cambiarImagen,
        cambiarTexto, agregarTexto, eliminarTexto, guardar, cerrarFormulario,
    }
}