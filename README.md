# Cesium Modern Dev Skills

从 CesiumJS 官方 `CHANGES.md`（**`1.100` ～ `1.148`**）提炼的现代 CesiumJS 开发规范与避坑指南，用于避免使用已废弃 API、过期语法和低效模式，并作为可随 Cesium 版本持续增量更新的独立 Git 仓库。

- **当前同步基线**：`CesiumJS 1.148`（覆盖 `1.100`～`1.148` 变更规范 + `Apps/Sandcastle2/gallery` 234 个官方示例场景模板）
- **核心产物**：
  - [skills/cesium-modern-dev/SKILL.md](skills/cesium-modern-dev/SKILL.md)：API 红线、版本迁移与避坑约束
  - [skills/cesium-recipes/SKILL.md](skills/cesium-recipes/SKILL.md)：按场景分类的去 UI 壳子最小可运行代码模板

## 目录结构

```text
cesium-skills/
├── README.md
├── CHANGELOG.md
├── scripts/
│   ├── extract-changes.mjs          # 零依赖 Node.js 增量提取 CHANGES.md 脚本
│   └── index-sandcastle.mjs         # 零依赖 Node.js 扫描 Sandcastle2/gallery 脚本
└── skills/
    ├── cesium-modern-dev/           # API 规范、废弃替换与避坑
    │   ├── SKILL.md
    │   └── references/
    │       ├── package-migration.md
    │       ├── deprecated-apis.md
    │       ├── tiles-models-vector.md
    │       └── performance-pitfalls.md
    └── cesium-recipes/              # 场景化固定写法与最小代码模板
        ├── SKILL.md
        └── references/
            ├── getting-started-performance.md
            ├── terrain-imagery.md
            ├── 3dtiles-models.md
            ├── entities-vector-geometries.md
            ├── styling-materials-shaders.md
            ├── animation-czml.md
            ├── camera-picking-snapping.md
            ├── clipping-clamping-classification.md
            ├── postprocessing-atmosphere.md
            └── pointcloud-voxel-splats.md
```

## 如何在项目中使用

将 `skills/cesium-modern-dev` 复制或软链接到目标项目的 `.gemini/skills/`（或全局 `~/.gemini/antigravity/skills/`）目录即可。

## 后续随 Cesium 新版本增量更新

当 Cesium 发布新版本（例如 `1.149`、`1.150`）时，先更新本地 Cesium 源码仓库的 `CHANGES.md`，再运行仓库内置脚本只提取新增版本：

```bash
node scripts/extract-changes.mjs --input "d:/Users/Downloads/cesium/CHANGES.md" --from 1.149 --out "./tmp-extract"
```

根据提取出的 `announcements.md`、`breaking.md`、`deprecated.md`、`additions.md`、`fixes.md` 增量更新 `SKILL.md` 与 `references/`，更新基线版本号后提交 Git 并推送至 GitHub（用完可删除 `./tmp-extract`）。
