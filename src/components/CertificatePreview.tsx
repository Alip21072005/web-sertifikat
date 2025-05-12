'use client';

import React from 'react';
import Image from 'next/image';

type Props = {
    name: string;
};

const CertificatePreview: React.FC<Props> = ({ name }) => {
    return (
        <div
            id="certificate"
            style={{
                position: 'relative',
                width: '800px',
                height: '565px',
                border: '1px solid #ddd', // Untuk melihat batas container
            }}
        >
            <Image
                src="/sertifikat.png" // Pastikan gambar ada di folder public
                alt="sertifikat"
                layout="fill"
                objectFit="cover"
                priority
            />

            {/* Text nama peserta */}
            <div
                style={{
                    position: 'absolute',
                    top: '47%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '32px',
                    fontFamily: "'Quincho', sans-serif", // Pastikan font ini di-load dengan benar
                    fontWeight: 'bold',
                    color: '#000',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Tambahkan shadow untuk visibilitas
                }}
            >
                {name}
            </div>
        </div>
    );
};

export default CertificatePreview;
