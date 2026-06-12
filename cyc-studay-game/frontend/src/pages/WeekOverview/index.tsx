import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { TaskCard, StickerRecord } from "../../types";
import { TaskCard as TaskCardComponent } from "../../components/TaskCard";
import { DAY_NAMES } from "../../types";

export function WeekOverviewPage() {
  const [tasks, setTasks] = useState<TaskCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getAllTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

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
        加载中...
      </div>
    );
  }

  const todayDow = new Date().getDay() || 7;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: 8 }}>
        📅 本周任务一览
      </h2>
      <div style={{ textAlign: "center", color: "#999", fontSize: 14, marginBottom: 20 }}>
        点击「今日任务」查看当天卡片详情
      </div>

      {tasks.map((task) => (
        <div key={task.id} style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 14,
              color: task.day_of_week === todayDow ? "#FF6B35" : "#999",
              fontWeight: task.day_of_week === todayDow ? "bold" : "normal",
              marginBottom: 4,
            }}
          >
            {DAY_NAMES[task.day_of_week]}
            {task.day_of_week === todayDow && " ← 今天"}
          </div>
          <TaskCardComponent
            task={task}
            highlight={task.day_of_week === todayDow}
          />
        </div>
      ))}
    </div>
  );
}
