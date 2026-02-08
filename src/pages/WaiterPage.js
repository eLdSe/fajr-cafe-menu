import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../data/firebase";
import "./WaiterPage.css";

export default function WaiterPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");

    if (orderId) {
      const fetchOrder = async () => {
        try {
          const docRef = doc(db, "orders", orderId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setOrder(docSnap.data());
          } else {
            console.log("Заказ не найден");
            setOrder({ items: [] });
          }
        } catch (err) {
          console.error("Ошибка загрузки заказа:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchOrder();
    } else {
      setOrder({ items: [] });
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Загрузка заказов...</p>
      </div>
    )
  }

  if (!order || !order.items || order.items.length === 0) {
    return (
      <div className="empty">
        <p>Заказ пуст или не найден</p>
      </div>
    )
  }

  const total = order.items.reduce(
    (sum, i) => sum + i.price * (i.qty || 1),
    0
  );

  return (
    <div className="waiter-page">
      <h1>Заказ клиента</h1>

      <div className="order-grid">
        {order.items.map((item) => (
          <div className="order-card" key={item.id}>
            {item.image && <img src={item.image} alt={item.name} />}
            <h4>{item.name}</h4>
            <p>Кол-во: {item.qty || 1}</p>
            <p>Цена: {item.price} ₽</p>
          </div>
        ))}
      </div>

      <div className="order-total">Итого: {total} ₽</div>
    </div>
  );
}