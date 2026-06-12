import { emotionLabels, petTypeLabels } from '../../services/memeLibrary';
import Button from '../common/Button';
import Card from '../common/Card';
import './TranslationCard.css';

/**
 * 翻译结果展示卡片
 * 展示表情包 + 翻译文字，支持保存到历史
 */
export default function TranslationCard({ translation, isLoading, onSave }) {
  if (isLoading) {
    return (
      <Card className="translation-card translation-card--loading">
        <div className="translation-card__loader">
          <span className="translation-card__loader-icon">🔮</span>
          <p>正在翻译宠物心声……</p>
          <div className="translation-card__spinner" />
        </div>
      </Card>
    );
  }

  if (!translation) {
    return (
      <Card className="translation-card translation-card--empty">
        <div className="translation-card__placeholder">
          <span className="translation-card__placeholder-icon">🐾</span>
          <p>选择宠物和情绪，看看它们在说什么吧～</p>
        </div>
      </Card>
    );
  }

  const { petType, emotion, translationText, memeEmoji, isRandom } = translation;
  const petLabel = petTypeLabels[petType] || {};
  const emotionLabel = emotionLabels[emotion] || {};

  return (
    <Card className={`translation-card ${isRandom ? 'translation-card--random' : ''}`}>
      {isRandom && <span className="translation-card__badge">🎲 随机</span>}

      <div className="translation-card__meme">
        <span className="translation-card__emoji">{memeEmoji}</span>
      </div>

      <div className="translation-card__meta">
        <span className="translation-card__tag">{petLabel.icon} {petLabel.zh}</span>
        <span className="translation-card__tag">{emotionLabel.icon} {emotionLabel.zh}</span>
      </div>

      <blockquote className="translation-card__text">
        「{translationText}」
      </blockquote>

      <div className="translation-card__actions">
        <Button variant="primary" size="sm" onClick={onSave}>
          💾 保存到历史
        </Button>
      </div>
    </Card>
  );
}
