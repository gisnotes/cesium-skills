# Behavior Changes, Performance & Pitfalls (1.100 – 1.148)

## 1. Breaking Behavior Changes to Watch For

- **3D Tiles Collision Default (`1.115`)**: `Cesium3DTileset` no longer enables camera collision or entity clamping by default. Set `enableCollision: true` explicitly when needed.
- **Clamping Includes 3D Tiles (`1.114`)**: `HeightReference.CLAMP_TO_GROUND` and `RELATIVE_TO_GROUND` clamp to **either Terrain or 3D Tiles** (whichever is higher). Use `CLAMP_TO_TERRAIN` / `RELATIVE_TO_TERRAIN` to clamp strictly to terrain.
- **`Camera.getPickRay` Coordinate Space (`1.128`)**: Returns results in **world coordinates** (previously erroneously returned camera coordinates).
- **`scene.drillPick` Search Strategy (`1.135`)**: Uses **breadth-first search** instead of depth-first, prioritizing entities closer to the camera when `limit` is used with large `width`/`height`.
- **Dynamic Screen Space Error Default (`1.114`)**: `Cesium3DTileset.dynamicScreenSpaceError` is enabled by default (`density: 0.0002`, `factor: 24`).
- **Default PBR Tonemapping (`1.121`) & Lighting (`1.123`)**:
  - Default tonemapper switched from `ACES` to `PBR_Neutral`. Restore via `scene.postProcessStages.tonemapper = Tonemapper.ACES`.
  - `ModelGraphics.environmentMapOptions` (`1.125`): Environment maps do **not** update on entity movement by default for performance; set `maximumPositionEpsilon` if dynamic updates are needed.
- **Default `Fog.density` (`1.123`)**: Changed from `0.0002` to `0.0006`.
- **`BaseLayerPicker` (`1.119`)**: No longer overrides default imagery/terrain unless `selectedImageryProviderViewModel` or `selectedTerrainProviderViewModel` is explicitly provided.
- **`DataSourceDisplay.ready` (`1.126`)**: Stays `true` permanently once initially set to `true`.

## 2. WebGL2 & Shader Pitfalls

- **WebGL2 Requirements**:
  - Voxel rendering (`1.134`) requires WebGL2 (`requestWebgl1` must not be `true`).
  - Billboards and Labels (`1.140`) require WebGL2 (or WebGL1 with `ANGLE_instanced_arrays` and `MAX_VERTEX_TEXTURE_IMAGE_UNITS > 0`).
  - Custom specular environment maps in `ImageBasedLighting` (`1.121`) require WebGL2 (or `EXT_shader_texture_lod`).
- **Ambient Occlusion Depth Precision (`1.124`)**: For long-distance AO quality, set `viewer.camera.frustum.near >= 1.0`.
- **Material White Flash (`1.144`)**: Set `Texture.defaultColor` to avoid white placeholder flashes when constructing new `Material`s; or use `Material.fromTypeAsync` (`1.134`) / `OffscreenCanvas` & `ImageBitmap` uniforms (`1.131`).

## 3. Caching, Memory & Rendering Stability

- **3D Tiles Cache Sizing (`1.110`, `1.147`)**: Size `cacheBytes` + `maximumCacheOverflowBytes` large enough to hold the active view's tiles; otherwise tiles that don't fit will repeatedly load and unload (`1.147` fixed thrashing edge cases, but proper sizing remains critical).
- **Large Buffer Collections (`1.142`, `1.146`)**: Always pass a precomputed `boundingVolume` for large animated `BufferPointCollection` / `BufferPolylineCollection` / `BufferPolygonCollection` and use `.setPositions(...)` for batch updates.
- **Version Floors for Fixed Bugs** (when debugging weird rendering/leak issues, check if the project is below these versions):
  - `1.148`: Fixed picking on clamped vector tilesets / `GeoJsonPrimitive` and globe failure with clamped vectors + many imagery layers.
  - `1.147`: Fixed `Cesium3DTileset` cache thrashing and `pointCloudShading.backFaceCulling`.
  - `1.146`: Fixed GPU memory leak with `EXT_mesh_primitive_edge_visibility`, clipped geometry casting shadows (`ClippingPolygonCollection`), and terrain-clamped billboards/labels mispositioning in 2D/Columbus view.
  - `1.143`–`1.144`: Fixed Gaussian Splat memory leaks, >16M splat WebGL crash, and `ClippingPolygon` multi-polygon performance.
