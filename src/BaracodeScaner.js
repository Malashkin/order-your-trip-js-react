import { QRCodeSVG } from "qrcode.react";

export default function BaracodeScaner() {
  return (
    <QRCodeSVG
      value="creating object in API, then it will be link to it"
      size="100"
      bgColor="olive"
      fgColor="white"
    />
  );
}
