export default function ImageUpload({ onUpload }) {
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // fake upload URL (Cloudinary integration later)
        const url = URL.createObjectURL(file);
        onUpload(url);
    };

    return (
        <input type="file" accept="image/*" onChange={handleFile} />
    );
}
