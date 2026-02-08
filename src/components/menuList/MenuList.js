import "./MenuList.css";
import MenuItem from "../menuItem/MenuItems";

export default function MenuList({ items, onID, setCart }) {
  if (!items || items.length === 0) {
    return <p className="menu-empty">Нет доступных блюд</p>;
  }

  return (
    <div className="menu-grid">
      {items.map((item) => (
        <MenuItem
          key={item.id}
          {...item}
          onID={onID}
          setCart={setCart}   // 👈 прокидываем
        />
      ))}
    </div>
  );
}