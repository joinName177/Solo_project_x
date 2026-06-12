export interface TaskCard {
  id: number;
  day_of_week: number;
  name: string;
  action_desc: string;
  props: string | null;
  brain_goal: string;
  car_script: string;
  success_criteria: string;
  fail_script: string;
  easy_mode: string | null;
  hard_mode: string | null;
}

export interface StickerRecord {
  id: number;
  task_id: number;
  round: number;
  date: string;
  created_at: string;
}

export interface ParentRecord {
  id?: number;
  task_id: number;
  date: string;
  hardest: string;
  happiest: string;
}

export interface LevelInfo {
  total_stickers: number;
  current_level: string;
  current_reward: string;
  next_level: string | null;
  next_threshold: number | null;
}

export const DAY_NAMES: Record<number, string> = {
  1: "周一",
  2: "周二",
  3: "周三",
  4: "周四",
  5: "周五",
  6: "周六",
  7: "周日",
};

export const STICKER_ICONS: Record<number, string> = {
  6: "🌟",
  7: "🎖️",
};
