import { useCallback } from 'react';
import { exportAllData } from '../../services/storageService';
import Button from '../common/Button';
import './ExportButton.css';

/**
 * 数据导出按钮
 * 将所有宠物数据导出为 JSON 文件并触发下载
 */
export default function ExportButton({ dataCount = 0 }) {
  const handleExport = useCallback(() => {
    const jsonStr = exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pet-translator-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="export-button">
      <Button variant="secondary" size="sm" onClick={handleExport}>
        📥 导出全部宠物数据
        {dataCount > 0 && <span className="export-button__count">{dataCount}条</span>}
      </Button>
    </div>
  );
}
