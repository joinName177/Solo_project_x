import { petTypeLabels } from '../../services/memeLibrary';
import './PetSelector.css';

/**
 * 宠物类型选择器
 * 点击猫或狗头像进行选择
 */
export default function PetSelector({ selected, onSelect }) {
  return (
    <div className="pet-selector">
      <h3 className="pet-selector__title">🐾 选择你的宠物</h3>
      <div className="pet-selector__options">
        {Object.entries(petTypeLabels).map(([key, { zh, icon }]) => (
          <button
            key={key}
            className={`pet-avatar ${selected === key ? 'pet-avatar--selected' : ''}`}
            onClick={() => onSelect(key)}
            title={zh}
          >
            <span className="pet-avatar__icon">{icon}</span>
            <span className="pet-avatar__label">{zh}</span>
            {selected === key && <span className="pet-avatar__check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
