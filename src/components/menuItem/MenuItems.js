import "./MenuItems.css";
import { useState } from "react";

export default function MenuItem({
  id,
  name,
  price,
  description,
  image,
  category,
  onID,
  setCart
}) {

  const [message, setMessage] = useState("")

  const addToCart = (e) => {
    e.stopPropagation();

    setCart((prev) => {
      const existing = prev.find((p) => p.id === id);

      if (existing) {
        return prev.map((p) =>
          p.id === id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }

      return [
        ...prev,
        {
          id,
          name,
          price,
          image,
          category,
          qty: 1,
        },
      ];
    });
    setMessage(`${name} добавлен в корзину!`)
    setTimeout(() => {
      setMessage("")
    }, 2000)
  };

  return (
    <article className="menu-card" onClick={() => onID(id)}>
      {image && (
        <img
          src={image}
          alt={name}
          className="menu-image"
          loading="lazy"
        />
      )}

      <div className="menu-content">
        <h3 className="menu-name">{name}</h3>

        {category && (
          <span className="menu-category">{category}</span>
        )}

        {description && (
          <p className="menu-description">{description}</p>
        )}

        <div className="menu-footer">
          <span className="menu-price">{price} ₽</span>
          {message? <div className="toast">{message}</div>:null}
          <button className="btn-add-cart" onClick={addToCart}>
            
            🛒 В корзину
          </button>
        </div>
      </div>
    </article>
  );
}