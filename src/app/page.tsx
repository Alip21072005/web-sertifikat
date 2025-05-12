'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CertificatePreview from '../components/CertificatePreview';

export default function Home() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!name) return alert('Isi nama terlebih dahulu');

    const el = document.getElementById('certificate');
    if (!el) return alert('Sertifikat tidak ditemukan.');

    setLoading(true);
    try {
      const canvas = await html2canvas(el, {
        scale: 2, // kualitas tinggi tanpa blur
        width: el.offsetWidth,
        height: el.offsetHeight,
        scrollX: 0,
        scrollY: -window.scrollY,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');

      // Gunakan ukuran A4 horizontal (landscape) dalam satuan mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Skala agar gambar tetap proporsional
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;

      const x = (pdfWidth - imgScaledWidth) / 2;
      const y = (pdfHeight - imgScaledHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgScaledWidth, imgScaledHeight);
      pdf.save(`Sertifikat_${name}.pdf`);
    } catch (error) {
      console.error(error);
      alert('Gagal mengunduh sertifikat.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>SERTIFIKAT DIES NATALIS DE CODE 2025</h1>
      <input
        type="text"
        placeholder="Nama peserta"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', fontSize: '1rem' }}
      />
      <br />
      <button
        onClick={handleDownload}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        disabled={loading}
      >
        {loading ? 'Mengunduh...' : 'Download Sertifikat'}
      </button>

      {name && (
        <div style={{ marginTop: '2rem' }}>
          <CertificatePreview name={name} />
        </div>
      )}
    </main>
  );
}
