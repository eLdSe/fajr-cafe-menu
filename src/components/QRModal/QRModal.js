import QRCode from "qrcode.react";
import { useCart } from "../context/CartContext";

export default function QRModal() {
  const { items } = useCart();

  const payload = JSON.stringify(
    items.map((i) => ({
      id: i.id,
      qty: i.qty,
    }))
  );

  return (
    <div className="qr-modal">
      <QRCode value={payload} size={240} />
      <p>Покажите официанту</p>
    </div>
  );
}
