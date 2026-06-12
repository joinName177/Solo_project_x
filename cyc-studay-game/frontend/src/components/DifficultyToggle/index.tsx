interface Props {
  easyMode: string | null;
  hardMode: string | null;
}

export function DifficultyToggle({ easyMode, hardMode }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginTop: 12,
        fontSize: 13,
        color: "#666",
      }}
    >
      {easyMode && (
        <div
          style={{
            flex: 1,
            background: "#e8f5e9",
            padding: "8px 12px",
            borderRadius: 10,
          }}
        >
          🟢 降难度：{easyMode}
        </div>
      )}
      {hardMode && (
        <div
          style={{
            flex: 1,
            background: "#fce4ec",
            padding: "8px 12px",
            borderRadius: 10,
          }}
        >
          🔴 升难度：{hardMode}
        </div>
      )}
    </div>
  );
}
