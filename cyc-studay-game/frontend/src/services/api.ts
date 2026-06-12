const BASE = "/api";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "请求失败" }));
    throw new Error(err.detail || "请求失败");
  }
  return res.json();
}

export const api = {
  getTodayTask: () => request<any>("/tasks/today"),
  getAllTasks: () => request<any[]>("/tasks"),
  getTask: (id: number) => request<any>(`/tasks/${id}`),

  getStickers: (date: string) => request<any[]>(`/stickers?date=${date}`),
  getTotalStickers: () => request<{ total: number }>("/stickers/total"),
  addSticker: (taskId: number) =>
    request<any>(`/stickers?task_id=${taskId}`, { method: "POST" }),
  removeSticker: (id: number) =>
    request<any>(`/stickers/${id}`, { method: "DELETE" }),
  getLevel: () => request<any>("/level"),

  getRecord: (date: string) => request<any>(`/records?date=${date}`),
  getWeekRecords: () => request<any[]>("/records/week"),
  saveRecord: (body: {
    task_id: number;
    date: string;
    hardest: string;
    happiest: string;
  }) => request<any>("/records", { method: "POST", body: JSON.stringify(body) }),
};
