import React from 'react';

export default function CertificatePreview({ name }: { name: string }) {
    return (
        <div
            id="certificate"
            style={{
                width: '1123px', // A4 size in px at 96dpi
                height: '794px',
                margin: '0 auto',
                position: 'relative',
                backgroundImage: 'url("/certificate-bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Nama peserta di posisi yang sesuai dengan layout background */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%', // sesuaikan
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#000000',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: '"Times New Roman", serif',
                }}
            >
                {name}
            </div>
        </div>
    );
}
