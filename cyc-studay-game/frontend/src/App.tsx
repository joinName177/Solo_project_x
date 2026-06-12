import { useState } from "react";
import { TodayTaskPage } from "./pages/TodayTask";
import { WeekOverviewPage } from "./pages/WeekOverview";
import { CertificatePrintPage } from "./pages/Certificate";
import { colors, gradient } from "./theme";

type Tab = "today" | "week" | "cert";

const tabs: [Tab, string, string][] = [
  ["today", "📋", "今日任务"],
  ["week", "📅", "本周总览"],
  ["cert", "🏆", "证书"],
];

export default function App() {
  const [tab, setTab] = useState<Tab>("today");

  return (
    <div style={{ minHeight: "100vh", background: colors.bg }}>
      <header
        style={{
          background: gradient(colors.primary, colors.primaryLight),
          color: colors.white,
          padding: "16px 20px",
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(255,107,53,0.3)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "clamp(20px, 5vw, 24px)" }}>
          🚗 小司机送货啦
        </h1>
        <p style={{ fontSize: "clamp(12px, 3vw, 13px)", opacity: 0.85, marginTop: 4 }}>
          3-6岁感统训练游戏
        </p>
      </header>

      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          background: colors.white,
          borderBottom: `1px solid ${colors.border}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {tabs.map(([key, icon, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              flex: 1,
              maxWidth: 160,
              padding: "12px 8px",
              fontSize: "clamp(13px, 3.5vw, 15px)",
              border: "none",
              background: "transparent",
              color: tab === key ? colors.primary : colors.textMuted,
              fontWeight: tab === key ? "bold" : "normal",
              borderBottom:
                tab === key
                  ? `3px solid ${colors.primary}`
                  : "3px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <span style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <main style={{ paddingBottom: 40 }}>
        {tab === "today" && <TodayTaskPage />}
        {tab === "week" && <WeekOverviewPage />}
        {tab === "cert" && <CertificatePrintPage />}
      </main>
    </div>
  );
}
