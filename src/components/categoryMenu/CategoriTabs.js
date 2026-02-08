import "./Category.css";

export default function CategoryTabs({
  categories,
  activeCategory,
  onChange
}) {
  return (
    <div className="category-tabs">
      {categories.map(cat => (
        <button
          key={cat}
          className={
            activeCategory === cat
              ? "category-tab active"
              : "category-tab"
          }
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}