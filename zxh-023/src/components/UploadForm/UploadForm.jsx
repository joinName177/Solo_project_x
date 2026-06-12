import { useState, useRef, useCallback } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import PetSelector from '../PetSelector/PetSelector';
import EmotionPanel from '../EmotionPanel/EmotionPanel';
import './UploadForm.css';

/**
 * 上传表单
 * 用户可以上传宠物照片、选择情绪、自定义翻译文字
 */
export default function UploadForm({ onUpload }) {
  const [petType, setPetType] = useState('');
  const [emotion, setEmotion] = useState('');
  const [customText, setCustomText] = useState('');
  const [petName, setPetName] = useState('');
  const [photoData, setPhotoData] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoData(reader.result);
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      handleFile(file);
    },
    [handleFile],
  );

  const handleSubmit = () => {
    if (!petType || !emotion) return;
    onUpload({ petType, emotion, customText: customText.trim(), petPhoto: photoData, petName: petName.trim() });
    // Reset
    setCustomText('');
    setPetName('');
    setPhotoData(null);
    setPhotoPreview(null);
    setPetType('');
    setEmotion('');
  };

  const canSubmit = petType && emotion;

  return (
    <Card className="upload-form">
      <h3 className="upload-form__title">📸 晒晒你的宠物</h3>

      {/* Photo upload area */}
      <div
        className={`upload-form__photo-area ${dragOver ? 'upload-form__photo-area--drag' : ''} ${photoPreview ? 'upload-form__photo-area--has-photo' : ''}`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {photoPreview ? (
          <img src={photoPreview} alt="宠物照片预览" className="upload-form__preview" />
        ) : (
          <div className="upload-form__photo-placeholder">
            <span>📷</span>
            <p>点击或拖拽上传宠物照片</p>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {/* Pet name */}
      <input
        className="upload-form__input"
        type="text"
        placeholder="宠物名字（选填）"
        value={petName}
        onChange={(e) => setPetName(e.target.value)}
        maxLength={20}
      />

      {/* Pet type */}
      <PetSelector selected={petType} onSelect={setPetType} />

      {/* Emotion */}
      <EmotionPanel selected={emotion} onSelect={setEmotion} disabled={!petType} />

      {/* Custom text */}
      <textarea
        className="upload-form__textarea"
        placeholder="写一句你想翻译的宠物心声……（选填，不填则自动生成）"
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        rows={3}
        maxLength={100}
      />

      <Button variant="primary" size="lg" disabled={!canSubmit} onClick={handleSubmit}>
        🚀 发布翻译
      </Button>
    </Card>
  );
}
