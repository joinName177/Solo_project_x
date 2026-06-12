import { LevelInfo } from "../../types";
import { colors } from "../../theme";

interface Props {
  level: LevelInfo | null;
}

export function Certificate({ level }: Props) {
  if (!level || level.total_stickers < 14) return null;

  const handlePrint = () => window.print();

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <button
        onClick={handlePrint}
        style={{
          padding: "12px 32px",
          fontSize: 16,
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
          color: colors.text,
          border: "none",
          borderRadius: 25,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🖨️ 打印金牌司机证书
      </button>
    </div>
  );
}

export function CertificatePrintView({ level }: Props) {
  if (!level) return null;

  return (
    <div
      id="certificate-print"
      style={{
        padding: "clamp(20px, 5vw, 40px)",
        textAlign: "center",
        border: `4px double ${colors.accent}`,
        borderRadius: 20,
        maxWidth: 600,
        margin: "clamp(20px, 5vw, 40px) auto",
        background: "#fffef5",
      }}
    >
      <div style={{ fontSize: "clamp(32px, 8vw, 48px)" }}>🏆</div>
      <h1
        style={{
          fontSize: "clamp(20px, 5vw, 28px)",
          color: colors.primaryDark,
          margin: "12px 0",
        }}
      >
        金牌司机证书
      </h1>
      <div style={{ fontSize: "clamp(16px, 4vw, 18px)", color: colors.text, marginBottom: 8 }}>
        恭喜你成为
      </div>
      <div
        style={{
          fontSize: "clamp(24px, 7vw, 36px)",
          fontWeight: "bold",
          color: colors.primary,
          marginBottom: 12,
        }}
      >
        {level.current_level}
      </div>
      <div style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: colors.textSecondary }}>
        累计完成 <strong>{level.total_stickers}</strong> 次任务
      </div>
      <div
        style={{
          fontSize: "clamp(12px, 3vw, 13px)",
          color: colors.textMuted,
          marginTop: 8,
        }}
      >
        奖励：{level.current_reward}
      </div>
      <div
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: "1px solid #ddd",
          fontSize: "clamp(11px, 2.5vw, 12px)",
          color: "#aaa",
        }}
      >
        小司机送货啦 · 家长签名：________ · 日期：________
      </div>
    </div>
  );
}
