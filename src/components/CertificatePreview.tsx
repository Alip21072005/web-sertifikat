import React from 'react';

export default function CertificatePreview({ name }: { name: string }) {
    return (
        <div className="certificate-wrapper">
            <div id="certificate" className="scaled">
                <div className="name-text">{name}</div>
            </div>
        </div>
    );
}
