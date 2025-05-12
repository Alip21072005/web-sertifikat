import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // Mengambil data base64 dari body request
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ error: 'Gambar tidak ditemukan' }, { status: 400 });
        }

        // Verifikasi bahwa data base64 valid
        const isValidBase64 = /^[A-Za-z0-9+/=]+$/.test(image);
        if (!isValidBase64) {
            return NextResponse.json({ error: 'Data base64 tidak valid' }, { status: 400 });
        }

        // Mengonversi base64 menjadi buffer
        const buffer = Buffer.from(image, 'base64');

        // Misalnya, kita mengunggah ke Cloudinary
        const cloudinaryResponse = await uploadToCloudinary(buffer);

        if (!cloudinaryResponse.url) {
            throw new Error('Gagal mengunggah gambar ke Cloudinary');
        }

        // Mengembalikan URL gambar yang telah diupload
        return NextResponse.json({ url: cloudinaryResponse.url });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Gagal mengupload gambar' }, { status: 500 });
    }
}

// Fungsi untuk mengunggah gambar ke Cloudinary
async function uploadToCloudinary(buffer: Buffer) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    const blob = new Blob([buffer], { type: 'image/png' });
    formData.append('file', blob, 'sertifikat.png');
    if (!uploadPreset) {
        throw new Error('CLOUDINARY_UPLOAD_PRESET is not defined');
    }
    formData.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        throw new Error('Gagal mengupload gambar ke Cloudinary');
    }

    const data = await res.json();
    return data;
}
