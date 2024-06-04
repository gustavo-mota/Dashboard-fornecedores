// components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
    // Estilos
const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
  };
  
  return (
    <footer style={footerStyle}>
      <p>Este é o rodapé do site.</p>
    </footer>
  );
};



export default Footer;
