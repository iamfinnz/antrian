// /src/components/Header.js
"use client"; // Menandai komponen ini sebagai komponen klien

import Image from 'next/image';
import styles from './Header.module.css'; // Impor CSS untuk styling header

export default function Header() {
  return (
    <header className={styles.header}>
      <Image src="/logo.png" alt="Logo" width={180} height={180} className={styles.logo} /> {/* Ukuran logo lebih besar */}
      <h1 className={styles.title}>Sistem Pemanggilan Antrian Farmasi RS Sansani</h1>
    </header>
  );
}
