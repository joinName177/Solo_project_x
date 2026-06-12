import './Button.css';

/**
 * 通用按钮组件
 * 支持多种变体：primary, secondary, ghost, danger, icon
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  title,
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled ? 'btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cls} disabled={disabled} onClick={onClick} type={type} title={title}>
      {children}
    </button>
  );
}
