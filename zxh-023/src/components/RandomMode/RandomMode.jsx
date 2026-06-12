import Button from '../common/Button';
import Card from '../common/Card';
import './RandomMode.css';

/**
 * 随机翻译模式
 * 一键随机生成无厘头宠物心声
 */
export default function RandomMode({ onRandom, isLoading }) {
  return (
    <Card className="random-mode" variant="filled">
      <div className="random-mode__content">
        <span className="random-mode__icon">🎲</span>
        <div className="random-mode__info">
          <h4>随机翻译模式</h4>
          <p>随机生成一句无厘头宠物心声</p>
        </div>
      </div>
      <Button
        variant="primary"
        size="lg"
        onClick={onRandom}
        disabled={isLoading}
      >
        {isLoading ? '🔮 翻译中...' : '🎰 来一句随机的！'}
      </Button>
    </Card>
  );
}
