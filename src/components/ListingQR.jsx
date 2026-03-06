import React from "react";
import { generateQRData } from "../utils/qrGenerator";

const ListingQR = ({ id }) => {
  const qr = generateQRData(id);
  return <div>QR Data: {qr}</div>;
};

export default ListingQR;