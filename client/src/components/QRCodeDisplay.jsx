import QRCode from "react-qr-code";

export default function QRCodeDisplay({ value }) {
    return (
        <div className="p-4 bg-white">
            <QRCode value={value} />
        </div>
    );
}
