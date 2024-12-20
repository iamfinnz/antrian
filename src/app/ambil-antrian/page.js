// /src/app/ambil-antrian/page.js
"use client"; // Menandai komponen ini sebagai komponen klien

import { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header'; // Impor komponen Header
import styles from '../../styles/AmbilAntrian.module.css'; // Impor CSS untuk halaman

export default function AmbilAntrian() {
  const [queueNumber, setQueueNumber] = useState(null);

  const handleAmbilAntrian = async () => {
    try {
      const response = await axios.post('/api/queue');
      setQueueNumber(response.data.queueNumber);

      // Mengunduh etiket setelah mendapatkan nomor antrian
      const etiketResponse = await axios.post('/api/etiket', { queueNumber: response.data.queueNumber }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([etiketResponse.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'etiket.pdf'); // Nama file yang akan diunduh
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error ambil antrian:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header /> {/* Menambahkan Header */}
      <div className={styles.container}>
        <h1 className={styles.title}><i>Silahkan tekan kotak dibawah untuk mengambil antrian farmasi</i></h1> {/* Judul di tengah */}
        <div className={styles.box} onClick={handleAmbilAntrian}> {/* Menjadikan kotak dapat diklik */}
          <p style={{ color: 'white', fontSize: '24px' }}>Ambil Antrian</p> {/* Teks di dalam kotak */}
        </div>
        {queueNumber && <p style={{ marginTop: '20px', fontSize: '18px' }}>Nomor Antrian Anda: {queueNumber}</p>}
      </div>
    </div>
  );
}
