import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-icon">🧊</div>
      <div className="header-text">
        <h1 className="header-title">冰箱剩菜侦探</h1>
        <p className="header-subtitle">打开冰箱，看看今天能变出什么好吃的？</p>
      </div>
    </header>
  );
}
