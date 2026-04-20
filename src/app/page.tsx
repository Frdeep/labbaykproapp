export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      background: '#FDFBF7',
      color: '#0A0E0C',
    }}>
      <h1 style={{ fontSize: 32, fontWeight: 500, marginBottom: 8 }}>
        Labbayk
      </h1>
      <p style={{ fontSize: 15, color: '#5C6561', marginBottom: 4 }}>
        Hajj &amp; Omra
      </p>
      <p style={{ fontSize: 13, color: '#9BA39F', fontStyle: 'italic' }}>
        Labbayk Allahuma Labbayk
      </p>
    </div>
  );
}
