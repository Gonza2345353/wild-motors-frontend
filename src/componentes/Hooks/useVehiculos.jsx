import { useState } from 'react'
import axios from 'axios'
const URL_BASE = 'http://localhost:3000/api'
const MAX_TEXTOS = 3
const EXTENSIONES_PERMITIDAS = ['png', 'jpg', 'jpeg', 'webp']
const MAX_MB = 5

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
    const [enviando, setEnviando] = useState(false)

    const config = {
        headers: {
            Authorization: `${localStorage.getItem('token')}`
        }
    }

    const cambiarValor = (campo, valor) => {
        setDatos((datosAnteriores) => ({
            ...datosAnteriores,
            [campo]: valor,
        }))
    }

    const abrirNuevo = () => {
        setDatos(iniciales())
        setImagenes({})
        setFormAbierto('nuevo')
    }

    // Abrir formulario para editar: los textos vienen en la lista "textos" que devuelve el backend
    const abrirEdicion = (auto) => {
        const textos = auto.textos || []

        const principal = textos.find((t) => t.tipo === 'principal')

        // Cada secundario guarda también la foto que ya tenía (url_imagen)
        const secundarios = textos
            .filter((t) => t.tipo === 'secundario')
            .map((t) => ({ titulo: t.titulo, texto: t.descripcion, url_imagen: t.url_imagen }))

        setDatos({
            ...iniciales(),
            ...auto,
            titulo_principal: principal ? principal.titulo : '',
            texto_principal: principal ? principal.descripcion : '',
            textos_secundarios: secundarios.length > 0 ? secundarios : [{ titulo: '', texto: '' }],
        })
        setImagenes({})
        setFormAbierto(auto)
    }

    // Guardar la imagen elegida (solo png, jpg, jpeg o webp, de hasta 5 MB)
    const cambiarImagen = (campo, archivos) => {
        const archivo = archivos[0]

        if (!archivo) return

        const extension = archivo.name.split('.').pop().toLowerCase()

        if (!EXTENSIONES_PERMITIDAS.includes(extension)) {
            alert('Solo se permiten imágenes png, jpg, jpeg o webp')
            return
        }

        if (archivo.size > MAX_MB * 1024 * 1024) {
            alert(`La imagen no puede superar los ${MAX_MB} MB`)
            return
        }

        setImagenes((imagenesAnteriores) => ({
            ...imagenesAnteriores,
            [campo]: archivo,
        }))
    }

    const cambiarTexto = (index, campo, valor) => {
        setDatos((datosAnteriores) => {
            const nuevosTextos = [...datosAnteriores.textos_secundarios]
            nuevosTextos[index] = { ...nuevosTextos[index], [campo]: valor }

            return { ...datosAnteriores, textos_secundarios: nuevosTextos }
        })
    }

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

    const cerrarFormulario = () => {
        setFormAbierto(null)
        setDatos(iniciales())
        setImagenes({})
    }

    const guardar = async (e) => {
        e.preventDefault()
        if (enviando) return

        const esNuevo = formAbierto === 'nuevo'
        const id = esNuevo ? null : formAbierto.vehiculo_id ?? formAbierto.id

        const formData = new FormData()

        CAMPOS.forEach((campo) => {
            let valor = String(datos[campo] ?? '').trim()

            if (NUMERICOS.includes(campo)) valor = valor.replace(',', '.')

            formData.append(campo, valor)
        })

        // Los textos secundarios viajan como JSON (con la url de la foto que ya tenían)
        formData.append('textos_secundarios', JSON.stringify(datos.textos_secundarios))

        Object.entries(imagenes).forEach(([campo, archivo]) => {
            formData.append(campo, archivo)
        })

        setEnviando(true)

        try {
            if (esNuevo) {
                await axios.post(`${URL_BASE}/vehiculos`, formData, config)
            } else {
                await axios.put(`${URL_BASE}/vehiculos/${id}`, formData, config)
            }

            alert(esNuevo ? 'Vehículo agregado correctamente' : 'Cambios guardados correctamente')
            cerrarFormulario()
            setRecarga((numeroAnterior) => numeroAnterior + 1)

        } catch (error) {
            console.error('Error al guardar:', error)
            alert('No se pudo guardar el vehículo')

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
