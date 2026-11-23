# 更新日志（Changelog）

## 0.2.0 - 2026-11-23

- **同步 CesiumJS 基线**：`1.148`
- **新增 `cesium-recipes` 场景代码模板 Skill**：基于 `Apps/Sandcastle2/gallery`（234 个非 `-dev` 官方示例、覆盖 30+ 标签）提炼：
  - `SKILL.md` 场景速查路由表 + 10 份去 UI 壳子的最小可运行代码模板（`getting-started-performance.md`、`terrain-imagery.md`、`3dtiles-models.md`、`entities-vector-geometries.md`、`styling-materials-shaders.md`、`animation-czml.md`、`camera-picking-snapping.md`、`clipping-clamping-classification.md`、`postprocessing-atmosphere.md`、`pointcloud-voxel-splats.md`）。
- **新增与优化辅助脚本**：
  - 新增零依赖 `scripts/index-sandcastle.mjs`，用于扫描并按场景分类索引 `Sandcastle2/gallery` 示例。
  - 将 `scripts/extract-changes.mjs` 与 `scripts/index-sandcastle.mjs` 统一改为基于仓库的相对路径，支持跨设备/跨系统直接维护。
- **完善使用文档**：重写 `README.md`，补充双 Skill 互补说明、小白向全局/项目挂载教程以及常用 AI 提问提示词模板。

## 0.1.0 - 2026-11-23

- **同步 CesiumJS 基线**：`1.100` → `1.148`
- **新增 `cesium-modern-dev` 规范与避坑 Skill**：
  - `SKILL.md`：核心现代开发规范、反模式红线与参考文档索引。
  - `references/package-migration.md`：`@cesium/core` / `@cesium/engine` / `@cesium/widgets` 分包结构、ESM、TypeScript 及 ES2022 / Node 22 基线。
  - `references/deprecated-apis.md`：`1.100`～`1.148` 废弃与已移除 API 完整替换对照表。
  - `references/tiles-models-vector.md`：3D Tiles、glTF、Gaussian Splats、Custom Shaders、Voxel、`BufferPrimitiveCollection`、`GeoJsonPrimitive`、`MVTDataProvider` 与 `ClippingPolygons` 规范。
  - `references/performance-pitfalls.md`：WebGL2 / GLSL 300 约束、坐标系与拾取行为变更、缓存调优与内存泄漏排查清单。
- **新增增量提取脚本**：零依赖 `scripts/extract-changes.mjs`，用于后续提取 `1.149+` 版本的 `CHANGES.md` 变更。
