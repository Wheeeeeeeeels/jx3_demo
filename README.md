# JX3 Demo

基于TypeScript和Babylon.js的剑网3游戏核心玩法演示项目。

## 功能特性

### 已实现功能

#### 角色系统
- 属性系统（体质、根骨、力道、身法、元气）
- 状态系统（气血、内力、体力、经验值、等级）
- 门派系统
- 装备系统（基础框架）

#### 战斗系统
- 技能系统
  - 技能效果（伤害、治疗、增益、减益）
  - 技能管理器
  - 技能冷却
- 伤害计算
  - 基础伤害公式
  - 属性加成
- Buff系统
  - Buff效果定义
  - Buff管理器
  - 增益/减益效果
- 连招系统
  - 连招效果
  - 连招管理器
  - 连招触发

#### 3D渲染
- Babylon.js集成
  - 场景管理
  - 角色模型
  - 相机控制
  - 光照系统

#### UI系统
- 状态面板
  - 角色信息
  - 属性显示
  - 状态条

### 开发中功能
- 装备系统完善
- 任务系统
- 地图系统
- 社交系统

## 技术栈

- 语言：TypeScript
- 游戏引擎：Babylon.js
- 构建工具：Webpack
- 代码规范：ESLint + Prettier
- 架构模式：DDD（领域驱动设计）

## 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

## 项目结构

```
src/
├── core/                 # 核心功能
│   ├── engine/          # 游戏引擎封装
│   ├── network/         # 网络管理
│   └── utils/           # 工具类
├── domain/              # 领域模型
│   ├── character/       # 角色相关
│   ├── combat/          # 战斗相关
│   └── item/           # 物品系统
├── game/                # 游戏逻辑
│   ├── scenes/         # 场景管理
│   └── ui/             # 界面组件
└── index.ts            # 入口文件
```

## 开发规范

1. 代码风格
   - 使用TypeScript严格模式
   - 遵循ESLint规则
   - 使用Prettier格式化代码

2. 提交规范
   - feat: 新功能
   - fix: 修复bug
   - docs: 文档更新
   - style: 代码格式调整
   - refactor: 重构
   - test: 测试相关
   - chore: 构建/工具链相关

3. 分支管理
   - master: 主分支
   - develop: 开发分支
   - feature/*: 功能分支
   - bugfix/*: 修复分支

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交变更
4. 发起 Pull Request

## 开源协议

MIT License 