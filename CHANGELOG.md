# 更新日志（Changelog）

## 0.2.0 - 2026-11-23

- **同步 CesiumJS 基线（Baseline）**：`1.148`
- **新增 `cesium-recipes` 场景代码模板 Skill**：基于 `Apps/Sandcastle2/gallery`（234 个非 `-dev` 官方示例、覆盖 30+ 标签（Labels））提炼：
  - `SKILL.md` 场景速查路由表 + 10 份去 UI 壳子（UI-free）的最小可运行代码模板（覆盖入门与性能 `getting-started-performance.md`、地形与影像 `terrain-imagery.md`、3D Tiles 与模型 `3dtiles-models.md`、实体与矢量几何 `entities-vector-geometries.md`、样式/材质与着色器 `styling-materials-shaders.md`、动画与插值 `animation-czml.md`、相机/拾取与吸附 `camera-picking-snapping.md`、裁剪/贴地与分类 `clipping-clamping-classification.md`、后处理与大气 `postprocessing-atmosphere.md`、点云/体素与高斯泼溅 `pointcloud-voxel-splats.md`）。
- **新增与优化辅助脚本**：
  - 新增零依赖 `scripts/index-sandcastle.mjs`，用于扫描并按场景分类索引 `Sandcastle2/gallery` 示例。
  - 将 `scripts/extract-changes.mjs` 与 `scripts/index-sandcastle.mjs` 统一改为基于仓库的相对路径，支持跨设备/跨系统直接维护。
- **完善使用文档**：重写 `README.md`，补充双 Skill 互补说明、小白向全局/项目挂载教程以及常用 AI 提问提示词（Prompt）模板。

## 0.1.0 - 2026-11-23

- **同步 CesiumJS 基线（Baseline）**：`1.100` → `1.148`
- **新增 `cesium-modern-dev` 规范与避坑 Skill**：
  - `SKILL.md`：核心现代开发规范、反模式（Anti-patterns）红线与参考文档索引。
  - `references/package-migration.md`：`@cesium/core` / `@cesium/engine` / `@cesium/widgets` 分包结构、ES 模块（ESM）、TypeScript 及 ES2022 / Node 22 运行环境基线。
  - `references/deprecated-apis.md`：`1.100`～`1.148` 废弃（Deprecated）与已移除（Removed）API 完整替换对照表。
  - `references/tiles-models-vector.md`：3D Tiles、glTF、高斯泼溅（Gaussian Splats）、自定义着色器（Custom Shaders）、体素（Voxel）、`BufferPrimitiveCollection`、`GeoJsonPrimitive`、`MVTDataProvider` 与裁剪多边形（`ClippingPolygons`）规范。
  - `references/performance-pitfalls.md`：WebGL2 / GLSL 300 约束、坐标系与拾取（Picking）行为变更、瓦片缓存（Cache）调优与 GPU 内存泄漏（Memory Leak）排查清单。
- **新增增量提取脚本**：零依赖 `scripts/extract-changes.mjs`，用于后续提取 `1.149+` 版本的 `CHANGES.md` 变更。
