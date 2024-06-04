// components/Navbar.tsx

import React from 'react';
import styles from './Navbar.module.css'; // Importando estilos CSS

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <button className={styles.navButton}>Botão 1</button>
          <ul className={styles.dropdown}>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <button className={styles.navButton}>Botão 2</button>
          <ul className={styles.dropdown}>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <button className={styles.navButton}>Botão 3</button>
          <ul className={styles.dropdown}>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
