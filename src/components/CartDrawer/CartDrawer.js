import "./CartDrawer.css";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../data/firebase";

export default function CartDrawer({ onClose, items = [], setCart }) {
  const [showQR, setShowQR] = useState(false);
  const [orderLink, setOrderLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const increaseQty = id => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQty = id => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, qty: (item.qty || 1) - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const removeItem = id => {
    setCart(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  const clearAll = () => setCart([])
  // 🔥 Создание заказа в Firebase + генерация ссылки
  const createOrder = async () => {
    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, "orders"), {
        items,
        status: "new",
        createdAt: serverTimestamp()
      });

      const link = `${ window.location.origin }/waiter?orderId=${docRef.id}`;

      setOrderLink(link);
      setShowQR(true);
    } catch (err) {
      console.error("Ошибка создания заказа:", err);
      alert("Firebase error — смотри консоль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-overlay">
      <div className="cart-panel">
        <h2>Ваш заказ</h2>

        <div className="cart-items">
          {items.length === 0 && <p>Корзина пуста</p>}

          {items.map(item => (
            <div className="cart-row" key={item.id}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-image"
                />
              )}

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>{item.price} ₽</p>

                <div className="cart-controls">
                  <button onClick={() => decreaseQty(item.id)}>
                    -
                  </button>

                  <span>{item.qty || 1}</span>

                  <button onClick={() => increaseQty(item.id)}>
                    +
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-total">
          <strong>Итого:</strong> {total} ₽
        </div>
        <div className="cart-actions">
          <button className="clear-btn" onClick={clearAll} disabled={items.length === 0}>
            Очистить все
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "12px"
          }}
        >
          <button
            className="close-btn"
            onClick={() => onClose(false)}
          >
            Закрыть
          </button>

          <button
            className="qr-btn"
            onClick={createOrder}
            disabled={!!orderLink || loading}
          >
            {loading
              ? "Создание..."
              : orderLink
                ? "QR создан"
                : "Показать QR"}
          </button>
        </div>

        {showQR && orderLink && (
          <div
            style={{
              marginTop: "16px",
              textAlign: "center"
            }}
          >
            <QRCodeSVG value={orderLink} size={200} />

            <p
              style={{
                color: "#eee",
                marginTop: "8px"
              }}
            >
              Сканируйте QR, чтобы открыть заказ
            </p>
          </div>
        )}
      </div>
    </div>
  );
}