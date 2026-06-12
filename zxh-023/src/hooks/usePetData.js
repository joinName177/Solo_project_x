import { useState, useCallback, useEffect } from 'react';
import { loadAllPetData } from '../services/storageService';

/**
 * 宠物数据管理 Hook
 * 提供数据列表、刷新、点赞、删除等操作
 */
function usePetData() {
  const [dataList, setDataList] = useState([]);

  const refresh = useCallback(() => {
    setDataList(loadAllPetData());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const gallery = dataList.filter((item) => item.isUserUpload);
  const history = dataList;

  return { dataList, gallery, history, refresh };
}

export default usePetData;
