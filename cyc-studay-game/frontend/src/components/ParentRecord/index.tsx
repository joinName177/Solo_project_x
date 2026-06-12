import { useState } from "react";
import { ParentRecord as ParentRecordType } from "../../types";

interface Props {
  record: ParentRecordType | null;
  onSave: (hardest: string, happiest: string) => void;
}

export function ParentRecord({ record, onSave }: Props) {
  const [hardest, setHardest] = useState(record?.hardest || "");
  const [happiest, setHappiest] = useState(record?.happiest || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(hardest, happiest);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      style={{
        background: "#f3e5f5",
        padding: "16px 20px",
        borderRadius: 16,
        marginTop: 16,
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>
        📝 家长观察记录
      </div>
      <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 4 }}>
        今天最难的部分：
      </label>
      <input
        value={hardest}
        onChange={(e) => setHardest(e.target.value)}
        placeholder="例如：过隧道时不敢低头"
        style={inputStyle}
      />
      <label
        style={{
          display: "block",
          fontSize: 13,
          color: "#666",
          marginBottom: 4,
          marginTop: 10,
        }}
      >
        孩子最开心的部分：
      </label>
      <input
        value={happiest}
        onChange={(e) => setHappiest(e.target.value)}
        placeholder="例如：倒车成功时大笑"
        style={inputStyle}
      />
      <button
        onClick={handleSave}
        style={{
          marginTop: 12,
          padding: "10px 24px",
          fontSize: 15,
          background: saved ? "#4caf50" : "#7b1fa2",
          color: "#fff",
          border: "none",
          borderRadius: 25,
          cursor: "pointer",
        }}
      >
        {saved ? "已保存 ✓" : "保存记录"}
      </button>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  fontSize: 14,
  border: "1px solid #ddd",
  borderRadius: 10,
  boxSizing: "border-box",
  outline: "none",
};
