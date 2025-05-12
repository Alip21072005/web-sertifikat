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
      const canvas = await html2canvas(el);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Sertifikat_${name}.pdf`);
    } catch {
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
