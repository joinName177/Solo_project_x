import GalleryCard from './GalleryCard';
import './PetGallery.css';

/**
 * 宠物画廊
 * 展示所有用户上传的宠物翻译
 */
export default function PetGallery({ items, onLike, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <div className="pet-gallery">
        <h3 className="pet-gallery__title">🖼️ 宠物画廊</h3>
        <div className="pet-gallery__empty">
          <span>🐾</span>
          <p>还没有人上传宠物照片，来做第一个吧！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pet-gallery">
      <h3 className="pet-gallery__title">🖼️ 宠物画廊 ({items.length})</h3>
      <div className="pet-gallery__grid">
        {items.map((entry) => (
          <GalleryCard key={entry.id} entry={entry} onLike={onLike} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
