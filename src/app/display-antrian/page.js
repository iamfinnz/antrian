// /src/app/display-antrian/page.js
"use client"; // Menandai komponen ini sebagai komponen klien

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DisplayAntrian() {
  const [queue, setQueue] = useState([]);

  const fetchQueue = async () => {
    const response = await axios.get('/api/queue');
    setQueue(response.data);
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <div>
      <h1>Display Antrian</h1>
      <ul>
        {queue.map((number, index) => (
          <li key={index}>Nomor Antrian: {number}</li>
        ))}
      </ul>
    </div>
  );
}
