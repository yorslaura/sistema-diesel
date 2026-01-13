import React, { useState } from 'react';

const App = () => {
  // Estados para controlar la navegación y los clics del huevo
  const [ruta, setRuta] = useState('menu-principal');
  const [clicks, setClicks] = useState(0);

  // Función para manejar el clic en el huevo
  const manejarClickHuevo = () => {
    if (clicks < 6) {
      setClicks(clicks + 1);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#fff5f7', minHeight: '100vh' }}>
      
      {/* --- NAVEGACIÓN (Basada en tu imagen) --- */}
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setRuta('menu-principal')}
          style={{ padding: '8px 15px', cursor: 'pointer' }}
        >
          Inicio
        </button>
        <button 
          onClick={() => setRuta('pagina-taller')}
          style={{ padding: '8px 15px', cursor: 'pointer' }}
        >
          Ir a taller
        </button>
        <button 
          onClick={() => setRuta('pagina-bodega')}
          style={{ padding: '8px 15px', cursor: 'pointer' }}
        >
          Ir a bodega
        </button>
        <button 
          onClick={() => { setRuta('sorpresa'); setClicks(0); }}
          style={{ 
            padding: '8px 15px', 
            cursor: 'pointer', 
            backgroundColor: '#ff4d6d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          🎁 Para Judith
        </button>
      </nav>

      <hr />

      {/* --- RUTA: MENU PRINCIPAL --- */}
      {ruta === 'menu-principal' && (
        <section>
          <h1>Bienvenido al Sistema</h1>
          <p>Elije una opcion arriba para navegar.</p>
        </section>
      )}

      {/* --- RUTA: TALLER --- */}
      {ruta === 'pagina-taller' && (
        <section>
          <h1>Sector: Taller mecanico</h1>
        </section>
      )}

      {/* --- RUTA: BODEGA --- */}
      {ruta === 'pagina-bodega' && (
        <section>
          <h1>Sector: Bodega</h1>
        </section>
      )}

      {/* --- RUTA: SORPRESA (EL HUEVO CUTE) --- */}
      {ruta === 'sorpresa' && (
        <section style={{ textAlign: 'center', marginTop: '40px' }}>
          {clicks < 6 ? (
            <div onClick={manejarClickHuevo} style={{ cursor: 'pointer', display: 'inline-block' }}>
              <h2 style={{ color: '#d63384', marginBottom: '30px' }}>¡Judith, rompe el huevito!</h2>
              
              {/* Contenedor del Huevo */}
              <div style={{
                width: '140px',
                height: '185px',
                backgroundColor: '#fffdf0',
                borderRadius: '50% 50% 50% 50% / 65% 65% 35% 35%',
                margin: '0 auto',
                position: 'relative',
                boxShadow: 'inset -10px -10px 0 rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.1s',
                transform: clicks > 0 ? `rotate(${clicks % 2 === 0 ? '5deg' : '-5deg'}) scale(1.05)` : 'scale(1)'
              }}>
                {/* Carita Kawaii */}
                <div style={{ display: 'flex', gap: '25px', marginBottom: '10px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#333', borderRadius: '50%' }}></div>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#333', borderRadius: '50%' }}></div>
                </div>
                <div style={{ display: 'flex', gap: '45px', position: 'absolute', top: '65%' }}>
                  <div style={{ width: '18px', height: '10px', backgroundColor: '#ffb6c1', borderRadius: '50%', opacity: 0.6 }}></div>
                  <div style={{ width: '18px', height: '10px', backgroundColor: '#ffb6c1', borderRadius: '50%', opacity: 0.6 }}></div>
                </div>
                <div style={{ fontSize: '20px', color: '#333', fontWeight: 'bold' }}>v</div>
              </div>
              
              <p style={{ color: '#b1949a', marginTop: '20px' }}>Dale clics para que nazca: <b>{clicks} / 6</b></p>
            </div>
          ) : (
            /* MENSAJE FINAL */
            <div style={{ 
              animation: 'fadeIn 1s forwards',
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              display: 'inline-block'
            }}>
              <h1 style={{ color: '#d63384', margin: '0' }}>❤️ Judith ❤️</h1>
              <p style={{ fontSize: '1.4rem', color: '#444', lineHeight: '1.5' }}>
                <strong>Grosera y malcriada</strong>,<br />
                te amo mi señora esposa.<br />
                <span style={{ color: '#ff4d6d', fontWeight: 'bold' }}>
                  La muchacha más linda de la tierra.
                </span>
              </p>
              <div style={{ fontSize: '80px', marginTop: '10px' }}>🐣💖</div>
              <button 
                onClick={() => setClicks(0)}
                style={{ marginTop: '20px', border: 'none', background: 'none', color: '#aaa', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Volver a romper
              </button>
            </div>
          )}
        </section>
      )}

      {/* Animación CSS para el mensaje */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
};

export default App;