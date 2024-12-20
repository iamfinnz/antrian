// /src/pages/api/etiket.js
import PDFDocument from 'pdfkit';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { queueNumber } = req.body; // Ambil nomor antrian dari permintaan

    // Mengatur header untuk PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="etiket.pdf"');

    // Menghasilkan PDF dan mengalirkannya ke respons
    const doc = new PDFDocument({
      size: [226.77, 226.77], // Ukuran 8 cm x 8 cm dalam poin
      margin: 0, // Mengatur margin jika diperlukan
    });
    doc.pipe(res); // Mengalirkan PDF ke respons

    // Menambahkan padding top 8px sebelum menambahkan teks "Antrian Farmasi"
    doc.moveDown(1); // Pindah ke baris berikutnya (1 baris = 12pt, 8px = ~0.23 baris)

    // Menambahkan konten ke PDF
    doc.fontSize(18).font('Helvetica-Bold').text('Antrian Farmasi', {
      align: 'center',
    });

    doc.moveDown(0.2); // Pindah ke baris berikutnya

    doc.fontSize(10).font('Helvetica').text('Nomor antrian :', {
      align: 'center',
    });

    doc.moveDown(); // Pindah ke baris berikutnya

    doc.fontSize(72).font('Helvetica-Bold').text(queueNumber.toString(), {
      align: 'center',
    });

    // Mengurangi jarak antara queueNumber dan formattedDate
    doc.moveDown(0.01); // Pindah ke baris berikutnya (kurangi jarak)

    // Mendapatkan waktu saat ini
    const formattedDate = formatCurrentDate();

    // Menambahkan formattedDate di atas teks "Perkiraan Pelayanan"
    doc.fontSize(10).font('Helvetica-Bold').text(formattedDate, {
      align: 'center',
    });

    // Menghitung perkiraan pelayanan
    const estimatedServiceTime = calculateEstimatedServiceTime();

    // Menambahkan teks "Perkiraan Pelayanan" dan waktu perkiraan pelayanan di baris yang sama
    doc.moveDown(0.2); // Pindah ke baris berikutnya
    doc.fontSize(10).font('Helvetica').text('Perkiraan Pelayanan :      ', {
      align: 'center',
      continued: true, // Menjaga teks tetap di baris yang sama
    });

    // Menambahkan waktu perkiraan pelayanan dalam bold
    doc.fontSize(10).font('Helvetica-Bold').text(estimatedServiceTime, {
      align: 'center',
    });

    doc.moveDown(); // Pindah ke baris berikutnya

    doc.fontSize(10).font('Helvetica-Bold').text('Rumah Sakit Sansani', {
      align: 'center',
    });

    doc.moveDown(0.2); // Pindah ke baris berikutnya

    doc.fontSize(8).font('Helvetica').text('Jl. Soekarno Hatta (Arengka Atas) Pekanbaru Telp. 08116686023', {
      align: 'center',
    });

    doc.end(); // Menyelesaikan dokumen PDF
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Fungsi untuk memformat tanggal saat ini
function formatCurrentDate() {
  const date = new Date();
  
  // Mendapatkan nama hari
  const optionsDay = { weekday: 'long' };
  const dayName = date.toLocaleDateString('id-ID', optionsDay);
  
  // Mendapatkan tanggal dan waktu
  const optionsDateTime = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  
  const dateTime = date.toLocaleString('id-ID', optionsDateTime);
  
  // Mengganti koma dengan "Pukul"
  return `${dayName}, ${dateTime.replace(',', ' Pukul')}`;
}

// Fungsi untuk menghitung perkiraan pelayanan
function calculateEstimatedServiceTime() {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 4); // Menambahkan 4 menit

  // Mendapatkan waktu
  const optionsTime = { 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  
  const time = date.toLocaleString('id-ID', optionsTime);
  
  // Mengganti koma dengan "Pukul"
  return time.replace(',', ' Pukul');
}
