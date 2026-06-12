import './EmergencyMode.css';

export default function EmergencyMode({ isEmergency, onToggle }) {
  return (
    <button
      className={`emergency-btn ${isEmergency ? 'emergency-btn--active' : ''}`}
      onClick={onToggle}
    >
      <span className="emergency-icon">{isEmergency ? '🚨' : '🆘'}</span>
      <span className="emergency-label">
        {isEmergency ? '救命模式已开启' : '救命模式'}
      </span>
      <span className="emergency-desc">
        {isEmergency
          ? '只推荐现有食材能做的菜'
          : '只有这些食材且不能出门买'}
      </span>
    </button>
  );
}
