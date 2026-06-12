import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import { TaskCard, StickerRecord, LevelInfo, ParentRecord } from "../types";

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function useTodayTask() {
  const [task, setTask] = useState<TaskCard | null>(null);
  const [stickers, setStickers] = useState<StickerRecord[]>([]);
  const [level, setLevel] = useState<LevelInfo | null>(null);
  const [record, setRecord] = useState<ParentRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const date = todayStr();
      const [t, s, l, r] = await Promise.all([
        api.getTodayTask(),
        api.getStickers(date),
        api.getLevel(),
        api.getRecord(date),
      ]);
      setTask(t);
      setStickers(s);
      setLevel(l);
      setRecord(r);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addSticker = useCallback(async () => {
    if (!task) return;
    try {
      const result = await api.addSticker(task.id);
      setLevel(result.level);
      const date = todayStr();
      const s = await api.getStickers(date);
      setStickers(s);
    } catch (e: any) {
      alert(e.message || "操作失败");
    }
  }, [task]);

  const removeSticker = useCallback(async (id: number) => {
    try {
      const l = await api.removeSticker(id);
      setLevel(l);
      const date = todayStr();
      const s = await api.getStickers(date);
      setStickers(s);
    } catch (e: any) {
      alert(e.message || "操作失败");
    }
  }, []);

  const saveRecord = useCallback(
    async (hardest: string, happiest: string) => {
      if (!task) return;
      try {
        await api.saveRecord({
          task_id: task.id,
          date: todayStr(),
          hardest,
          happiest,
        });
        setRecord({ task_id: task.id, date: todayStr(), hardest, happiest });
      } catch (e: any) {
        alert(e.message || "保存失败");
      }
    },
    [task]
  );

  return {
    task,
    stickers,
    level,
    record,
    loading,
    addSticker,
    removeSticker,
    saveRecord,
    reload: load,
  };
}
