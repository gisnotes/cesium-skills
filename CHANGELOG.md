# Changelog

## 0.2.0 - 2026-11-23

- Added `skills/cesium-recipes` distilled from `Apps/Sandcastle2/gallery` (234 non-dev examples across 30+ labels):
  - `SKILL.md` scenario router + 10 UI-free minimal code recipe files (`getting-started-performance.md`, `terrain-imagery.md`, `3dtiles-models.md`, `entities-vector-geometries.md`, `styling-materials-shaders.md`, `animation-czml.md`, `camera-picking-snapping.md`, `clipping-clamping-classification.md`, `postprocessing-atmosphere.md`, `pointcloud-voxel-splats.md`).
- Added `scripts/index-sandcastle.mjs` for re-indexing `Sandcastle2/gallery` on future Cesium releases.

## 0.1.0 - 2026-11-23

- **Synced CesiumJS Version**: `1.100` → `1.148`
- Initial extraction and structuring of `cesium-modern-dev` skill:
  - `SKILL.md`: core modern rules, anti-patterns, and reference routing.
  - `references/package-migration.md`: `@cesium/core` / `@cesium/engine` / `@cesium/widgets` packaging, ESM, TypeScript, and ES2022/Node 22 baselines.
  - `references/deprecated-apis.md`: complete `1.100`–`1.148` deprecated and removed API migration table.
  - `references/tiles-models-vector.md`: 3D Tiles, glTF, Gaussian Splats, Custom Shaders, Voxel, `BufferPrimitiveCollection`, `GeoJsonPrimitive`, `MVTDataProvider`, and `ClippingPolygons`.
  - `references/performance-pitfalls.md`: WebGL2/GLSL 300 constraints, coordinate/picking behavior changes, caching, and memory leak pitfalls.
- Added zero-dependency `scripts/extract-changes.mjs` for future incremental syncs (`--from 1.149+`).
