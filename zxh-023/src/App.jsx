import { useState, useCallback } from 'react';
import usePetData from './hooks/usePetData';
import useTranslation from './hooks/useTranslation';
import PetSelector from './components/PetSelector/PetSelector';
import EmotionPanel from './components/EmotionPanel/EmotionPanel';
import TranslationCard from './components/TranslationCard/TranslationCard';
import UploadForm from './components/UploadForm/UploadForm';
import PetGallery from './components/PetGallery/PetGallery';
import RandomMode from './components/RandomMode/RandomMode';
import ExportButton from './components/ExportButton/ExportButton';
import './App.css';

function App() {
  const { gallery, dataList, refresh } = usePetData();
  const {
    currentTranslation,
    isLoading,
    translate,
    randomTranslate,
    saveCurrent,
    uploadTranslation,
    like,
    remove,
  } = useTranslation(refresh);

  const [petType, setPetType] = useState('');
  const [emotion, setEmotion] = useState('');
  const [activeTab, setActiveTab] = useState('translate');

  // 选择宠物后重置情绪
  const handlePetSelect = useCallback(
    (type) => {
      setPetType(type);
      setEmotion('');
    },
    [],
  );

  // 选择情绪后触发翻译
  const handleEmotionSelect = useCallback(
    (emo) => {
      setEmotion(emo);
      if (petType) {
        translate(petType, emo);
      }
    },
    [petType, translate],
  );

  const handleSave = useCallback(() => {
    saveCurrent();
    refresh();
  }, [saveCurrent, refresh]);

  const handleUpload = useCallback(
    (params) => {
      uploadTranslation({ ...params });
      refresh();
      setActiveTab('gallery');
    },
    [uploadTranslation, refresh],
  );

  const handleLike = useCallback(
    (id) => {
      like(id);
      refresh();
    },
    [like, refresh],
  );

  const handleDelete = useCallback(
    (id) => {
      remove(id);
      refresh();
    },
    [remove, refresh],
  );

  const tabs = [
    { key: 'translate', label: '翻译', icon: '🔮' },
    { key: 'upload', label: '晒宠', icon: '📸' },
    { key: 'gallery', label: '画廊', icon: '🖼️' },
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-header__title">
          <span className="app-header__logo">🐾</span>
          宠物翻译器
          <span className="app-header__subtitle">表情包版</span>
        </h1>
        <p className="app-header__desc">听懂宠物的心声，用表情包翻译它们的每个情绪！</p>
      </header>

      {/* Tab Navigation */}
      <nav className="app-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`app-tab ${activeTab === tab.key ? 'app-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="app-tab__icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="app-main">
        {activeTab === 'translate' && (
          <section className="app-section">
            <PetSelector selected={petType} onSelect={handlePetSelect} />
            <EmotionPanel selected={emotion} onSelect={handleEmotionSelect} disabled={!petType} />
            <TranslationCard
              translation={currentTranslation}
              isLoading={isLoading}
              onSave={handleSave}
            />
            <RandomMode onRandom={randomTranslate} isLoading={isLoading} />
          </section>
        )}

        {activeTab === 'upload' && (
          <section className="app-section">
            <UploadForm onUpload={handleUpload} />
          </section>
        )}

        {activeTab === 'gallery' && (
          <section className="app-section">
            <PetGallery items={gallery} onLike={handleLike} onDelete={handleDelete} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <ExportButton dataCount={dataList.length} />
        <p className="app-footer__info">
          共 {dataList.length} 条翻译记录 · 数据存储在本地浏览器
        </p>
      </footer>
    </div>
  );
}

export default App;
