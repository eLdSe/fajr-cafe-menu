import "./Header.css";


const Header = ({ setActive }) => {
    return (
        <div className="header">
            <div className="header-left">
                <h1 className="fajr-title">FAJR</h1>
                <h2>coffee & breakfast</h2>
            </div>

            <button className="cart-btn" onClick={() => setActive(true)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4h-2l-1 2h16l-3 9h-10l-1-2h9" />
                    <circle cx="9" cy="20" r="2" />
                    <circle cx="17" cy="20" r="2" />
                </svg>
            </button>
        </div>
    );
};

export default Header;