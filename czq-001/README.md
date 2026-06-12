# 🧮 农资投入计算器

纯前端 Vue 3 应用，用于估算农业生产中各项投入的数量和成本。

## 功能

- **投入估算**：根据作物种类和种植面积，自动估算种子、化肥、农药、地膜、灌溉、人工、机械等各项投入
- **实时计算**：修改任意单价或用量，总成本实时更新
- **自定义调整**：所有参考标准均可手动修改，支持添加自定义投入项
- **对比模式**：并排比较两种种植方案（如常规 vs 绿色种植）的成本和利润差异
- **投入产出分析**：可视化图表展示成本、收入、利润关系
- **成本档案**：保存/加载多个方案，数据存储在 localStorage
- **导出功能**：支持导出为 Excel (CSV) 和 PDF

## 技术栈

- Vue 3 (Composition API, `<script setup>`)
- Vite
- Chart.js
- jsPDF + html2canvas
- SheetJS (xlsx)

## 项目结构

```
src/
├── constants/       # 作物参考标准数据
├── utils/           # 格式化、验证工具函数
├── composables/     # 核心业务逻辑 (组合式函数)
│   ├── useCalculator.js   # 计算引擎
│   ├── useComparison.js   # 对比模式
│   ├── useArchive.js      # 档案持久化
│   ├── useExport.js       # 导出功能
│   └── useApp.js          # 应用协调层
├── components/
│   ├── calculator/  # 计算器面板及子组件
│   ├── comparison/  # 对比视图
│   ├── archive/     # 档案管理
│   ├── analysis/    # 图表分析
│   └── common/      # 通用组件
├── App.vue          # 根组件 (薄视图层)
└── main.js          # 入口
```

## 运行

```bash
npm install
npm run dev      # 开发模式 (http://localhost:3000)
npm run build    # 生产构建
```

## 预设作物

| 作物 | 产量(公斤/亩) | 特点 |
|------|-------------|------|
| 🌽 玉米 | 600 | 需地膜 |
| 🌾 小麦 | 450 | 种子用量大 |
| 🍚 水稻 | 550 | 灌溉次数多 |
| 🫘 大豆 | 200 | 种子单价高 |
| 🥬 蔬菜 | 2000 | 人工投入大 |
