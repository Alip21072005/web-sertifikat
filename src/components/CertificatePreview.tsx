import React from 'react';

export default function CertificatePreview({ name }: { name: string }) {
    return (
        <div
            style={{
                width: '100%',
                overflowX: 'auto',
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem 0',
            }}
        >
            <div
                id="certificate"
                style={{
                    width: '1123px', // A4 horizontal
                    height: '794px',
                    position: 'relative',
                    backgroundImage: 'url("/certificate-bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
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
        </div>
    );
}
