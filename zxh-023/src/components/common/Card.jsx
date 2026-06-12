import './Card.css';

/**
 * 通用卡片容器
 * 统一圆角、阴影、内边距风格
 */
export default function Card({ children, className = '', variant = 'default', onClick }) {
  const cls = ['card', `card--${variant}`, onClick ? 'card--clickable' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {children}
    </div>
  );
}
