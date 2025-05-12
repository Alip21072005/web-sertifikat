'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import CertificatePreview from '@/components/CertificatePreview';

export default function Home() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!name || !whatsapp) return alert('Isi nama dan nomor WhatsApp');

    const isValid = /^(08\d{8,}|62\d{8,})$/.test(whatsapp);
    if (!isValid) return alert('Nomor WhatsApp tidak valid');

    const el = document.getElementById('certificate');
    if (!el) return alert('Sertifikat tidak ditemukan.');

    setLoading(true);
    try {
      const canvas = await html2canvas(el);
      const dataUrl = canvas.toDataURL('image/png');
      const base64 = dataUrl.split(',')[1]; // buang prefix

      // Debugging: Periksa base64 string yang dikirim
      console.log("Base64 image data:", base64);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Gagal upload');

      const phone = whatsapp.replace(/^0/, '62');
      const message = `Halo ${name}, berikut sertifikat Anda:\n${data.url}`;
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.open(waUrl, '_blank');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('Gagal kirim: ' + err.message);
      } else {
        alert('Gagal kirim: Terjadi kesalahan.');
      }
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
      <input
        type="text"
        placeholder="Nomor WhatsApp (08xxxx)"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
      <br />
      <button
        onClick={handleSend}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        disabled={loading}
      >
        {loading ? 'Mengirim...' : 'Kirim lewat WhatsApp'}
      </button>

      {name && (
        <div style={{ marginTop: '2rem' }}>
          <CertificatePreview name={name} />
        </div>
      )}
    </main>
  );
}
