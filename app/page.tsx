'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [enviando, setEnviando] = useState(false)
  const [registros, setRegistros] = useState<any[]>([])

  const cargarDatos = async () => {
    const { data } = await supabase.from('ordenes').select('*').order('created_at', { ascending: false })
    if (data) setRegistros(data)
  }

  useEffect(() => { cargarDatos() }, [])

  const guardar = async (e: any) => {
    e.preventDefault()
    setEnviando(true)
    const fd = new FormData(e.target)
    const foto = (document.getElementById('foto') as HTMLInputElement).files?.[0]
    let url = ''

    if (foto) {
      const nom = `${Date.now()}-${fd.get('placa')}.jpg`
      const { data } = await supabase.storage.from('fotos-camiones').upload(nom, foto)
      if (data) url = supabase.storage.from('fotos-camiones').getPublicUrl(nom).data.publicUrl
    }

    await supabase.from('ordenes').insert([{ 
      cliente: fd.get('cliente'), 
      placa: fd.get('placa'), 
      falla: fd.get('falla'), 
      foto_url: url 
    }])

    const msg = `*ALICAR*%0A*Cliente:* ${fd.get('cliente')}%0A*Placa:* ${fd.get('placa')}${url ? `%0A*Foto:* ${url}` : ''}`
    window.open(`https://wa.me/?text=${msg}`, '_blank')
    e.target.reset()
    setEnviando(false)
    cargarDatos()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-xl font-bold text-center mb-6 text-blue-900">ALICAR AUTOMOTRIZ</h1>
        
        <form onSubmit={guardar} className="space-y-4">
          <input name="cliente" placeholder="Cliente" className="w-full p-2 border rounded" required />
          <input name="placa" placeholder="Placa" className="w-full p-2 border rounded" required />
          <textarea name="falla" placeholder="Falla" className="w-full p-2 border rounded" required />
          <input type="file" id="foto" accept="image/*" capture="environment" className="w-full" />
          <button disabled={enviando} className="w-full bg-green-600 text-white p-3 rounded font-bold">
            {enviando ? 'Guardando...' : 'GUARDAR Y ENVIAR'}
          </button>
        </form>

        <div className="mt-10">
          <h2 className="font-bold border-b-2 mb-4">HISTORIAL RECIENTE</h2>
          <div className="space-y-4">
            {registros.map((r) => (
              <div key={r.id} className="p-3 bg-gray-50 rounded border">
                <div className="flex justify-between font-bold text-sm">
                  <span>{r.cliente}</span>
                  <span className="text-blue-600">{r.placa}</span>
                </div>
                <p className="text-sm text-gray-600 italic">{r.falla}</p>
                {r.foto_url && <a href={r.foto_url} target="_blank" className="text-xs text-blue-500 underline">Ver Foto</a>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}