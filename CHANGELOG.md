# Changelog

## 0.1.0 - 2026-11-23

- **Synced CesiumJS Version**: `1.100` → `1.148`
- Initial extraction and structuring of `cesium-modern-dev` skill:
  - `SKILL.md`: core modern rules, anti-patterns, and reference routing.
  - `references/package-migration.md`: `@cesium/core` / `@cesium/engine` / `@cesium/widgets` packaging, ESM, TypeScript, and ES2022/Node 22 baselines.
  - `references/deprecated-apis.md`: complete `1.100`–`1.148` deprecated and removed API migration table.
  - `references/tiles-models-vector.md`: 3D Tiles, glTF, Gaussian Splats, Custom Shaders, Voxel, `BufferPrimitiveCollection`, `GeoJsonPrimitive`, `MVTDataProvider`, and `ClippingPolygons`.
  - `references/performance-pitfalls.md`: WebGL2/GLSL 300 constraints, coordinate/picking behavior changes, caching, and memory leak pitfalls.
- Added zero-dependency `scripts/extract-changes.mjs` for future incremental syncs (`--from 1.149+`).
