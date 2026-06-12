# 小司机送货啦 — 需求文档

## 1. 项目概述

### 1.1 项目名称
小司机送货啦（Little Driver Delivers）

### 1.2 项目简介
一款面向 3–6 岁儿童的感统训练辅助 Web 应用。将前庭觉、本体感觉、视觉追踪等训练目标包装为"小司机送货"游戏任务，家长通过应用查看每日任务卡片、记录完成情况，孩子通过贴纸和驾照升级体系获得激励。

### 1.3 目标用户
- **主要使用者**：家长（操作应用、查看任务、记录完成）
- **间接使用者**：3–6 岁儿童（在家长引导下看屏幕上的任务图示、贴贴纸）

### 1.4 适用年龄
3–6 岁（支持难度调节，3 岁以下降难度，6 岁以上加负重/速度）

---

## 2. 功能需求

### 2.1 任务卡片系统（核心）

#### 2.1.1 每日任务卡片
系统内置 7 张任务卡片（周一至周日），自动对应日期显示当天任务。

| 卡片 | 名称 | 动作描述 | 道具 | 小脑训练目标 |
|------|------|---------|------|-------------|
| 周一 | 直道送油桶 | 托盘+小球直线走 2–3 米 | 托盘/硬纸板、小球 | 视觉追踪 + 手腕稳定 + 前庭觉 |
| 周二 | 过减速带 | 持托盘跨过 2 个矮枕头 | 枕头 ×2 | 动态重心转移 + 下肢协调 |
| 周三 | 过隧道 | 端货物弯腰钻纸箱隧道 | 大纸箱 | 深度知觉 + 抗重力屈曲 + 本体感觉 |
| 周四 | 倒车入库 | 背对终点后退走 2 米 | 无额外道具 | 本体感觉 + 空间方位 |
| 周五 | S 形山路 | 绕 3 个水瓶/积木 S 形走 | 水瓶/积木 ×3 | 步态调整 + 视觉-动作整合 |
| 周六 | 自由路线 | 孩子自己设计路线 | 枕头/绳子/玩具 | 自主规划 + 创造动作组合 |
| 周日 | 金牌司机挑战赛 | 从周一到周六任选 2 个完成 | 根据所选任务 | 综合评估 + 自信心建立 |

#### 2.1.2 每张卡片包含字段
- 任务图示（emoji/插图占位）
- 动作步骤描述
- 车车话术（家长对孩子的引导语）
- 小脑训练目标
- 成功标志
- 失败处理话术
- 难度调节器（🟢降难度 / 🔴升难度）
- 贴纸记录区
- 家长观察记录栏（最难的部分 / 最开心的部分）

### 2.2 贴纸打卡系统

- 每完成一轮任务，可在贴纸区记录（每天最多 3 轮）
- 贴纸以 🚗 图标展示
- 周六使用 🌟 特殊星标
- 周日使用 🎖️ 奖牌图标
- 支持撤销（点错可取消）

### 2.3 驾照升级体系

| 等级 | 所需贴纸数 | 奖励 |
|------|-----------|------|
| 实习司机 | 3 颗 ⭐ | 实习贴纸（页面展示） |
| 正式司机 | 7 颗 ⭐ | 纸盘方向盘（页面展示） |
| 金牌司机 | 14 颗 ⭐ | 金牌司机证书（可打印） |
| 车队队长 | 21 颗 ⭐ | 解锁下周 2 个新任务 |

- 系统自动计算累计贴纸数，达到阈值自动升级
- 升级时弹出动画/祝贺语
- 证书页支持浏览器打印

### 2.4 物料清单

- 固定展示页：本周所需全部道具一览
- 按物品列出数量及使用日期

### 2.5 热身环节

- 每日任务页顶部显示"发车仪式"动画提示：
  > 蹲下 → 双手转方向盘 → "滴滴！" → 站起来出发

### 2.6 家长记录

- 每张任务卡片底部提供两个输入框：
  - 今天最难的部分
  - 孩子最开心的部分
- 数据持久化，支持按周回溯

### 2.7 扩展模式（V2 规划，本期不实现）

- 雨天备用卡（桌面版替代任务）
- 兄弟姐妹协作模式
- 计时挑战 + 历史折线图
- 7 天故事串联模式

---

## 3. 非功能需求

### 3.1 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React（函数组件 + Hooks） |
| 后端 | Python（FastAPI） |
| 数据库 | SQLite（轻量、零配置、单文件） |
| 部署 | Docker + Docker Compose |
| 版本管理 | Git，含 `.gitignore` 文件 |

