import { useState } from "react";

export function WarmUp() {
  const [step, setStep] = useState(0);

  const steps = ["蹲下", "双手转方向盘", '"滴滴！"', "站起来出发！"];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FF6B35, #f7931e)",
        color: "#fff",
        padding: "16px 20px",
        borderRadius: 16,
        textAlign: "center",
        cursor: "pointer",
        marginBottom: 20,
      }}
      onClick={() => setStep((s) => (s + 1) % steps.length)}
    >
      <div style={{ fontSize: 14, opacity: 0.85 }}>🚗 发车仪式</div>
      <div style={{ fontSize: 28, marginTop: 6, fontWeight: "bold" }}>
        {steps[step]}
      </div>
      <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>
        点击切换步骤
      </div>
    </div>
  );
}
