import { LevelInfo } from "../../types";

interface Props {
  level: LevelInfo | null;
}

export function LevelBadge({ level }: Props) {
  if (!level) return null;

  const progress = level.next_threshold
    ? Math.min(
        100,
        Math.round((level.total_stickers / level.next_threshold) * 100)
      )
    : 100;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a237e, #283593)",
        color: "#fff",
        padding: "16px 20px",
        borderRadius: 16,
        marginBottom: 20,
      }}
    >
      <div style={{ fontSize: 13, opacity: 0.8 }}>🪪 司机驾照</div>
      <div style={{ fontSize: 22, fontWeight: "bold", marginTop: 4 }}>
        {level.current_level}
      </div>
      <div style={{ fontSize: 13, marginTop: 2, opacity: 0.9 }}>
        🏆 {level.current_reward}
      </div>

      {level.next_level && (
        <div style={{ marginTop: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            <span>
              距 {level.next_level}：{level.total_stickers}/{level.next_threshold}
            </span>
          </div>
          <div
            style={{
              height: 8,
              background: "rgba(255,255,255,0.3)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #FFD54F, #FF6B35)",
                borderRadius: 4,
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
