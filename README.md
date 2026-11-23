# Cesium Modern Dev Skills

从 CesiumJS 官方 `CHANGES.md`（**`1.100` ～ `1.148`**）提炼的现代 CesiumJS 开发规范与避坑指南，用于避免使用已废弃 API、过期语法和低效模式，并作为可随 Cesium 版本持续增量更新的独立 Git 仓库。

- **当前同步基线**：`CesiumJS 1.148`（覆盖 `1.100` 现代分包架构至 `1.148`）
- **核心产物**：[skills/cesium-modern-dev/SKILL.md](skills/cesium-modern-dev/SKILL.md)

## 目录结构

```text
cesium-skills/
├── README.md
├── CHANGELOG.md
├── scripts/
│   └── extract-changes.mjs          # 零依赖 Node.js 增量提取脚本
└── skills/
    └── cesium-modern-dev/
        ├── SKILL.md                 # 主 Skill（核心规则、反模式、场景索引）
        └── references/
            ├── package-migration.md     # 包结构拆分、ESM/TS、ES2022 环境基线
            ├── deprecated-apis.md       # 1.100~1.148 废弃与移除 API 替换对照表
            ├── tiles-models-vector.md   # 3D Tiles / glTF / Shader / 矢量 / 裁剪新特性
            └── performance-pitfalls.md  # 性能优化、行为变更与常见踩坑清单
```

## 如何在项目中使用

将 `skills/cesium-modern-dev` 复制或软链接到目标项目的 `.gemini/skills/`（或全局 `~/.gemini/antigravity/skills/`）目录即可。

## 后续随 Cesium 新版本增量更新

当 Cesium 发布新版本（例如 `1.149`、`1.150`）时，先更新本地 Cesium 源码仓库的 `CHANGES.md`，再运行仓库内置脚本只提取新增版本：

```bash
node scripts/extract-changes.mjs --input "d:/Users/Downloads/cesium/CHANGES.md" --from 1.149 --out "./tmp-extract"
```

根据提取出的 `announcements.md`、`breaking.md`、`deprecated.md`、`additions.md`、`fixes.md` 增量更新 `SKILL.md` 与 `references/`，更新基线版本号后提交 Git 并推送至 GitHub（用完可删除 `./tmp-extract`）。
