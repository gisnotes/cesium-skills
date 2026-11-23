---
name: cesium-modern-dev
description: Modern CesiumJS (>= 1.92, synced to 1.148) development guidelines, package import rules, async loading patterns, deprecated/removed API replacements, and performance best practices. Use whenever writing, reviewing, or migrating CesiumJS / @cesium/core / @cesium/engine / @cesium/widgets code to avoid outdated patterns.
---

# CesiumJS Modern Development Skill

> **Synced Baseline**: CesiumJS `1.92` – `1.148` (2022-04 to 2026-12)

Follow these rules whenever authoring, refactoring, or reviewing CesiumJS code so you never emit removed APIs, deprecated imports, or legacy WebGL1 patterns.

## 1. Package Imports & Runtime Baseline

- **No deep imports (`>= 1.100`)**: Import only from `"cesium"` or root workspace packages (`"@cesium/core"`, `"@cesium/engine"`, `"@cesium/widgets"`). Never import internal file paths (e.g., `@cesium/engine/Source/...`).
- **Use `@cesium/core` for math/geometry/time/utils (`>= 1.146`)**: When using workspace packages instead of `"cesium"`, import `Cartesian3`, `Color`, `JulianDate`, `Math`, `Matrix4`, geometries, splines, etc. from `"@cesium/core"`. Importing them from `"@cesium/engine"` is **deprecated** and will be **removed in `1.150`**.
- **Runtime & Build Targets**:
  - Builds target **ES2022** (`>= 1.148`, native class fields) and require **Node >= 22.0.0** (`>= 1.141`) for tooling.
  - **WebGL2 is the default** (`>= 1.102`). Custom shaders, materials, and primitives must use **GLSL 300**. Voxel rendering (`>= 1.134`) and Billboards/Labels (`>= 1.140`) require WebGL2 (or specific WebGL1 extensions). Do not set `contextOptions.requestWebgl1 = true` unless targeting legacy environments.

## 2. Modern Async Loading & Core Syntax Rules

- **No `Cesium.when` (`>= 1.92`)**: `Cesium.when` is removed; always use native `Promise` and `async/await`.
- **No `readyPromise` (`>= 1.107`)**: `readyPromise` and `options.url` constructors are removed across `Cesium3DTileset`, `Model`, `ImageryProvider`, `TerrainProvider`, `I3SDataProvider`, and `Primitive`s (and `Cesium3DTileStyle.readyPromise` removed in `1.96` → `Cesium3DTileStyle.fromUrl`). Always use `async/await` static factories:
  - `await Cesium3DTileset.fromUrl(url, options)`
  - `await Model.fromGltfAsync({ url, ... })` (listen to `model.readyEvent` / `model.errorEvent`)
  - `await createWorldTerrainAsync()` / `await createOsmBuildingsAsync()` / `await createWorldImageryAsync()`
  - `await CesiumTerrainProvider.fromUrl(url)` / `fromIonAssetId(id)`
  - `await IonImageryProvider.fromAssetId(id)` / `ArcGisMapServerImageryProvider.fromUrl(url)` / `SingleTileImageryProvider.fromUrl(url)`
- **Viewer / CesiumWidget base imagery (`>= 1.107`)**: Use `options.baseLayer` instead of the removed `options.imageryProvider`.
- **No `defaultValue` (`>= 1.134`)**: `defaultValue` and `defaultValue.EMPTY_OBJECT` are removed. Use `??` and `Frozen.EMPTY_OBJECT` / `Frozen.EMPTY_ARRAY`.
- **No `new` on static factory methods (`>= 1.139`)**: `Cartesian2`, `Cartesian3`, `Cartesian4` are ES6 classes; calling `new Cartesian3.fromArray(...)` throws. Always omit `new` on static factories.
- **No `Matrix4.fromCamera` (`>= 1.146`)**: Deprecated (removed in `1.151`). Use `camera.viewMatrix` or `Matrix4.computeView(...)`.
- **Other key removals**:
  - `ImagerySplitPosition` / `Scene.imagerySplitPosition` → `SplitDirection` / `Scene.splitPosition` (`1.94`)
  - `Cesium3DTileFeature.getPropertyNames` / `ModelFeature.getPropertyNames` → `.getPropertyIds()` (`1.98`)
  - `Cesium3DTileset.maximumMemoryUsage` → `cacheBytes` + `maximumCacheOverflowBytes` (`1.110`)
  - `Globe.terrainExaggeration*` → `Scene.verticalExaggeration*` (`1.116`)
  - `Cesium3DTileset.disableCollision` → `Cesium3DTileset.enableCollision` (`1.116`, default `false` since `1.115`)
  - `SceneTransforms.wgs84ToWindowCoordinates` → `SceneTransforms.worldToWindowCoordinates` (`1.121`)
  - `ImageBasedLighting.luminanceAtZenith` → `DynamicEnvironmentMapManager.atmosphereScatteringIntensity` (`1.123`)

## 3. High-Performance & Modern Feature Patterns

- **Large Vector Datasets (`>= 1.140`–`1.146`)**: Prefer `BufferPointCollection`, `BufferPolylineCollection`, `BufferPolygonCollection`, `GeoJsonPrimitive`, and `MVTDataProvider.fromUrl` over Entity/DataSource for large datasets. Use `BufferPrimitiveCollection.setPositions` for batch vertex animation and pass precomputed `boundingVolume` (world space).
- **Immutable `ClippingPolygons` (`>= 1.145`)**: Positions in `ClippingPolygonCollection` are frozen (`Object.freeze`). Never mutate positions in place—remove and re-add a new `ClippingPolygon`. Holes/islands are supported natively.
- **Clamping & Terrain/3D Tiles (`>= 1.114`, `1.145`)**: `HeightReference.CLAMP_TO_GROUND` / `RELATIVE_TO_GROUND` clamp to **both** Terrain and 3D Tiles (whichever is higher). Use `CLAMP_TO_TERRAIN` / `RELATIVE_TO_TERRAIN` if you only want terrain.
- **Non-blocking Picking & Snapping**: Use `scene.pickAsync` (`>= 1.136`, WebGL2) for non-GPU-blocking picks, and experimental `Scene.snap` / `IonSnapService` (`>= 1.144`–`1.145`) for geometry/edge snapping.
- **Gaussian Splats & Custom Shaders**: Use `KHR_gaussian_splatting` / `KHR_gaussian_splatting_compression_spz_2` (`>= 1.135`; old `KHR_spz_gaussian_splats_compression` removed). Custom Shaders on Gaussian Splat tilesets are supported (`>= 1.148`). In Custom Shaders with `EXT_structural_metadata`, `uint` metadata is no longer cast to `int` (`>= 1.139`).

## 4. Detailed References

Load the specific reference file when you need full lookup tables or detailed examples:

| Topic | Reference File |
| :--- | :--- |
| Package splits (`@cesium/core`, `@cesium/engine`, `@cesium/widgets`), moved class list, TS & ES2022 rules | [references/package-migration.md](references/package-migration.md) |
| Full `1.100`–`1.148` deprecated & removed API replacement table | [references/deprecated-apis.md](references/deprecated-apis.md) |
| 3D Tiles, glTF extensions, Gaussian Splats, Voxel, `BufferPrimitiveCollection`, `ClippingPolygons` | [references/tiles-models-vector.md](references/tiles-models-vector.md) |
| Behavior changes, WebGL2/shader gotchas, memory/caching & multi-view pitfalls | [references/performance-pitfalls.md](references/performance-pitfalls.md) |
