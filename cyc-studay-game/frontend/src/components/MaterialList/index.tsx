const MATERIALS = [
  { item: "托盘/硬纸板", qty: "1个", days: "每天" },
  { item: "小球（网球大小）", qty: "1个", days: "每天" },
  { item: "矮枕头", qty: "2个", days: "周二" },
  { item: "大纸箱", qty: "1个", days: "周三" },
  { item: "水瓶/积木", qty: "3个", days: "周五" },
  { item: "绳子/胶带", qty: "若干", days: "周六" },
  { item: "汽车贴纸", qty: "21颗", days: "每天" },
];

export function MaterialList() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        marginBottom: 20,
      }}
    >
      <h3 style={{ margin: "0 0 12px", fontSize: 17 }}>📦 物料总清单</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
            <th style={{ padding: "6px 0" }}>物品</th>
            <th style={{ padding: "6px 0" }}>数量</th>
            <th style={{ padding: "6px 0" }}>使用日</th>
          </tr>
        </thead>
        <tbody>
          {MATERIALS.map((m, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td style={{ padding: "8px 0" }}>{m.item}</td>
              <td style={{ padding: "8px 0", color: "#666" }}>{m.qty}</td>
              <td style={{ padding: "8px 0", color: "#999" }}>{m.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
