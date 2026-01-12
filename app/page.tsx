'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [pin, setPin] = useState('')
  const [seccion, setSeccion] = useState('menu')
  const [ordenes, setOrdenes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
const [productos, setProductos] = useState<any[]>([]); // Agrega esto donde están los otros useState
// Función para cambiar el estado (de COTIZACION a EN TRABAJO, etc.)
const cambiarEstado = async (id: number, nuevoEstado: string) => {
  const { error } = await supabase
    .from('ordenes')
    .update({ estado: nuevoEstado, mecanico_id: user.id })
    .eq('id', id)

  if (error) alert("Error al cambiar estado")
  cargarDatos() // Esto refresca la lista automáticamente
}

// Función para cargar los productos de la bodega
const cargarProductos = async () => {
  const { data } = await supabase.from('productos').select('*')
  if (data) setProductos(data)
}
const agregarRepuesto = async (ordenId: any, productoId: any) => {
  const prod = productos.find((p: any) => p.id === parseInt(productoId))
  if (!prod || prod.stock <= 0) return alert("Sin stock")

  await supabase.from('detalles_orden').insert([{
    orden_id: ordenId,
    producto_id: productoId,
    cantidad: 1,
    precio_unitario: prod.p_venta
  }])

  await supabase.from('productos').update({ stock: prod.stock - 1 }).eq('id', productoId)
  
  alert("Repuesto agregado")
  cargarDatos()
}
  // --- SISTEMA DE LOGIN ---
  const handleLogin = async () => {
    const { data } = await supabase.from('personal').select('*').eq('pin', pin).eq('activo', true).single()
    if (data) { setUser(data); cargarDatos() } 
    else { alert("PIN Incorrecto") }
  }

  const cargarDatos = async () => {
    const { data } = await supabase.from('ordenes').select('*, vehiculos(*)').order('id', { ascending: false })
    if (data) setOrdenes(data)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 text-black">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
          <h1 className="text-3xl font-black mb-6 text-blue-900 uppercase">ALICAR</h1>
          <p className="mb-4 font-bold text-gray-500">INGRESA TU PIN DE ACCESO</p>
          <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="w-full p-4 border-2 rounded-xl text-center text-2xl mb-4" placeholder="****" />
          <button onClick={handleLogin} className="w-full bg-orange-500 text-white p-4 rounded-xl font-black text-xl hover:bg-orange-600">ENTRAR</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* HEADER */}
      <nav className="bg-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="font-black text-blue-900 text-xl italic">ALICAR APP</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase">{user.nombre} | {user.rol}</p>
        </div>
        <button onClick={() => setUser(null)} className="text-xs bg-gray-200 px-3 py-1 rounded font-bold">SALIR</button>
      </nav>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        
        {/* BOTONES DE ACCIÓN RÁPIDA */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setSeccion('nueva')} className="bg-blue-600 text-white p-4 rounded-xl font-bold shadow-lg uppercase text-sm">📥 Nueva Recepción</button>
          <button onClick={() => setSeccion('lista')} className="bg-white text-blue-600 p-4 rounded-xl font-bold shadow-lg uppercase text-sm border-2 border-blue-600">📋 Ver Órdenes</button>
        </div>

        {/* CONTENIDO DINÁMICO */}
        {seccion === 'nueva' && <FormularioRecepcion user={user} alTerminar={() => {setSeccion('lista'); cargarDatos()}} />}
        {seccion === 'lista' && <ListaOrdenes ordenes={ordenes} user={user}  cambiarEstado={cambiarEstado}  agregarRepuesto={agregarRepuesto}  productos={productos} onUpdate={cargarDatos} />}
      </div>
    </div>
  )
}

