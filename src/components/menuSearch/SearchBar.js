import "./SearchBar.css";

export default function SearchBar({ query, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Поиск по меню..."
        value={query}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}