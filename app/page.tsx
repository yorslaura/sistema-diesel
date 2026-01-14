'use client'
import { useState } from 'react'

export default function Home() {
  const [clics, setClics] = useState(40)
  const [fase, setFase] = useState('jugando')

  const manejarClic = () => {
    if (clics > 1) {
      setClics(clics - 1)
    } else {
      setClics(0)
      setFase('cayendo')
      setTimeout(() => setFase('propuesta'), 1500)
    }
  }

  return (
    <main style={styles.container}>
      {fase === 'jugando' && (
        <div>
          <h2 style={{ color: '#d63031' }}>¡Dale amor al cuinejito!</h2>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Clics restantes: {clics}</p>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2663/2663067.png" 
            alt="Pollito" 
            onClick={manejarClic}
            style={{
                width: '150px', 
                cursor: 'pointer', 
                transition: '0.1s',
                transform: `scale(${1 + (40 - clics) * 0.01})`
            }}
          />
        </div>
      )}

      {fase === 'cayendo' && (
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2903/2903423.png" 
          alt="Huevo" 
          className="huevo-animacion"
        />
      )}

      {fase === 'propuesta' && (
        <div className="aparecer">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/325/325606.png" 
            alt="Yema" 
            style={{ width: '250px' }}
          />
          <h1 style={{ fontSize: '2.5rem', color: '#e17055' }}>Te amo mucho, mi niña ❤️</h1>
          <p style={{ fontSize: '1.8rem', color: '#2d3436' }}>¿Te quieres casar conmigo?</p>
        </div>
      )}
    </main>
  )
}

// Estilos corregidos para evitar errores de TypeScript
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffeaa7',
    fontFamily: 'sans-serif',
    textAlign: 'center' as const, // Esto corrige el error de TextAlign
    overflow: 'hidden'
  }
}