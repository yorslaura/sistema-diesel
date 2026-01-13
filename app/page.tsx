'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [pin, setPin] = useState('')
  const [seccion, setSeccion] = useState('recepcion')
  const [ordenes, setOrdenes] = useState<any[]>([])
  const [productos, setProductos] = useState<any[]>([])
  const [clientes, setClientes] = useState<any[]>([]) // <-- Nuevo estado para clientes
  const [loading, setLoading] = useState(false)
  const [prodForm, setProdForm] = useState({ nombre: '', p_venta: 0, stock: 0 })

  const cargarDatos = async () => {
    setLoading(true)
    // Traemos órdenes y "jalamos" los datos del cliente conectado por FK
    const { data: ords } = await supabase
      .from('ordenes')
      .select('*, clientes(nombre, telefono, empresa)') 
      .order('created_at', { ascending: false })

    const { data: prods } = await supabase.from('productos').select('*').order('nombre')
    const { data: clis } = await supabase.from('clientes').select('*').order('nombre')

    if (ords) setOrdenes(ords)
    if (prods) setProductos(prods)
    if (clis) setClientes(clis)
    setLoading(false)
  }

  useEffect(() => {
    if (user) cargarDatos()
  }, [user])

  const handleLogin = async () => {
    const { data } = await supabase.from('personal').select('*').eq('pin', pin).single()
    if (data) setUser(data)
    else alert("PIN Incorrecto")
  }

  const cambiarEstado = async (id: number, nuevoEstado: string) => {
    await supabase.from('ordenes').update({ estado: nuevoEstado, mecanico_id: user.id }).eq('id', id)
    cargarDatos()
  }

  const agregarRepuesto = async (ordenId: string, productoId: string) => {
    const prod = productos.find((p: any) => p.id === parseInt(productoId))
    if (!prod || prod.stock <= 0) return alert("Sin stock")
    
    await supabase.from('detalles_orden').insert([{ orden_id: ordenId, producto_id: productoId, cantidad: 1, precio_unitario: prod.p_venta }])
    await supabase.from('productos').update({ stock: prod.stock - 1 }).eq('id', productoId)
    
    const ordenActual = ordenes.find((o: any) => o.id === ordenId)
    await supabase.from('ordenes').update({ total_orden: (ordenActual.total_orden || 0) + prod.p_venta }).eq('id', ordenId)
    
    alert("Repuesto agregado")
    cargarDatos()
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">🚛 Sistema Diesel</h1>
        <input 
          type="password" placeholder="PIN" className="p-4 border rounded-xl mb-4 text-center text-2xl w-full max-w-xs"
          value={pin} onChange={(e) => setPin(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white p-4 rounded-xl font-bold w-full max-w-xs">ENTRAR</button>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* MENU DE NAVEGACIÓN */}
      <div className="flex gap-2 mb-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-200">
        <button onClick={() => setSeccion('recepcion')} className={`flex-1 p-3 rounded-xl font-bold ${seccion === 'recepcion' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>🛠️ Taller</button>
        <button onClick={() => setSeccion('bodega')} className={`flex-1 p-3 rounded-xl font-bold ${seccion === 'bodega' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>📦 Bodega</button>
        <button onClick={() => setUser(null)} className="p-3 text-red-500 font-bold">Salir</button>
      </div>

      {seccion === 'recepcion' && (
        <div className="space-y-6">
          <RegistroVehiculo clientes={clientes} onUpdate={cargarDatos} />
          <ListaOrdenes 
            ordenes={ordenes} 
            user={user} 
            cambiarEstado={cambiarEstado} 
            agregarRepuesto={agregarRepuesto} 
            productos={productos} 
          />
        </div>
      )}

      {seccion === 'bodega' && (
        <div className="space-y-6">
          {/* Aquí va el formulario de bodega que ya teníamos */}
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
             <h2 className="font-bold mb-4">Añadir Producto</h2>
             <input placeholder="Nombre" className="w-full p-2 border rounded-lg mb-2" value={prodForm.nombre} onChange={e => setProdForm({...prodForm, nombre: e.target.value})} />
             <div className="flex gap-2 mb-2">
               <input type="number" placeholder="Precio" className="w-1/2 p-2 border rounded-lg" onChange={e => setProdForm({...prodForm, p_venta: parseFloat(e.target.value)})} />
               <input type="number" placeholder="Stock" className="w-1/2 p-2 border rounded-lg" onChange={e => setProdForm({...prodForm, stock: parseInt(e.target.value)})} />
             </div>
             <button onClick={async () => { await supabase.from('productos').insert([prodForm]); cargarDatos(); setProdForm({nombre:'', p_venta:0, stock:0}); }} className="w-full bg-green-600 text-white p-2 rounded-lg">Guardar</button>
          </div>
          {/* Tabla de productos */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100">
                <tr><th className="p-3">Producto</th><th className="p-3">S/</th><th className="p-3">Stock</th></tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3 font-bold">{p.nombre}</td>
                    <td className="p-3">{p.p_venta}</td>
                    <td className="p-3 font-bold text-blue-600">{p.stock}</td>
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

function RegistroVehiculo({ clientes, onUpdate }: any) {
  const [form, setForm] = useState({ placa: '', modelo: '', falla: '', cliente_id: '' })

  const enviar = async () => {
    if (!form.placa || !form.cliente_id) return alert("Falta Placa o Cliente")
    const { error } = await supabase.from('ordenes').insert([form])
    if (!error) { setForm({ placa: '', modelo: '', falla: '', cliente_id: '' }); onUpdate(); alert("Registrado"); }
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
      <h2 className="font-bold mb-4 text-gray-700">📋 Recepción</h2>
      <div className="grid grid-cols-2 gap-3">
        <select 
          className="col-span-2 p-3 border rounded-xl bg-gray-50 font-bold"
          value={form.cliente_id} onChange={e => setForm({...form, cliente_id: e.target.value})}
        >
          <option value="">-- SELECCIONAR CLIENTE --</option>
          {clientes.map((c: any) => (
            <option key={c.id} value={c.id}>{c.nombre} {c.empresa ? `(${c.empresa})` : ''}</option>
          ))}
        </select>
        <input placeholder="PLACA" className="p-3 border rounded-xl uppercase font-mono" value={form.placa} onChange={e => setForm({...form, placa: e.target.value.toUpperCase()})} />
        <input placeholder="MODELO" className="p-3 border rounded-xl" value={form.modelo} onChange={e => setForm({...form, modelo: e.target.value})} />
        <textarea placeholder="FALLA" className="col-span-2 p-3 border rounded-xl h-20" value={form.falla} onChange={e => setForm({...form, falla: e.target.value})} />
        <button onClick={enviar} className="col-span-2 bg-blue-600 text-white p-3 rounded-xl font-bold">REGISTRAR</button>
      </div>
    </div>
  )
}

function ListaOrdenes({ ordenes, user, cambiarEstado, agregarRepuesto, productos }: any) {
  return (
    <div className="space-y-4">
      {ordenes.map((o: any) => (
        <div key={o.id} className="bg-white p-4 rounded-2xl shadow-md border-l-8 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-black">{o.placa}</h3>
              {/* Aquí mostramos el nombre del cliente que viene del FK */}
              <p className="text-sm font-bold text-blue-700 uppercase">{o.clientes?.nombre || 'Sin Cliente'}</p>
              <p className="text-xs text-gray-500">📞 {o.clientes?.telefono}</p>
            </div>
            <span className="text-[10px] bg-gray-100 p-1 rounded font-bold">{o.estado}</span>
          </div>
          <div className="mt-2 text-sm bg-gray-50 p-2 rounded">{o.falla}</div>
          
          <div className="mt-4 border-t pt-3">
            {o.estado === 'COTIZACION' && <button onClick={() => cambiarEstado(o.id, 'EN TRABAJO')} className="w-full bg-blue-600 text-white p-2 rounded-lg font-bold">EMPEZAR</button>}
            {o.estado === 'EN TRABAJO' && (
              <div className="space-y-2">
                <select className="w-full p-2 border rounded-lg text-sm" onChange={e => agregarRepuesto(o.id, e.target.value)} defaultValue="">
                  <option value="" disabled>+ Repuesto...</option>
                  {productos.map((p: any) => <option key={p.id} value={p.id}>{p.nombre} (S/ {p.p_venta})</option>)}
                </select>
                <button onClick={() => cambiarEstado(o.id, 'TERMINADO')} className="w-full bg-green-600 text-white p-2 rounded-lg font-bold">FINALIZAR (S/ {o.total_orden || 0})</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}