import { useState, useEffect } from "react";
import { useMenu, useMenuById } from "../hooks/useMenu";

import MenuList from "../components/menuList/MenuList";
import CategoryTabs from "../components/categoryMenu/CategoriTabs";
import SearchBar from "../components/menuSearch/SearchBar";
import Header from "../components/header/Header";
import CartDrawer from "../components/CartDrawer/CartDrawer";

import "./MenuPage.css";

export default function MenuPage() {
  // Все товары меню
  const { items } = useMenu();

  // id выбранного товара
  const [id, setId] = useState(null);
  const { item } = useMenuById(id);

  // Корзина (массив)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Открыта ли корзина
  const [active, setActive] = useState(false);

  // Сохраняем корзину
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Клик по товару
  const onID = (id) => {
    setId(id);
  };

  // Категории
  const categories = Array.from(
    new Set(["Все", ...items.map((item) => item.category)])
  );

  const [activeCategory, setActiveCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");

  // Фильтр
  const filtered = items
    .filter((item) =>
      activeCategory === "Все" ? true : item.category === activeCategory
    )
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="menu-page">
      <Header setActive={setActive} />

      {active && (
        <CartDrawer
          onClose={setActive}
          items={cart}
          setCart={setCart}
        />
      )}

      <SearchBar query={searchQuery} onChange={setSearchQuery} />

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      <MenuList
        items={filtered}
        onID={onID}
        setCart={setCart}
      />
    </div>
  );
}