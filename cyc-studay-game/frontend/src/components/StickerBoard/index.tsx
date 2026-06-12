import { StickerRecord } from "../../types";
import { STICKER_ICONS } from "../../types";

interface Props {
  stickers: StickerRecord[];
  dayOfWeek: number;
  onAdd: () => void;
  onRemove: (id: number) => void;
}

const MAX_ROUNDS = 3;

export function StickerBoard({ stickers, dayOfWeek, onAdd, onRemove }: Props) {
  const icon = STICKER_ICONS[dayOfWeek] || "🚗";
  const canAdd = stickers.length < MAX_ROUNDS;

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 8 }}>
        ⭐ 贴纸区（{stickers.length}/{MAX_ROUNDS}）
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {Array.from({ length: MAX_ROUNDS }).map((_, i) => {
          const record = stickers[i];
          return (
            <div
              key={i}
              onClick={() => record && onRemove(record.id)}
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                border: "2px dashed #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                background: record ? "#fff9c4" : "#fafafa",
                cursor: record ? "pointer" : "default",
                transition: "transform 0.2s",
              }}
              title={record ? "点击撤销" : ""}
            >
              {record ? icon : ""}
            </div>
          );
        })}
      </div>
      {canAdd && (
        <button
          onClick={onAdd}
          style={{
            marginTop: 10,
            padding: "10px 24px",
            fontSize: 16,
            background: "linear-gradient(135deg, #FF6B35, #f7931e)",
            color: "#fff",
            border: "none",
            borderRadius: 25,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          贴一张 🚗
        </button>
      )}
    </div>
  );
}
