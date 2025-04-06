import React, { useEffect } from 'react';

// Add this to your index.html or use @import in your main CSS
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

const sections = [
  { title: 'Academics', description: 'Access study materials, notes, and guidance' },
  { title: 'Placements', description: 'Get info, prep resources, and support' },
  { title: 'Forum', description: 'Discuss, ask doubts, and connect' },
  { title: 'Contests', description: 'Participate in challenges and show your talent' },
  { title: 'Chat', description: 'Start conversations with your peers' },
  { title: 'Profile', description: 'Build your profile and showcase your journey' },
];

export default function CampusConnectHome() {
  const handleLogin = () => {
    alert("Redirecting to login page...");
  };

  const handleNavigate = (section) => {
    alert(`Navigating to ${section} section...`);
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.fade-in');
    cards.forEach((card, i) => {
      card.style.animationDelay = `${i * 0.2}s`;
      card.classList.add('visible');
    });
  }, []);

  return (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        color: '#333',
      }}
    >
      <header
        style={{
          textAlign: 'center',
          padding: '60px 30px 40px',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '10px' }}>
          🎓 Welcome to <span style={{ color: '#ffd700' }}>CampusConnect</span>
        </h1>
        <p style={{ fontSize: '20px' }}>Collaborate, learn, and grow with your peers!</p>
        <button
          onClick={handleLogin}
          style={{
            marginTop: '20px',
            backgroundColor: '#fff',
            color: '#0077cc',
            border: 'none',
            padding: '12px 24px',
            fontWeight: '600',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Login
        </button>
      </header>

      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '30px',
          padding: '40px 60px 80px',
        }}
      >
        {sections.map((sec, i) => (
          <div
            key={sec.title}
            className="fade-in"
            onClick={() => handleNavigate(sec.title)}
            style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
            }}
          >
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '10px' }}>{sec.title}</h3>
            <p style={{ fontSize: '15px', color: '#555' }}>{sec.description}</p>
          </div>
        ))}
      </main>

      {/* CSS for fade-in effect */}
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s forwards;
        }
        .fade-in.visible {
          opacity: 1;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
