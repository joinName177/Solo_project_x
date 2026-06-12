import { WarmUp } from "../../components/WarmUp";
import { LevelBadge } from "../../components/LevelBadge";
import { TaskCard } from "../../components/TaskCard";
import { StickerBoard } from "../../components/StickerBoard";
import { ParentRecord } from "../../components/ParentRecord";
import { MaterialList } from "../../components/MaterialList";
import { Certificate } from "../../components/Certificate";
import { useTodayTask } from "../../hooks/useTodayTask";
import { DAY_NAMES } from "../../types";

export function TodayTaskPage() {
  const {
    task,
    stickers,
    level,
    record,
    loading,
    addSticker,
    removeSticker,
    saveRecord,
  } = useTodayTask();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          fontSize: 18,
          color: "#999",
        }}
      >
        🚗 小司机正在发车...
      </div>
    );
  }

  if (!task) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: 40,
          fontSize: 18,
          color: "#999",
        }}
      >
        暂无今日任务，请检查系统时间或联系管理员。
      </div>
    );
  }

  const todayDow = new Date().getDay() || 7;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px" }}>
      <WarmUp />
      <LevelBadge level={level} />

      <div
        style={{
          textAlign: "center",
          marginBottom: 16,
          color: "#999",
          fontSize: 14,
        }}
      >
        {DAY_NAMES[todayDow]} · 每日任务
      </div>

      <TaskCard task={task} highlight />

      <StickerBoard
        stickers={stickers}
        dayOfWeek={todayDow}
        onAdd={addSticker}
        onRemove={removeSticker}
      />

      <ParentRecord record={record} onSave={saveRecord} />

      <MaterialList />

      <Certificate level={level} />
    </div>
  );
}
