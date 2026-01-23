'use client'
import React, { useState, useEffect } from 'react'

// --- COMPONENTE BASE DE PÁGINA (El marco bonito) ---
const PageContainer = ({ children, pageNumber, isCover = false }: { children: React.ReactNode, pageNumber: number, isCover?: boolean }) => {
  // Estilo diferente para páginas pares e impares para simular un libro abierto
  const isEven = pageNumber % 2 === 0;
  
  return (
    <div className={`book-page ${isCover ? 'cover-page' : ''} fade-in`}>
      <div className="content-frame">
        {children}
      </div>
      {!isCover && (
        <div className="page-number">
           — {pageNumber} —
        </div>
      )}
       {/* Decoración de esquinas (rosas SVG simplificadas) */}
       <div className="corner-decoration top-left">🌷</div>
       <div className="corner-decoration top-right">🌷</div>
       {!isCover && <div className="corner-decoration bottom-left">🌷</div>}
    </div>
  )
}

// --- LA APLICACIÓN PRINCIPAL ---
export default function BookApp() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  // --- CONTENIDO DEL LIBRO ---
  const renderPageContent = () => {
    switch (currentPage) {
      // --- PORTADA ---
      case 1:
        return (
          <PageContainer pageNumber={1} isCover={true}>
            <div className="cover-content">
              <h1 className="main-title">Pixeles & Destino</h1>
              <h2 className="sub-title">Nuestra Historia Improbable</h2>
              <div className="collage-container">
                {/* IMPORTANTE: Para que estas fotos se vean:
                  1. Guarda tus fotos como 'foto1.jpg' y 'foto2.jpg'.
                  2. Ponlas DENTRO de la carpeta 'public' de tu proyecto en VS Code.
                */}
                <div className="photo-placeholder p1">
                  <img src="/foto1.jpg" alt="Foto 1" onError={(e) => e.currentTarget.src='https://placehold.co/200x250/pink/white?text=Tu+Foto+Aqui+1'} />
                </div>
                <div className="photo-placeholder p2">
                  <img src="/foto2.jpg" alt="Foto 2" onError={(e) => e.currentTarget.src='https://placehold.co/200x250/pink/white?text=Tu+Foto+Aqui+2'} />
                </div>
              </div>
              <p className="cover-footer">Felices 20 Años, Mi Niña</p>
            </div>
          </PageContainer>
        );
      
      // --- FRASE INICIAL ---
      case 2:
        return (
          <PageContainer pageNumber={2}>
             <div className="quote-page">
               <p className="quote-text">
                 "En el caos de un mundo digital, donde todo es efímero, encontré la realidad más hermosa: tu luz guiándome a casa."
               </p>
             </div>
          </PageContainer>
        );

      // --- ÍNDICE ---
      case 3:
        return (
          <PageContainer pageNumber={3}>
            <h2 className="chapter-title">Índice</h2>
            <ul className="index-list">
              <li>Pág. 4-5: El Vacío Antes de Ti</li>
              <li>Pág. 6-7: Un Encuentro Peculiar (Y un trago mortal)</li>
              <li>Pág. 8-9: Conexiones Inesperadas & Familia Virtual</li>
              <li>Pág. 10-12: La Luz en el Laberinto</li>
              <li>Pág. 13-15: Mundos Distintos, Un Mismo Destino</li>
              <li>Pág. 16-19: Nuestra Promesa (El Equipo)</li>
              <li>Pág. 20: El Futuro que Nos Espera</li>
            </ul>
          </PageContainer>
        );

      // --- LA HISTORIA (Páginas 4 a 19) ---
      case 4:
        return (
          <PageContainer pageNumber={4}>
            <h2 className="chapter-title">Capítulo 1: El Vacío</h2>
            <p className="story-text">
              Toda gran historia de aventura comienza en un lugar oscuro. La mía no fue diferente.
            </p>
            <p className="story-text">
              Estaba ahí, "tirado" en un juego. No era solo un personaje pixelado en el suelo; era un reflejo de cómo me sentía por dentro. Destrozado. Sin ganas.
            </p>
          </PageContainer>
        );
        case 5:
          return (
            <PageContainer pageNumber={5}>
              <p className="story-text">
                 El aburrimiento era una niebla espesa que me rodeaba. El mundo digital parecía tan gris como el real. No esperaba nada, no buscaba a nadie. Solo existía en ese espacio vacío.
              </p>
              <div className="divider">❦</div>
            </PageContainer>
          );
      case 6:
        return (
          <PageContainer pageNumber={6}>
             <h2 className="chapter-title">Capítulo 2: La Invitación Mortal</h2>
            <p className="story-text">
              Pero entonces, el guion cambió de repente. Llegó alguien. Un destello de color en mi pantalla monocromática. Ese alguien eras tú.
            </p>
            <p className="story-text">
              Con una audacia que me sorprendió, me invitaste a tomar un trago.
            </p>
          </PageContainer>
        );
      case 7:
        return (
          <PageContainer pageNumber={7}>
            <p className="story-text">
              Pensé que era un gesto amable... hasta que, bueno, ¡me mataste! Jaja. Vaya manera de presentarse.
            </p>
            <p className="story-text highlight">
              Cada historia de amor tiene un inicio de película, el nuestro fue una comedia de acción bastante peculiar.
            </p>
          </PageContainer>
        );
      case 8:
        return (
          <PageContainer pageNumber={8}>
            <h2 className="chapter-title">Capítulo 3: "Irnos a un cuarto"</h2>
            <p className="story-text">
              Pero después del "asesinato virtual", pasaron cosas. La conversación fluyó. Y luego ocurrió esa cosa rara que llamamos "irnos a un cuerpo".
            </p>
             <p className="story-text">
              Qué extraño suena ahora, ¿verdad? Pero así nació todo. En ese espacio extraño, encontramos algo real.
            </p>
          </PageContainer>
        );
      case 9:
        return (
          <PageContainer pageNumber={9}>
             <p className="story-text">
              Y la locura continuó cuando me presentaste a tus "padres de Roblox". Jaja.
            </p>
            <p className="story-text">
              Era un juego, sí, pero la conexión que estábamos construyendo no tenía nada de artificial. Era el inicio de nuestra propia pequeña familia.
            </p>
          </PageContainer>
        );
       case 10:
        return (
          <PageContainer pageNumber={10}>
            <h2 className="chapter-title">Capítulo 4: La Luz del Túnel</h2>
            <p className="story-text">
              Quiero ponerme serio un momento. No sé si te das cuenta de lo que hiciste por mí.
            </p>
            <p className="story-text">
              Apareciste como una luz potente y cálida en un túnel que yo sentía que no tenía fin. Estaba perdido en la oscuridad de mis propios pensamientos.
            </p>
          </PageContainer>
        );
      case 11:
        return (
          <PageContainer pageNumber={11}>
             <p className="story-text">
              Me tomaste de la mano (virtualmente al principio, pero con fuerza real) y me guiaste.
            </p>
            <p className="story-text">
              El laberinto en el que estaba atrapado empezó a tener sentido porque tú conocías la salida.
            </p>
          </PageContainer>
        );
      case 12:
        return (
          <PageContainer pageNumber={12}>
             <p className="story-text">
              Yo creía que mi camino estaba roto, lleno de baches imposibles de reparar. Tú no solo me mostraste que se podía arreglar, sino que me ayudaste a armar un camino nuevo, ladrillo por ladrillo, con paciencia y cariño.
            </p>
             <div className="divider">❦</div>
          </PageContainer>
        );
      case 13:
        return (
          <PageContainer pageNumber={13}>
            <h2 className="chapter-title">Capítulo 5: Mundos Distintos</h2>
            <p className="story-text">
              Somos de mundos distintos. Tal vez no en el sentido de Roblox, sino en la vida real. Tenemos orígenes diferentes, vidas diferentes.
            </p>
          </PageContainer>
        );
      case 14:
        return (
          <PageContainer pageNumber={14}>
            <p className="story-text">
              Pero el destino es caprichoso y sabio. Decidió unir esos dos mundos a través de una pantalla, probando que no hay fronteras para dos almas que deben encontrarse.
            </p>
          </PageContainer>
        );
      case 15:
        return (
          <PageContainer pageNumber={15}>
            <p className="story-text">
              No sé qué nos espera el futuro. Es un libro que aún no hemos escrito. Pero de algo estoy seguro: quiero que tú estés en cada una de sus próximas páginas.
            </p>
          </PageContainer>
        );
      case 16:
        return (
          <PageContainer pageNumber={16}>
            <h2 className="chapter-title">Capítulo 6: Nuestra Promesa</h2>
            <p className="story-text">
              Hoy, en tu cumpleaños número 20, quiero hacerte una promesa para nuestro futuro.
            </p>
            <p className="story-text">
              Prometo que cada problema que tengamos, no lo guardaremos.
            </p>
          </PageContainer>
        );
      case 17:
        return (
          <PageContainer pageNumber={17}>
            <p className="story-text">
              El silencio mata la confianza. Es un veneno lento. Prometo no dejar ese silencio entre nosotros.
            </p>
            <p className="story-text">
              Mejor tomarnos un respiro, contar hasta diez si es necesario, y luego hablar. Siempre hablar.
            </p>
          </PageContainer>
        );
      case 18:
        return (
          <PageContainer pageNumber={18}>
            <p className="story-text highlight">
              Que cuando haya un problema, tú y yo nunca seamos enemigos.
            </p>
             <p className="story-text">
              Recuérdalo siempre: el problema es el enemigo. Tú y yo somos el equipo que lucha unido contra él.
            </p>
          </PageContainer>
        );
       case 19:
        return (
          <PageContainer pageNumber={19}>
             <p className="story-text final-words">
              Gracias por sacarme del juego y traerme a la vida.
            </p>
            <p className="story-text final-words">
              Feliz cumpleaños, mi amor. Esto es solo el comienzo.
            </p>
             <div className="divider">❤</div>
          </PageContainer>
        );

      // --- PÁGINA FINAL (Ilustración de Distancia/Encuentro) ---
      case 20:
        return (
          <PageContainer pageNumber={20}>
            <div className="final-illustration-container">
              <h2 className="chapter-title">Hasta que los pixeles se vuelvan piel</h2>
              
              <div className="distance-graphic">
                <div className="location-pin left">
                  <span className="pin-icon">📍</span>
                  <span className="label">Mi Mundo</span>
                </div>
                
                <div className="connection-line">
                  <div className="dotted-line"></div>
                  <div className="traveling-heart">✈️❤️</div>
                </div>

                <div className="location-pin right">
                  <span className="pin-icon">📍</span>
                  <span className="label">Tu Mundo</span>
                </div>
              </div>
              
              <p className="final-caption">
                La distancia es solo un mapa esperando ser doblado. Pronto, el punto A y el punto B serán el mismo lugar: <br/> <b>Nosotros.</b>
              </p>
            </div>
          </PageContainer>
        );
      default:
        return null;
    }
  }

  return (
    <main className="book-wrapper">
      {/* ESTILOS CSS INTEGRADOS (Para asegurar que todo se vea bien sin archivos extra) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: #fce4ec; /* Fondo rosa muy suave externo */
        }
        
        /* --- ESTRUCTURA PRINCIPAL --- */
        .book-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          font-family: 'Lora', serif;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f48fb1' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        /* --- EL CONTENEDOR DE LA PÁGINA (El Libro Físico) --- */
        .book-page {
          width: 90%;
          max-width: 500px;
          height: 700px;
          background-color: #fff0f6; /* Rosa casi blanco para las páginas */
          border: 8px solid #f8bbd0; /* Borde rosa elegante */
          box-shadow: 0 10px 30px rgba(233, 30, 99, 0.2), inset 0 0 20px rgba(233, 30, 99, 0.05);
          border-radius: 12px 40px 40px 12px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .cover-page {
          background: linear-gradient(135deg, #f8bbd0 0%, #fce4ec 100%);
          border-color: #ec407a;
        }

        /* --- MARCO DE CONTENIDO INTERNO --- */
        .content-frame {
          flex: 1;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          z-index: 10;
        }

        /* --- TEXTOS Y TIPOGRAFÍA --- */
        h1, h2, .quote-text, .main-title {
          font-family: 'Dancing Script', cursive;
          color: #880e4f;
        }

        .story-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #4a142f;
          margin-bottom: 25px;
        }

        .highlight {
          font-weight: 600;
          color: #c2185b;
          font-style: italic;
        }

        .divider {
          font-size: 2rem;
          color: #f48fb1;
          margin: 20px 0;
        }
        
        /* --- ELEMENTOS ESPECÍFICOS DE PÁGINA --- */
        .page-number {
          text-align: center;
          font-family: 'Dancing Script', cursive;
          font-size: 1.2rem;
          color: #ad1457;
          padding-bottom: 15px;
          width: 100%;
        }

        .corner-decoration {
          position: absolute;
          font-size: 2rem;
          opacity: 0.3;
        }
        .top-left { top: 10px; left: 15px; transform: rotate(-45deg); }
        .top-right { top: 10px; right: 15px; transform: rotate(45deg); }
        .bottom-left { bottom: 10px; left: 15px; transform: rotate(-135deg); }
        .bottom-right { bottom: 10px; right: 15px; transform: rotate(135deg); }

        /* --- PORTADA --- */
        .main-title { font-size: 3.5rem; margin-bottom: 10px; }
        .sub-title { font-size: 1.5rem; margin-bottom: 30px; color: #c2185b; }
        .cover-footer { margin-top: auto; font-weight: bold; color: #880e4f; }
        
        .collage-container {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin: 30px 0;
        }
        .photo-placeholder {
          width: 140px;
          height: 180px;
          background-color: #f06292;
          border: 4px solid #fff;
          box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
          overflow: hidden;
          transform: rotate(-5deg);
        }
        .photo-placeholder.p2 { transform: rotate(5deg); margin-top: 20px; }
        .photo-placeholder img { width: 100%; height: 100%; object-fit: cover; }

        /* --- ÍNDICE Y CITA --- */
        .quote-text { font-size: 1.8rem; padding: 0 20px; }
        .chapter-title { font-size: 2.2rem; margin-bottom: 30px; }
        .index-list { list-style: none; padding: 0; text-align: left; display: inline-block; }
        .index-list li { margin-bottom: 15px; font-size: 1.1rem; border-bottom: 1px dotted #f48fb1; padding-bottom: 5px; }

        /* --- ILUSTRACIÓN FINAL (Página 20) --- */
        .final-illustration-container { width: 100%; }
        .distance-graphic {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 60px 0;
          padding: 0 20px;
          position: relative;
        }
        .location-pin { display: flex; flex-direction: column; align-items: center; z-index: 2; }
        .pin-icon { font-size: 3rem; }
        .label { font-weight: bold; color: #880e4f; margin-top: 5px; }
        
        .connection-line {
          position: absolute;
          top: 50%;
          left: 50px;
          right: 50px;
          height: 2px;
        }
        .dotted-line {
          width: 100%;
          height: 100%;
          border-top: 3px dotted #ec407a;
        }
        .traveling-heart {
          position: absolute;
          top: -20px;
          left: 50%;
          font-size: 2rem;
          animation: travel 3s ease-in-out infinite alternate;
        }
        .final-caption { font-size: 1.3rem; color: #880e4f; }

        /* --- CONTROLES DE NAVEGACIÓN --- */
        .controls {
          margin-top: 25px;
          display: flex;
          gap: 20px;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          padding: 10px 25px;
          border-radius: 30px;
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.15);
        }
        .nav-btn {
          background-color: #ec407a;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-family: 'Lora', serif;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .nav-btn:hover:not(:disabled) { background-color: #d81b60; transform: translateY(-2px); }
        .nav-btn:disabled { background-color: #f8bbd0; cursor: not-allowed; box-shadow: none; }
        .page-indicator { font-weight: bold; color: #c2185b; }

        /* --- ANIMACIONES --- */
        .fade-in { animation: fadeIn 0.8s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes travel { from { left: 10%; } to { left: 80%; } }

      `}</style>

      {/* --- EL ÁREA DEL LIBRO --- */}
      {renderPageContent()}

      {/* --- BOTONES PARA PASAR PÁGINA --- */}
      <div className="controls">
        <button className="nav-btn" onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span className="page-indicator">
          {currentPage} / {totalPages}
        </span>
        <button className="nav-btn" onClick={nextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </main>
  )
}