// --- COMPONENTE: FORMULARIO DE RECEPCIÓN ---
function FormularioRecepcion({ user, alTerminar }: any) {
  const [enviando, setEnviando] = useState(false)

  // AQUÍ EMPIEZA LO QUE TIENES QUE REEMPLAZAR (la función guardar)
  const guardar = async (e: any) => {
    e.preventDefault()
    setEnviando(true)
    const fd = new FormData(e.target)

    const nombreCliente = fd.get('cliente')?.toString() || ''
    const telefonoCliente = fd.get('tel')?.toString() || ''
    const placaVehiculo = fd.get('placa')?.toString().toUpperCase() || ''
    const modeloVehiculo = fd.get('modelo')?.toString() || ''
    const fallaVehiculo = fd.get('falla')?.toString() || ''

    // 1. Registrar cliente
    const { data: cliente, error: errC } = await supabase.from('clientes').insert([{ 
      nombre: nombreCliente, 
      telefono: telefonoCliente 
    }]).select().single()

    if (errC || !cliente) {
      console.error("Error Cliente:", errC)
      setEnviando(false)
      return alert("Error al crear cliente: " + errC?.message)
    }

    // 2. Registrar Vehículo
    const { data: vehiculo, error: errV } = await supabase.from('vehiculos').insert([{
      placa: placaVehiculo,
      modelo: modeloVehiculo,
      cliente_id: cliente.id
    }]).select().single()

    if (errV || !vehiculo) {
      console.error("Error Vehiculo:", errV)
      setEnviando(false)
      return alert("Error al crear vehículo: " + errV?.message)
    }

    // 3. Crear la Orden
    const { error: errO } = await supabase.from('ordenes').insert([{
      vehiculo_id: vehiculo.id,
      creado_por: user.id,
      falla_cliente: fallaVehiculo,
      estado: 'COTIZACION'
    }])

    if (errO) {
      console.error("Error Orden:", errO)
      alert("Error al crear la orden: " + errO.message)
    } else {
      alert("✅ Orden creada con éxito")
      alTerminar()
    }
    
    setEnviando(false)
  }
  // AQUÍ TERMINA LO QUE REEMPLAZAS

  return (
    // ... el resto del formulario se queda igual ...
    <form onSubmit={guardar} className="bg-white p-6 rounded-2xl shadow-md space-y-4 border-t-8 border-blue-600">
      <h2 className="font-black text-lg border-b pb-2 uppercase text-blue-800">Paso 1: Recepción del Camión</h2>
      <input name="cliente" placeholder="Nombre del Cliente" className="w-full p-3 border rounded-lg bg-gray-50 font-bold" required />
      <input name="tel" placeholder="WhatsApp (Ej: +51999...)" className="w-full p-3 border rounded-lg bg-gray-50" required />
      <div className="flex gap-2">
        <input name="placa" placeholder="Placa" className="w-1/2 p-3 border rounded-lg bg-gray-50 uppercase font-black" required />
        <input name="modelo" placeholder="Modelo (Ej: Volvo FMX)" className="w-1/2 p-3 border rounded-lg bg-gray-50" required />
      </div>
      <textarea name="falla" placeholder="¿Qué le falla al vehículo?" className="w-full p-3 border rounded-lg bg-yellow-50 h-24" required />
      <button disabled={enviando} className="w-full bg-blue-700 text-white p-4 rounded-xl font-black uppercase shadow-xl">
        {enviando ? 'Guardando...' : 'Crear Orden de Servicio'}
      </button>
    </form>
  )
}

// --- COMPONENTE: LISTA DE ÓRDENES ---
function ListaOrdenes({ ordenes, user, cambiarEstado, agregarRepuesto, productos,onUpdate }: any) {
  const actualizarEstado = async (id: number, nuevoEstado: string) => {
    await supabase.from('ordenes').update({ estado: nuevoEstado, mecanico_id: user.id }).eq('id', id)
    onUpdate()
  }

  return (
    <div className="space-y-4">
      <h2 className="font-black text-gray-400 uppercase text-xs tracking-widest">Órdenes en proceso</h2>
      {ordenes.map((o: any) => (
        <div key={o.id} className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-orange-500">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] bg-gray-800 text-white px-2 py-0.5 rounded-full font-bold">ORDEN #{o.id}</span>
              <h3 className="font-black text-lg text-blue-900 uppercase mt-1">{o.vehiculos?.placa}</h3>
            </div>
            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${o.estado === 'LISTO' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {o.estado}
            </span>
          </div>
          
         <p className="text-sm text-gray-600 mb-3 font-medium">
  <strong>Falla:</strong> {o.falla_cliente || o.falla || "Sin descripción de falla"}
</p>
          
          {/* BOTONES DE ACCIÓN */}
<div className="flex gap-2 border-t pt-3">
  {o.estado === 'COTIZACION' && (
    <button 
      onClick={() => cambiarEstado(o.id, 'EN TRABAJO')}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full font-bold"
    >
      🛠️ TOMAR PARA REPARAR
    </button>
  )}

  {o.estado === 'EN TRABAJO' && (
    <div className="w-full space-y-3">
      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
        <p className="text-xs font-bold text-yellow-700 mb-2">📦 AÑADIR REPUESTO DE BODEGA:</p>
        <select 
          onChange={(e) => agregarRepuesto(o.id, e.target.value)}
          className="w-full p-2 border rounded bg-white text-sm"
          defaultValue=""
        >
          <option value="" disabled>Seleccionar producto...</option>
          {productos.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.nombre} - S/ {p.p_venta} (Stock: {p.stock})
            </option>
          ))}
        </select>
      </div>
      
      <button 
        onClick={() => cambiarEstado(o.id, 'TERMINADO')}
        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm w-full font-bold"
      >
        ✅ FINALIZAR TRABAJO
      </button>
    </div>
  )}
</div>
        </div>
      ))}
    </div>
  )
}