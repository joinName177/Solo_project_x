import { emotionLabels } from '../../services/memeLibrary';
import './EmotionPanel.css';

/**
 * 情绪选择面板
 * 6 个预设情绪按钮，排列为可爱的圆角卡片
 */
export default function EmotionPanel({ selected, onSelect, disabled }) {
  return (
    <div className="emotion-panel">
      <h3 className="emotion-panel__title">
        💬 今天心情如何？
        {disabled && <span className="emotion-panel__hint">（请先选择宠物）</span>}
      </h3>
      <div className="emotion-panel__grid">
        {Object.entries(emotionLabels).map(([key, { zh, icon }]) => (
          <button
            key={key}
            className={`emotion-btn ${selected === key ? 'emotion-btn--selected' : ''}`}
            onClick={() => onSelect(key)}
            disabled={disabled}
          >
            <span className="emotion-btn__icon">{icon}</span>
            <span className="emotion-btn__label">{zh}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
