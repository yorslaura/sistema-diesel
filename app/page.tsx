'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// CONFIGURACIÓN DE SUPABASE (Asegúrate de que estas variables sean las tuyas)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  // 1. ESTADOS (DATOS)
  const [user, setUser] = useState<any>(null)
  const [pin, setPin] = useState('')
  const [seccion, setSeccion] = useState('recepcion') // 'recepcion' o 'bodega'
  const [ordenes, setOrdenes] = useState<any[]>([])
  const [productos, setProductos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  
  // Formulario para nuevos productos en bodega
  const [prodForm, setProdForm] = useState({ nombre: '', p_venta: 0, stock: 0 })

  // 2. FUNCIONES DE CARGA
  const cargarDatos = async () => {
    setLoading(true)
    const { data: ords } = await supabase.from('ordenes').select('*').order('created_at', { ascending: false })
    const { data: prods } = await supabase.from('productos').select('*').order('nombre')
    if (ords) setOrdenes(ords)
    if (prods) setProductos(prods)
    setLoading(false)
  }

  useEffect(() => {
    if (user) cargarDatos()
  }, [user])

  // 3. LOGICA DE NEGOCIO
  const handleLogin = async () => {
    const { data, error } = await supabase.from('personal').select('*').eq('pin', pin).single()
    if (data) setUser(data)
    else alert("PIN Incorrecto")
  }

  const cambiarEstado = async (id: number, nuevoEstado: string) => {
    await supabase.from('ordenes').update({ estado: nuevoEstado, mecanico_id: user.id }).eq('id', id)
    cargarDatos()
  }

  const guardarProducto = async () => {
    if (!prodForm.nombre || prodForm.p_venta <= 0) return alert("Completa los datos")
    await supabase.from('productos').insert([prodForm])
    setProdForm({ nombre: '', p_venta: 0, stock: 0 })
    cargarDatos()
    alert("Producto guardado")
  }

  const agregarRepuesto = async (ordenId: string, productoId: string) => {
    const prod = productos.find((p: any) => p.id === parseInt(productoId))
    if (!prod || prod.stock <= 0) return alert("Sin stock disponible")

    // Insertar en detalles
    await supabase.from('detalles_orden').insert([{
      orden_id: ordenId,
      producto_id: productoId,
      cantidad: 1,
      precio_unitario: prod.p_venta
    }])

    // Restar stock
    await supabase.from('productos').update({ stock: prod.stock - 1 }).eq('id', productoId)

    // Actualizar total de la orden
    const ordenActual = ordenes.find((o: any) => o.id === ordenId)
    await supabase.from('ordenes').update({ total_orden: (ordenActual.total_orden || 0) + prod.p_venta }).eq('id', ordenId)

    alert("Repuesto añadido")
    cargarDatos()
  }

  // --- VISTA DE LOGIN ---
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">🚛 Sistema Diesel</h1>
          <input 
            type="password" placeholder="Ingresa tu PIN" 
            className="w-full p-4 border rounded-xl mb-4 text-center text-2xl"
            value={pin} onChange={(e) => setPin(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold">ENTRAR</button>
        </div>
      </div>
    )
  }

  // --- VISTA PRINCIPAL (LOGUEADO) ---
  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      
      {/* NAVEGACIÓN PRINCIPAL */}
      <div className="flex gap-2 mb-6 bg-white p-2 rounded-2xl shadow-sm">
        <button 
          onClick={() => setSeccion('recepcion')}
          className={`flex-1 p-3 rounded-xl font-bold transition ${seccion === 'recepcion' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
        >
          🛠️ Taller
        </button>
        <button 
          onClick={() => setSeccion('bodega')}
          className={`flex-1 p-3 rounded-xl font-bold transition ${seccion === 'bodega' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
        >
          📦 Bodega
        </button>
        <button onClick={() => setUser(null)} className="p-3 text-red-500 font-bold">Salir</button>
      </div>

      {/* SECCIÓN 1: TALLER Y RECEPCIÓN */}
      {seccion === 'recepcion' && (
        <div className="space-y-6">
          <RegistroVehiculo onUpdate={cargarDatos} />
          <ListaOrdenes 
            ordenes={ordenes} 
            user={user} 
            cambiarEstado={cambiarEstado} 
            agregarRepuesto={agregarRepuesto} 
            productos={productos}
          />
        </div>
      )}

      {/* SECCIÓN 2: BODEGA e INVENTARIO */}
      {seccion === 'bodega' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold mb-4">➕ Nuevo Producto</h2>
            <div className="grid gap-3">
              <input 
                type="text" placeholder="Nombre (Ej: Filtro de Aceite)" 
                className="p-3 border rounded-xl"
                value={prodForm.nombre} onChange={(e) => setProdForm({...prodForm, nombre: e.target.value})}
              />
              <div className="flex gap-2">
                <input 
                  type="number" placeholder="Precio S/" 
                  className="flex-1 p-3 border rounded-xl"
                  value={prodForm.p_venta || ''} onChange={(e) => setProdForm({...prodForm, p_venta: parseFloat(e.target.value)})}
                />
                <input 
                  type="number" placeholder="Stock" 
                  className="flex-1 p-3 border rounded-xl"
                  value={prodForm.stock || ''} onChange={(e) => setProdForm({...prodForm, stock: parseInt(e.target.value)})}
                />
              </div>
              <button onClick={guardarProducto} className="bg-green-600 text-white p-3 rounded-xl font-bold">GUARDAR EN BODEGA</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="p-4">Producto</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4 text-center">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td className="p-4 font-bold">{p.nombre}</td>
                    <td className="p-4">S/ {p.p_venta}</td>
                    <td className={`p-4 text-center font-bold ${p.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  )
}

// --- SUB-COMPONENTE: REGISTRO DE VEHÍCULO ---
function RegistroVehiculo({ onUpdate }: any) {
  const [form, setForm] = useState({ 
    placa: '', 
    modelo: '', 
    falla: '', 
    nombre_cliente: '', 
    telefono: '' 
  })

  const enviar = async () => {
    // Validamos que al menos los datos básicos estén llenos
    if (!form.placa || !form.falla || !form.nombre_cliente) return alert("Faltan datos (Placa, Cliente y Falla son obligatorios)")
    
    const { error } = await supabase.from('ordenes').insert([form])
    if (!error) {
      setForm({ placa: '', modelo: '', falla: '', nombre_cliente: '', telefono: '' })
      onUpdate()
      alert("✅ Vehículo y Cliente registrados")
    } else {
      console.error(error)
      alert("Error al guardar. Revisa que las columnas existan en Supabase.")
    }
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border-t-4 border-blue-600">
      <h2 className="text-lg font-bold mb-4 text-gray-700">📋 Recepción de Camión</h2>
      <div className="grid grid-cols-2 gap-3">
        <input 
          placeholder="PLACA" className="p-3 border rounded-xl uppercase font-mono text-lg bg-gray-50"
          value={form.placa} onChange={(e) => setForm({...form, placa: e.target.value.toUpperCase()})}
        />
        <input 
          placeholder="MODELO" className="p-3 border rounded-xl"
          value={form.modelo} onChange={(e) => setForm({...form, modelo: e.target.value})}
        />
        <input 
          placeholder="NOMBRE DEL CLIENTE" className="p-3 border rounded-xl col-span-2"
          value={form.nombre_cliente} onChange={(e) => setForm({...form, nombre_cliente: e.target.value})}
        />
        <input 
          placeholder="TELÉFONO" className="p-3 border rounded-xl col-span-2"
          value={form.telefono} onChange={(e) => setForm({...form, telefono: e.target.value})}
        />
        <textarea 
          placeholder="FALLA REPORTADA" className="w-full p-3 border rounded-xl h-20 col-span-2"
          value={form.falla} onChange={(e) => setForm({...form, falla: e.target.value})}
        />
        <button onClick={enviar} className="col-span-2 bg-blue-600 text-white p-4 rounded-xl font-bold shadow-lg active:scale-95 transition">
          REGISTRAR ENTRADA
        </button>
      </div>
    </div>
  )
}

// --- SUB-COMPONENTE: LISTA DE ÓRDENES ---
function ListaOrdenes({ ordenes, user, cambiarEstado, agregarRepuesto, productos }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-700">🛠️ Órdenes en Curso</h2>
      {ordenes.map((o: any) => (
        <div key={o.id} className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-blue-500">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">ORDEN #{o.id.toString().slice(-4)}</span>
              <h3 className="text-2xl font-black text-gray-800">{o.placa}</h3>
              {/* AQUÍ SE MUESTRA EL CLIENTE */}
              <p className="text-sm font-bold text-blue-800 uppercase">{o.nombre_cliente || 'Sin nombre'}</p>
              <p className="text-xs text-gray-500">{o.modelo} • 📞 {o.telefono || 'Sin tel.'}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${o.estado === 'EN TRABAJO' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100'}`}>
              {o.estado}
            </span>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-xl mb-4 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Falla Reportada:</p>
            <p className="text-gray-700 font-medium">{o.falla}</p>
          </div>

          <div className="border-t pt-4">
            {o.estado === 'COTIZACION' && (
              <button 
                onClick={() => cambiarEstado(o.id, 'EN TRABAJO')}
                className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold"
              >
                🛠️ COMENZAR TRABAJO
              </button>
            )}

            {o.estado === 'EN TRABAJO' && (
              <div className="space-y-3">
                {/* Selector de repuestos y botón de finalizar (Igual que antes) */}
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-700 mb-2">📦 AÑADIR REPUESTO:</p>
                  <select 
                    className="w-full p-2 border rounded-lg bg-white"
                    onChange={(e) => agregarRepuesto(o.id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>Seleccionar de bodega...</option>
                    {productos.map((p: any) => (
                      <option key={p.id} value={p.id}>{p.nombre} (S/ {p.p_venta} - Stock: {p.stock})</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={() => cambiarEstado(o.id, 'TERMINADO')}
                  className="w-full bg-green-600 text-white p-3 rounded-xl font-bold"
                >
                  ✅ FINALIZAR (Total: S/ {o.total_orden || 0})
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}