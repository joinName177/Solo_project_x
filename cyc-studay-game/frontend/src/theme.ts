export const colors = {
  primary: "#FF6B35",
  primaryDark: "#e65100",
  primaryLight: "#f7931e",
  accent: "#FFD54F",
  bg: "#f9f9f9",
  white: "#fff",
  text: "#333",
  textSecondary: "#666",
  textMuted: "#999",
  border: "#eee",
  success: "#4caf50",
  purple: "#7b1fa2",
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 25,
};

export const shadow = (opacity = 0.08) =>
  `0 4px 20px rgba(0,0,0,${opacity})`;

export const gradient = (from: string, to: string) =>
  `linear-gradient(135deg, ${from}, ${to})`;

export const pageMaxWidth = "640px";