### 3.2 架构原则

- **高内聚低耦合**：任务定义、打卡逻辑、升级计算、家长记录为独立模块
- 前端组件按功能拆分（卡片组件、贴纸组件、等级组件、记录组件）
- 后端按领域分层（router → service → repository）
- 前后端通过 RESTful API 通信

### 3.3 性能要求

- 页面首屏加载 < 3 秒
- 打卡操作响应 < 500ms
- 支持离线查看已加载的任务卡片（PWA 可选）

### 3.4 兼容性

- 支持移动端浏览器（家长主要在手机上查看）
- 响应式布局，适配 320px–1920px 宽度
- 支持 Chrome、Safari、Edge 最新两个版本

### 3.5 可维护性

- 任务卡片数据与展示逻辑分离（数据驱动渲染）
- 新增任务卡片仅需添加数据配置，无需修改组件代码
- 代码注释关键业务逻辑
- ESLint + Prettier 统一前端代码风格
- Python 端使用 Black + isort

---

## 4. 技术架构

### 4.1 系统架构图

```
┌──────────────────────────────────────────┐
│              浏览器 (React)               │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌──────────┐  │
│  │任务卡│ │贴纸 │ │等级 │ │家长记录  │  │
│  │组件 │ │组件 │ │组件 │ │组件      │  │
│  └──┬──┘ └──┬──┘ └──┬──┘ └────┬─────┘  │
│     └───────┴───────┴─────────┘         │
│              API Service Layer           │
└──────────────────┬───────────────────────┘
                   │ HTTP REST
┌──────────────────┴───────────────────────┐
│           FastAPI (Python)               │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐  │
│  │  Router  │ │  Router  │ │  Router │  │
│  │ (tasks)  │ │(stickers)│ │(records)│  │
│  └────┬─────┘ └────┬─────┘ └────┬────┘  │
│       └────────────┴────────────┘        │
│              Service Layer               │
│  ┌──────────────────────────────────┐    │
│  │         Repository Layer          │    │
│  └──────────────┬───────────────────┘    │
│                 │                        │
│  ┌──────────────┴───────────────────┐    │
│  │           SQLite                  │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│          Docker Compose                   │
│  ┌─────────────┐  ┌──────────────────┐   │
│  │  frontend    │  │     backend      │   │
│  │  (nginx)     │  │  (uvicorn)       │   │
│  │  :3000       │  │  :8000           │   │
│  └─────────────┘  └──────────────────┘   │
└──────────────────────────────────────────┘
```

### 4.2 前端目录结构

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskCard/           # 任务卡片组件
│   │   ├── StickerBoard/       # 贴纸打卡组件
│   │   ├── LevelBadge/         # 驾照等级徽章
│   │   ├── ParentRecord/       # 家长记录组件
│   │   ├── DifficultyToggle/   # 难度调节器
│   │   ├── MaterialList/       # 物料清单
│   │   ├── WarmUp/             # 热身仪式
│   │   └── Certificate/        # 证书打印
│   ├── pages/
│   │   ├── TodayTask/          # 今日任务页
│   │   ├── WeekOverview/       # 本周总览
│   │   └── Certificate/        # 证书页
│   ├── services/               # API 调用封装
│   ├── hooks/                  # 自定义 Hooks
│   ├── data/                   # 任务卡片静态数据
│   ├── types/                  # TypeScript 类型定义
│   └── App.tsx
├── Dockerfile
└── package.json
```

### 4.3 后端目录结构

```
backend/
├── app/
│   ├── routers/
│   │   ├── tasks.py            # 任务相关接口
│   │   ├── stickers.py         # 打卡相关接口
│   │   └── records.py          # 家长记录接口
│   ├── services/
│   │   ├── task_service.py     # 任务业务逻辑
│   │   ├── sticker_service.py  # 打卡业务逻辑
│   │   └── record_service.py   # 记录业务逻辑
│   ├── repositories/
│   │   ├── task_repo.py        # 任务数据访问
│   │   ├── sticker_repo.py     # 打卡数据访问
│   │   └── record_repo.py      # 记录数据访问
│   ├── models/
│   │   ├── task.py             # 任务数据模型
│   │   ├── sticker.py          # 打卡数据模型
│   │   └── record.py           # 记录数据模型
│   ├── data/
│   │   └── task_cards.py       # 7张任务卡片种子数据
│   └── main.py                 # 应用入口
├── requirements.txt
└── Dockerfile
```

### 4.4 数据库表设计

```sql
-- 任务卡片定义表（种子数据）
CREATE TABLE task_card (
    id          INTEGER PRIMARY KEY,
    day_of_week INTEGER NOT NULL,  -- 1=周一, 7=周日
    name        TEXT    NOT NULL,
    action_desc TEXT    NOT NULL,
    props       TEXT,              -- JSON array
    brain_goal  TEXT    NOT NULL,
    car_script  TEXT    NOT NULL,  -- 车车话术
    success_criteria TEXT NOT NULL,
    fail_script TEXT    NOT NULL,
    easy_mode   TEXT,              -- 降难度说明
    hard_mode   TEXT               -- 升难度说明
);

