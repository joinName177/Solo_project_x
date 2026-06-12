import { TaskCard as TaskCardType } from "../../types";
import { DifficultyToggle } from "../DifficultyToggle";

interface Props {
  task: TaskCardType;
  highlight?: boolean;
}

export function TaskCard({ task, highlight }: Props) {
  return (
    <div
      style={{
        background: highlight ? "#fff8e1" : "#fff",
        borderRadius: 20,
        padding: 24,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: highlight ? "2px solid #FF6B35" : "1px solid #eee",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 22, color: "#333" }}>{task.name}</h2>
        <span
          style={{
            background: "#FF6B35",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 13,
          }}
        >
          任务 {task.id}
        </span>
      </div>

      <div
        style={{
          background: "#f5f5f5",
          padding: 12,
          borderRadius: 10,
          fontSize: 15,
          color: "#555",
          marginBottom: 12,
        }}
      >
        {task.action_desc}
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>🗣️ 车车话术</div>
        <div
          style={{
            background: "#e3f2fd",
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: 15,
            color: "#1565c0",
            fontStyle: "italic",
          }}
        >
          "{task.car_script}"
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
        <InfoBlock label="🧠 小脑目标" text={task.brain_goal} />
        <InfoBlock label="✅ 成功标志" text={task.success_criteria} />
      </div>

      <div
        style={{
          background: "#fff3e0",
          padding: "10px 14px",
          borderRadius: 10,
          fontSize: 14,
          color: "#e65100",
        }}
      >
        💬 失败时：{task.fail_script}
      </div>

      <DifficultyToggle
        easyMode={task.easy_mode}
        hardMode={task.hard_mode}
      />
    </div>
  );
}

function InfoBlock({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ minWidth: 140 }}>
      <div style={{ fontSize: 12, color: "#999", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, color: "#333" }}>{text}</div>
    </div>
  );
}
