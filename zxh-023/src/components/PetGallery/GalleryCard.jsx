import { emotionLabels, petTypeLabels } from '../../services/memeLibrary';
import Button from '../common/Button';
import './GalleryCard.css';

/**
 * 画廊单张卡片
 * 展示用户上传的宠物照片、翻译和点赞
 */
export default function GalleryCard({ entry, onLike, onDelete }) {
  const { id, petType, emotion, translationText, memeEmoji, petPhoto, petName, likes, timestamp } = entry;
  const petLabel = petTypeLabels[petType] || {};
  const emotionLabel = emotionLabels[emotion] || {};

  return (
    <div className="gallery-card">
      {/* Photo */}
      <div className="gallery-card__photo">
        {petPhoto ? (
          <img src={petPhoto} alt={petName} />
        ) : (
          <div className="gallery-card__emoji-placeholder">{memeEmoji}</div>
        )}
      </div>

      {/* Info */}
      <div className="gallery-card__body">
        <div className="gallery-card__header">
          <span className="gallery-card__name">{petName || '未命名'}</span>
          <span className="gallery-card__tag">{petLabel.icon} {petLabel.zh}</span>
        </div>

        <div className="gallery-card__tags">
          <span className="gallery-card__tag gallery-card__tag--emotion">
            {emotionLabel.icon} {emotionLabel.zh}
          </span>
        </div>

        <p className="gallery-card__text">「{translationText}」</p>

        <div className="gallery-card__footer">
          <Button variant="ghost" size="sm" onClick={() => onLike(id)} title="点赞">
            ❤️ <span className="gallery-card__likes">{likes || 0}</span>
          </Button>
          <span className="gallery-card__time">
            {new Date(timestamp).toLocaleDateString('zh-CN')}
          </span>
          <Button variant="ghost" size="sm" onClick={() => onDelete(id)} title="删除">
            🗑️
          </Button>
        </div>
      </div>
    </div>
  );
}