-- 打卡记录表
CREATE TABLE sticker_record (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id     INTEGER NOT NULL REFERENCES task_card(id),
    round       INTEGER NOT NULL,  -- 第几轮 (1-3)
    date        TEXT    NOT NULL,  -- YYYY-MM-DD
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- 家长观察记录表
CREATE TABLE parent_record (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id     INTEGER NOT NULL REFERENCES task_card(id),
    date        TEXT    NOT NULL,
    hardest     TEXT,              -- 最难的部分
    happiest    TEXT,              -- 最开心的部分
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);
```

---

## 5. API 接口设计

### 5.1 任务接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/tasks` | 获取全部任务卡片列表 |
| GET | `/api/tasks/today` | 获取今日任务卡片 |
| GET | `/api/tasks/{id}` | 获取单个任务卡片详情 |

### 5.2 打卡接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/stickers` | 新增一条打卡记录 |
| GET | `/api/stickers?date=YYYY-MM-DD` | 查询指定日期打卡 |
| GET | `/api/stickers/total` | 获取累计贴纸总数 |
| DELETE | `/api/stickers/{id}` | 撤销一条打卡（误操作） |

### 5.3 家长记录接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/records` | 保存/更新观察记录 |
| GET | `/api/records?date=YYYY-MM-DD` | 查询指定日期记录 |
| GET | `/api/records/week` | 查询本周全部记录 |

### 5.4 等级接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/level` | 获取当前司机等级及进度 |

---

## 6. 部署方案

### 6.1 Docker Compose

```yaml
version: "3.9"
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data       # SQLite 数据持久化
    environment:
      - DATABASE_URL=sqlite:///app/data/app.db

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

### 6.2 启动命令

```bash
# 开发环境
docker compose up --build

# 生产环境
docker compose -f docker-compose.yml up -d
```

### 6.3 Git 忽略

`.gitignore` 需包含：
- `node_modules/`
- `__pycache__/`、`*.pyc`
- `data/`（SQLite 运行时数据）
- `.env`
- `dist/`、`build/`
- IDE 配置目录（`.vscode/`、`.idea/`）
- `*.log`

---

## 7. 开发阶段规划

| 阶段 | 内容 | 产出物 |
|------|------|--------|
| 阶段一 | 项目脚手架搭建 | React 项目 + FastAPI 项目 + Docker 配置 + .gitignore |
| 阶段二 | 任务卡片静态数据 + 前端展示 | 7 张卡片可查看，当天卡片高亮 |
| 阶段三 | 贴纸打卡 CRUD | 打卡/撤销/统计 |
| 阶段四 | 驾照升级逻辑 | 累计计算 + 等级徽章 + 升级动画 |
| 阶段五 | 家长记录功能 | 表单保存 + 按周查询 |
| 阶段六 | 物料清单 + 热身环节 + 证书打印 | 辅助功能补齐 |
| 阶段七 | 高内聚低耦合重构 | 模块边界清晰化、依赖倒置、数据配置化 |
| 阶段八 | 移动端响应式适配 | 触屏优化、适配测试 |

---

## 8. 验收标准

- [ ] `docker compose up` 一键启动前后端
- [ ] 打开浏览器可见今日任务卡片
- [ ] 可完成贴纸打卡（1–3 轮）并撤销
- [ ] 累计贴纸达标后自动升级并弹窗祝贺
- [ ] 家长可填写并保存观察记录
- [ ] 证书页支持浏览器打印
- [ ] 移动端浏览器布局正常
- [ ] 代码结构满足高内聚低耦合（经重构后）
- [ ] `.gitignore` 正确排除不应提交的文件
