// /src/app/panggil-antrian/page.js
"use client"; // Menandai komponen ini sebagai komponen klien

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PanggilAntrian() {
  const [queue, setQueue] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState('');

  const fetchQueue = async () => {
    const response = await axios.get('/api/queue');
    setQueue(response.data);
  };

  const handlePanggilAntrian = async () => {
    await axios.put('/api/queue', { number: parseInt(selectedNumber) });
    fetchQueue();
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <div>
      <h1>Panggil Antrian</h1>
      <select onChange={(e) => setSelectedNumber(e.target.value)}>
        <option value="">Pilih Nomor Antrian</option>
        {queue.map((number, index) => (
          <option key={index} value={number}>{number}</option>
        ))}
      </select>
      <button onClick={handlePanggilAntrian}>Panggil Antrian</button>
    </div>
  );
}
