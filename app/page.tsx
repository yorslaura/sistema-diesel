"use client";

import React, { useState } from 'react';

// Definimos qué información tiene cada página para que TypeScript no se queje
interface PaginaNarrativa {
  dia?: string;
  t: string;
  c: string;
  bg: string;
  texto: string;
  musica?: string;
}

const LibroJudith = () => {
  const [pagina, setPagina] = useState(0);
  const [final, setFinal] = useState(false);

  // 1. Definimos los momentos clave de tu historia
  const hitos = [
    { d: 0, t: "04 Dic: El Inicio", c: "Todo empezó en un juego. Entre pixeles y risas, sin saber que estaba encontrando al amor de mi vida.", bg: "#ffebf0", txt: "#d81b60" },
    { d: 10, t: "14 Dic: Mi niño interior", c: "Ese día te amé sin barreras. Mi vida tuvo color y sonaba Noah Cyrus - Again.", bg: "#fce4ec", txt: "#ad1457", m: "https://open.spotify.com/track/1ST9R0LwSndG06mX6f58pI" },
    { d: 27, t: "31 Dic: Año Nuevo", c: "Te vi divertirte y me sentí bien. Quería que cada día del nuevo año fuera a tu lado.", bg: "#f8bbd0", txt: "#880e4f" },
    { d: 40, t: "Enero: Los Muros", c: "Los muros invisibles se hicieron notorios. Grité tu nombre en la distancia: seguiré avanzando si me lo permites.", bg: "#eceff1", txt: "#455a64" },
    { d: 50, t: "La Fragilidad", c: "Me quité capas para elevarme. Sonaba 'Sol' de William. Mi error fue ser tan frágil que todo me afectaba.", bg: "#cfd8dc", txt: "#37474f", m: "https://open.spotify.com/track/1uL0A4P7R33Q8P4N0X2Q3G" },
    { d: 65, t: "Febrero: La Armadura", c: "Recordé tu risa y decidí ponerme una armadura fuerte. Ya no soy frágil, ahora me protejo para llegar a ti.", bg: "#b39ddb", txt: "#311b92" },
    { d: 71, t: "La Niebla", c: "Hoy hay una niebla espesa. No te oigo, pero mi armadura resiste. Solo quiero salir y correr hacia ti.", bg: "#9575cd", txt: "#ffffff" }
  ];

  // 2. Esta es la función que corregí para que no te dé el error de 'index'
  const obtenerContenido = (index: number): PaginaNarrativa => {
    // Buscamos si el día actual es un hito importante
    const hito = hitos.find(h => h.d === index);
    if (hito) {
      return { dia: hito.t.split(':')[0], t: hito.t.split(':')[1] || hito.t, c: hito.c, bg: hito.bg, texto: hito.txt, musica: hito.m };
    }

    // Relleno dinámico para que no se repitan las páginas
    if (index < 27) {
      return { t: `Día ${index + 1}`, c: "Seguía flotando en un camino hacia ti, atravesando muros opacos con facilidad.", bg: "#ffebf0", texto: "#d81b60" };
    } else if (index < 60) {
      return { t: `Día ${index + 1}`, c: "En el laberinto, buscando tu brillo. Me quité pesos de encima para alcanzarte.", bg: "#eceff1", texto: "#455a64" };
    } else {
      return { t: `Día ${index + 1}`, c: "Avanzando en silencio. Mi armadura es pesada, pero mi mente se hace fuerte con tus recuerdos.", bg: "#b39ddb", texto: "#311b92" };
    }
  };

  const p = obtenerContenido(pagina);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: p.bg, 
      transition: 'all 0.8s ease', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '20px',
      fontFamily: 'serif'
    }}>
      {!final ? (
        <div style={{
          width: '100%', maxWidth: '420px', backgroundColor: '#fff', borderRadius: '15px 40px 40px 15px', 
          padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', borderLeft: `12px solid ${p.texto}`,
          position: 'relative'
        }}>
          <span style={{ color: '#aaa', fontSize: '0.9rem' }}>{p.dia || `Día ${pagina + 1}`}</span>
          <h2 style={{ color: p.texto, marginTop: '10px' }}>{p.t}</h2>
          <p style={{ lineHeight: '1.8', color: '#444', fontStyle: 'italic', minHeight: '150px' }}>
            "{p.c}"
          </p>
          
          {p.musica && (
            <a href={p.musica} target="_blank" rel="noreferrer" style={{ color: '#1DB954', fontSize: '0.8rem', textDecoration: 'none', display: 'block', marginBottom: '20px' }}>
              🎵 Escuchar canción del día
            </a>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 0} style={btn}>Atrás</button>
            <span style={{ fontSize: '0.7rem', color: '#ccc' }}>{pagina + 1} / 73</span>
            <button 
              onClick={() => pagina === 72 ? setFinal(true) : setPagina(pagina + 1)} 
              style={{ ...btn, backgroundColor: p.texto, color: '#fff', border: 'none' }}
            >
              {pagina === 72 ? "Abrir Corazón" : "Siguiente"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ 
          maxWidth: '550px', backgroundColor: '#fff', padding: '50px', borderRadius: '30px', 
          textAlign: 'center', boxShadow: '0 10px 50px rgba(216, 27, 96, 0.2)', animation: 'aparecer 1s' 
        }}>
          <h1 style={{ color: '#d81b60' }}>14 de Febrero</h1>
          <p style={{ fontSize: '1.2rem', color: '#333' }}>
            <strong>Judith,</strong> eres la persona más valiente y hermosa que conozco.
          </p>
          <p style={{ margin: '25px 0', color: '#555', lineHeight: '1.6' }}>
            No quiero que mis sentimientos sean "quejas". Solo quiero que me mires, que me des mi lugar. Esta armadura es pesada, pero la llevo por ti. ¿Soy el hombre que esperas?
          </p>
          <h2 style={{ color: '#ff4d6d' }}>Te amo demasiado, mi señora esposa ❤️</h2>
          
          <div style={{ marginTop: '40px', padding: '25px', border: '2px dashed #ffb6c1', borderRadius: '15px', backgroundColor: '#fff5f7' }}>
            <p>🎁 <b>Tengo algo más para ti...</b></p>
            <button onClick={() => alert("¡Sorpresa! (Aquí puedes poner tu regalo)")} style={btnFinal}>VER SORPRESA :3</button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes aparecer { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

const btn = { padding: '8px 18px', border: '1px solid #eee', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem' };
const btnFinal = { padding: '15px 30px', backgroundColor: '#ff4d6d', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' };

export default LibroJudith;