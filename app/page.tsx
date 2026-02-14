"use client";

import React, { useState, useRef, useEffect } from 'react';

interface PaginaCarta {
  titulo: string;
  contenido: string;
  clima: string;
  color: string;
}

const LibroSagrado = () => {
  const [pagina, setPagina] = useState(0);
  const [final, setFinal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Al cambiar de página, volvemos arriba del "scroll" de la hoja
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [pagina, final]);

  // --- CONSTRUCTOR DE NARRATIVA EXTENSA (73 PÁGINAS ÚNICAS) ---
  const generarLibro = (): PaginaCarta[] => {
    const paginas: PaginaCarta[] = [];
    
    // Diccionarios de conceptos para evitar repeticiones
    const inicios = [
      "Hoy me desperté pensando en la arquitectura de lo invisible...",
      "Escribo esto desde el borde de un pensamiento que no me deja dormir...",
      "Hay una frecuencia en el silencio que solo tú y yo logramos descifrar...",
      "Me pregunto si los pixeles donde nos conocimos sabían lo que vendría...",
      "A veces el alma necesita vaciarse en el papel para no colapsar..."
    ];

    const conceptosAmor = [
      "tu risa es un mapa de relieves que nunca termino de explorar.",
      "el futuro contigo se siente como un edificio de cristal en medio de una tormenta.",
      "mi niño interior dejó de tener miedo a la oscuridad cuando escuchó tu voz por primera vez.",
      "amarte fue como aprender un idioma que solo se habla en los sueños.",
      "cada rincón de mi sistema tiene un rastro de tu código, de tu esencia."
    ];

    const conceptosAbismo = [
      "el laberinto se ha vuelto más denso, y las espinas ya no solo rozan, ahora marcan.",
      "los muros que levantaste no me detienen por su altura, sino por su silencio.",
      "la fragilidad de mi armadura es el secreto que mejor guardo bajo este metal.",
      "busqué mi lugar en el mapa de tus días y solo encontré desiertos de incertidumbre.",
      "mis inseguridades no eran quejas, eran gritos de un náufrago buscando tierra firme."
    ];

    for (let i = 1; i <= 73; i++) {
      let fnd = "#fff5f7"; // Rosa suave
      let txt = "#c9184a";
      let etapa = "";
      let cuerpo = "";

      // FASE 1: DICIEMBRE (EL COLOR)
      if (i <= 27) {
        etapa = "La Génesis del Color";
        cuerpo = `${inicios[i % 5]} Aquel 4 de diciembre el mundo dejó de ser plano. ${conceptosAmor[i % 5]} No me enamoré de lo fácil, me enamoré de la posibilidad de ser infinito a tu lado. Recuerdo cómo mis manos temblaban al escribirte, cómo cada mensaje era un puente que lanzaba al vacío esperando que tú estuvieras del otro lado. Quería que mi vida tuviera tu tono, ese brillo que solo tú emanas. Fuimos dos extraños construyendo un imperio en la distancia, ignorando que el tiempo sería nuestro juez más severo. Te amo con una profundidad que asusta, con una devoción que no entiende de razones ni de muros. Eres la muchacha más linda que la tierra ha parido, y mi único deseo era ser el guardián de tu sonrisa.\n\n` + 
                 `Pienso en el futuro y veo techos altos, ventanas que dan a un jardín que cuidaremos juntos. Veo una vida donde el 'nosotros' no sea una petición, sino una ley natural. Pero mientras llego ahí, sigo aquí, flotando en este sentimiento que me eleva y me consume a la vez. No hay espacio en esta hoja para describir cómo mi alma se estira para alcanzarte.`;
      } 
      // FASE 2: ENERO (LA NIEBLA)
      else if (i <= 59) {
        fnd = "#eceff1";
        txt = "#455a64";
        etapa = "El Laberinto de la Indiferencia";
        cuerpo = `${inicios[i % 5]} La niebla se instaló en el pasillo y dejé de ver tus manos. ${conceptosAbismo[i % 5]} Empecé a sentir que mis palabras eran ecos en una habitación vacía. No es el tiempo lo que falta, Judith, es la mirada. Es sentir que en tu horizonte yo soy solo una mota de polvo y no el sol que intentaba ser. Me volví frágil, me quité las capas de protección esperando que al verme así, sin nada, decidirías darme ese lugar que tanto busqué. Pero el respeto no es una moneda que se pide, es un altar que se construye entre dos. El laberinto creció y las grietas bajo mis pies me recordaron que el amor, cuando es unidireccional, termina por romper al que más siente.\n\n` + 
                 `Sigo caminando, aunque me pinche con las espinas que ahora cubren el suelo. No me quejo, solo narro mi dolor para que entiendas que detrás de cada 'celo' había un miedo atroz a que este edificio se cayera. Y se está cayendo, Judith. Las grietas son profundas y el aire aquí dentro se ha vuelto irrespirable.`;
      } 
      // FASE 3: FEBRERO (LA ARMADURA)
      else {
        fnd = "#cfd8dc";
        txt = "#263238";
        etapa = "El Silencio del Acero";
        cuerpo = `${inicios[i % 5]} Me puse la armadura. Es pesada, fría y no deja que mis quejas salgan. Pero tampoco deja que tu luz entre como antes. ${conceptosAbismo[i % 5]} Camino hacia ti por inercia, por un amor que se niega a morir aunque esté herido de muerte. Trepé muros y me lastimé el alma solo para ver la claridad de tus ojos, pero me encontré con que tu mirada ya no me pertenece. Estás ahí, pero no estás conmigo. Veo el laberinto negro que te rodea y quiero salvarte, pero me doy cuenta de que yo también necesito ser salvado. Mi armadura me protege de tus palabras que duelen, pero me aísla de la Judith que algún día conocí en aquel juego.\n\n` + 
                 `Este camino no fue fácil, y nunca pedí que lo fuera. Pedí respeto, pedí un lugar que nunca llegó, y entendí que si tengo que pedirlo, es porque ese lugar nunca estuvo destinado para mí. Aquí sigo, avanzando en la oscuridad, esperando que mañana el sol tenga la decencia de salir una última vez.`;
      }

      paginas.push({ titulo: `Página ${i}: ${etapa}`, contenido: cuerpo, clima: fnd, color: txt });
    }
    return paginas;
  };

  const libro = generarLibro();
  const actual = libro[pagina];

  const reiniciar = () => {
    setFinal(false);
    setPagina(0);
  };

  return (
    <div style={{ 
      minHeight: '100vh', backgroundColor: actual.clima, transition: 'all 1s ease',
      display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: "'Times New Roman', serif"
    }}>
      
      {!final ? (
        <div style={{
          width: '100%', maxWidth: '750px', backgroundColor: '#fff', borderRadius: '4px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', height: '90vh'
        }}>
          {/* Header de la Hoja */}
          <div style={{ padding: '40px 60px 20px', borderBottom: '1px solid #eee', textAlign: 'right', color: '#999' }}>
            <p style={{ margin: 0 }}>{actual.titulo}</p>
            <p style={{ margin: 0, fontSize: '0.8rem' }}>Nazca, Perú | 14 de Febrero, 2026</p>
          </div>

          {/* Cuerpo de la Carta con Scroll */}
          <div ref={scrollRef} style={{ padding: '20px 60px', overflowY: 'auto', flex: 1, textAlign: 'justify' }}>
            <p style={{ color: actual.color, lineHeight: '2.2', fontSize: '1.2rem', whiteSpace: 'pre-wrap' }}>
              {actual.contenido}
            </p>
            <div style={{ height: '50px' }}></div>
          </div>

          {/* Footer de Navegación */}
          <footer style={{ padding: '20px 60px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee' }}>
            <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 0} style={btnStyle}>Anterior</button>
            <span style={{ fontSize: '0.8rem', color: '#ccc', alignSelf: 'center' }}>{pagina + 1} de 73</span>
            <button 
              onClick={() => pagina === 72 ? setFinal(true) : setPagina(pagina + 1)} 
              style={{ ...btnStyle, backgroundColor: actual.color === "#ffffff" ? "#263238" : actual.color, color: '#fff' }}
            >
              {pagina === 72 ? "Llegar al Final" : "Siguiente página"}
            </button>
          </footer>
        </div>
      ) : (
        /* PÁGINA FINAL: EL CIERRE DISOCIADO */
        <div style={{ 
          maxWidth: '650px', backgroundColor: '#fff', padding: '80px 50px', borderRadius: '15px', 
          textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.1)', animation: 'slideUp 1.5s' 
        }}>
          <h1 style={{ color: '#263238', marginBottom: '40px' }}>14 de Febrero</h1>
          
          <div style={{ textAlign: 'justify', lineHeight: '2', color: '#333', fontSize: '1.15rem', fontStyle: 'italic' }}>
            <p>Gracias por todo lo que fuimos, aunque haya sido en el silencio de este laberinto. </p>
            <p>He entendido que el amor no se mide en los minutos que sobran, sino en el lugar que se otorga sin que el otro tenga que suplicar por él. No es la falta de tu tiempo lo que hoy me detiene, Judith, sino la triste claridad de que mi trono en tu vida fue siempre una silla prestada, un espacio que tuve que pedir y que nunca terminó de pertenecerme por derecho propio.</p>
            <p>Me enamoré de tus ojos, pero hoy acepto que esos ojos miran hacia un horizonte donde yo no soy más que parte del paisaje, no el destino. Te amo infinitamente, y por ese mismo amor, te libero de mis "quejas" y de mi presencia.</p>
            <p>Cuidaré con mi alma ese regalito de dos orejas grandes que tengo aquí conmigo; él será el testigo de lo que quise construir y no pudo ser. Feliz San Valentín, mi señora esposa.</p>
          </div>

          <button onClick={reiniciar} style={{ marginTop: '50px', background: 'none', border: 'none', textDecoration: 'underline', color: '#d81b60', cursor: 'pointer', fontWeight: 'bold' }}>
            Cerrar el libro y volver al inicio
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }
        button:disabled { opacity: 0.2; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

const btnStyle = {
  padding: '12px 30px', borderRadius: '5px', border: '1px solid #eee', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: '0.3s'
};

export default LibroSagrado;