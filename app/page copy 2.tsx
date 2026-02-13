import React, { useState, useEffect } from 'react';

const LibroAmor = () => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [mensajeFinal, setMensajeFinal] = useState(false);

  // Música mencionada
  const canciones = {
    again: "https://open.spotify.com/intl-es/track/2SST997ZgTisv0897yvGZ2", // Noah Cyrus
    sol: "https://open.spotify.com/intl-es/track/1P6R2hXqQ8I2xLzYfNfO0M"    // Sol - William
  };

  // Generación de los textos para las 73 páginas
  const generarPaginas = () => {
    const paginas = [];
    
    for (let i = 1; i <= 73; i++) {
      let contenido = "";
      let titulo = `Día ${i}`;
      // Estilo base para las páginas normales (cálido)
      let estiloPagina = { color: '#444', backgroundColor: '#fff' };

      // LÓGICA DE NARRACIÓN Y ESTILO SEGÚN EL PERIODO
      if (i === 1) {
        titulo = "4 de Diciembre: El Inicio";
        contenido = "Todo empezó en un juego. Quién diría que entre pixeles encontraría el latido que me faltaba. Ese primer encuentro fue la semilla de todo lo que somos hoy.";
      } else if (i < 10) {
        contenido = "Aún no había una conexión profunda, pero mi alma ya te reconocía. Sentía que te amaba antes de entender por qué. Eras ese misterio que no quería dejar de resolver.";
      } else if (i === 11) {
        titulo = "14 de Diciembre: El Color";
        contenido = "Empecé a conocerte más y dejé que mi niño interior saliera para amarte sin reproches ni barreras. Mi vida se pintó de un tono hermoso. Dale play a esto: Noah Cyrus - Again.";
      } else if (i > 11 && i < 28) {
        contenido = "Empecé a flotar en un camino hacia ti. Noté muros opacos, casi invisibles, pero no les di importancia. Atravesarlos era fácil porque mi meta eras tú.";
      } else if (i === 28) {
        titulo = "31 de Diciembre: Fin de Año";
        contenido = "Pasamos con nuestras familias, pero mi mente estaba contigo. Verte feliz me hacía bien. Te deseé un feliz año sabiendo que quería cada día de este nuevo ciclo a tu lado.";
      } 
      
      // --- PERIODO DE ENERO (CAMBIO DE COLOR A GRIS/NIEBLA) ---
      else if (i > 28 && i < 60) {
        // Cambiamos el estilo solo para estas páginas
        estiloPagina = { color: '#333', backgroundColor: '#e0e0e0' }; 
        
        if (i < 45) {
            titulo = "Enero: Los Muros Notorios";
            contenido = "Los muros que antes eran invisibles se hicieron reales. Me impedían el paso, pero te grité desde la distancia que seguiría avanzando mientras tú me lo permitieras.";
        } else {
            contenido = "Me volví frágil para elevarme sobre los muros. Fue mi error, quizá, pero quería verte. Sonaba 'Sol' de William y yo seguía quitándome capas para flotar más alto, aunque doliera el frío de esta niebla.";
        }
      } 
      // -------------------------------------------------------

      else if (i >= 60 && i < 70) {
        titulo = "Febrero: La Armadura";
        contenido = "Escuché tu voz y recordé la arruguita de tu rostro al reír. Para sobrevivir al laberinto de espinas, me puse una armadura pesada. Ya no soy tan frágil, ahora me protejo para llegar a ti.";
      } else {
        titulo = "Días Recientes: La Niebla y el Silencio";
        contenido = "Hay una niebla espesa y un silencio frío. Mi armadura es resistente, pero pesa. No escuchas mis quejas porque las palabras no salen, pero aquí sigo, mirándote en mis recuerdos, buscando la salida hacia ti.";
      }

      paginas.push({ titulo, contenido, estiloPagina, dia: i });
    }
    return paginas;
  };

  const listaPaginas = generarPaginas();
  const paginaActualData = listaPaginas[paginaActual];

  const irSiguiente = () => {
    if (paginaActual < listaPaginas.length - 1) {
      setPaginaActual(paginaActual + 1);
    } else {
      setMensajeFinal(true);
    }
  };

  const irAtras = () => {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
      setMensajeFinal(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      // El fondo general también cambia un poco si es una página "gris"
      backgroundColor: paginaActualData.estiloPagina.backgroundColor === '#e0e0e0' ? '#cfd8dc' : '#fce4ec', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Georgia', serif",
      transition: 'background-color 0.5s ease'
    }}>
      
      {!mensajeFinal ? (
        <div style={{
          width: '100%',
          maxWidth: '400px',
          // Aquí se aplica el color de fondo de la página (blanco o gris)
          backgroundColor: paginaActualData.estiloPagina.backgroundColor,
          padding: '40px',
          borderRadius: '10px 50px 50px 10px',
          boxShadow: '20px 20px 60px rgba(0,0,0,0.1), -20px -20px 60px rgba(255,255,255,0.5)',
          position: 'relative',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'background-color 0.5s ease'
        }}>
          <div>
            <h2 style={{ color: '#d81b60', textAlign: 'center' }}>{paginaActualData.titulo}</h2>
            <hr style={{ border: '0.5px solid #f8bbd0', opacity: 0.5 }} />
            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.6', 
              // Se aplica el color de texto (más oscuro en fondo gris)
              color: paginaActualData.estiloPagina.color, 
              fontStyle: 'italic',
              marginTop: '30px' 
            }}>
              "{paginaActualData.contenido}"
            </p>
            
            {/* Links de música dinámicos */}
            {paginaActual === 10 && <a href={canciones.again} target="_blank" rel="noreferrer" style={{color: '#1DB954', fontSize: '0.9rem', display:'block', marginTop:'20px'}}>🎵 Escuchar Again - Noah Cyrus</a>}
            {paginaActual === 44 && <a href={canciones.sol} target="_blank" rel="noreferrer" style={{color: '#1DB954', fontSize: '0.9rem', display:'block', marginTop:'20px'}}>🎵 Escuchar Sol - William</a>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <button onClick={irAtras} disabled={paginaActual === 0} style={btnEstilo}>Anterior</button>
            <span style={{ fontSize: '0.8rem', color: '#aaa', alignSelf:'center' }}>Pág {paginaActual + 1} de 73</span>
            <button onClick={irSiguiente} style={btnEstilo}>Siguiente</button>
          </div>
        </div>
      ) : (
        /* MENSAJE FINAL DEL 14 DE FEBRERO */
        <div style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          animation: 'fadeIn 1.5s'
        }}>
          <h1 style={{ color: '#d81b60' }}>14 de Febrero</h1>
          <p style={{ fontSize: '1.2rem', color: '#333', lineHeight: '1.5' }}>
            <strong>Judith,</strong> eres la persona más valiente que conocí, la más responsable y hermosa del alma.
          </p>
          <p style={{ color: '#555', lineHeight: '1.5' }}>
            No me enamoré de un camino fácil, me encanta este camino contigo. Pero necesito que me mires, que me des mi lugar sin tener que pedirlo. Quiero que esa niebla se vaya con el suspiro de tus labios.
          </p>
          <h3 style={{ color: '#ff4d6d', marginTop: '25px' }}>¿Eres la mujer que espero? Dame una señal para seguir intentándolo...</h3>
          <p style={{ fontSize: '1.8rem', margin: '20px 0' }}>Te amo demasiado. ❤️</p>
          
          <div style={{ marginTop: '30px', padding: '20px', border: '2px dashed #ffb6c1', borderRadius: '10px', backgroundColor: '#fff0f5' }}>
            <p style={{fontSize: '1.1rem'}}>🎁 <b>Tengo una sorpresa para ti...</b></p>
            <button onClick={() => alert("¡Aquí pones tu sorpresa real! (Puede ser una foto, un video, o lo que tengas planeado)")} style={{...btnEstilo, backgroundColor: '#ff4d6d', color: 'white', border: 'none', padding: '12px 25px', fontSize: '1rem'}}>Ver Sorpresa</button>
          </div>
          
          <button onClick={() => setMensajeFinal(false)} style={{ marginTop: '30px', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#999' }}>Regresar al libro</button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        button:disabled { opacity: 0.3; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

const btnEstilo = {
  padding: '10px 20px',
  borderRadius: '25px',
  border: '1px solid #f8bbd0',
  backgroundColor: '#fff',
  cursor: 'pointer',
  transition: '0.3s',
  fontWeight: 'bold',
  color: '#d81b60'
};

export default LibroAmor;