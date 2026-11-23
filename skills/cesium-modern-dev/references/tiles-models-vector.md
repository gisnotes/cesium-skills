# 3D Tiles, Models, Custom Shaders & Vector APIs (1.100 – 1.148)

## 1. High-Performance Vector Primitives (`>= 1.140` – `1.146`)

For large vector datasets or high-frequency animations, bypass `Entity` / `DataSource` and use buffer primitive collections:

- **Core Collections (`1.140`)**: `BufferPointCollection`, `BufferPolylineCollection`, `BufferPolygonCollection` (extending `BufferPrimitiveCollection`).
- **GeoJSON Direct Loading (`1.142`)**: Use `GeoJsonPrimitive` (with optional `heightReference` in `1.145` for draping onto terrain, 3D Tiles, or both).
- **Mapbox Vector Tiles (`1.142`, `1.145`)**: Use `MVTDataProvider.fromUrl` to load MVT directly as 3D Tiles with `Cesium3DTileStyle` styling, `getProperty` picking, `EXT_structural_metadata` encoding, and `heightReference` draping.
- **Batch Vertex Animation (`1.146`)**: Use `BufferPrimitiveCollection.setPositions(...)` instead of updating primitives one by one.
- **Precomputed Bounding Volumes (`1.142`)**: Pass `boundingVolume` (in **world space**) to the constructor for large animated collections to avoid per-frame recalculation overhead.
- **Readonly Properties (`1.141`)**: `BufferPrimitiveCollection.modelMatrix`, `boundingVolume`, and `boundingVolumeWC` are **readonly**—mutate their internal values, do not reassign the property reference.
- **Blending & Units (`1.145`–`1.146`)**:
  - `blendOption` can be changed after construction on `BufferPointCollection`, `BufferPolylineCollection`, `BufferPolygonCollection` (and `vectorBlendOption` on `Cesium3DTileset`).
  - `BufferPolylineCollection` supports `widthUnits` (`"pixels"` or `"meters"`).
  - `BufferPrimitive.pickObject` getter/setter (`1.146`).

## 2. Clipping Polygons (`>= 1.145`)

- **Immutable Positions (`1.145`)**: Positions of `ClippingPolygons` inside a `ClippingPolygonCollection` are frozen via `Object.freeze`. Mutating them throws an error—to update, **remove and re-add** a new `ClippingPolygon`.
- **Holes / Islands (`1.145`)**: Supported natively in `ClippingPolygons` (including inverse clipping).
- **Deprecated Fields (`1.145`)**: Do not use `quality`, `debugShowDistanceTexture`, `destroy()`, or `isDestroyed()` on `ClippingPolygonCollection`; use `ClippingPolygon.rectangle` instead of `computeRectangle`.

## 3. 3D Tiles, glTF, Gaussian Splats & BIM Metadata

- **Gaussian Splats (`1.135`, `1.148`)**:
  - Use `KHR_gaussian_splatting` and `KHR_gaussian_splatting_compression_spz_2` (`1.135`); `KHR_spz_gaussian_splats_compression` is removed.
  - **Custom Shaders** are supported on Gaussian Splat tilesets (`1.148`).
- **3D Tiles Vector & Terrain**:
  - `Cesium3DTileset` supports `vectorGeoJson` (experimental, `1.148`) for `MAXAR_content_geojson` as vector primitives, `vectorBlendOption` (`1.146`), and `HeightReference` (`1.131`) for clamping vector point features.
  - `Cesium3DTilesTerrainProvider` (experimental, `1.135`) loads 3D Tiles as terrain.
- **BIM / CAD Metadata & Snapping (`1.144`–`1.147`)**:
  - `IonAssetElementService` / `ElementService` (experimental, `1.147`): query, filter, aggregate, and navigate BIM/CAD element metadata on Cesium ion assets.
  - `Scene.snap` (experimental, `1.144`–`1.145`) & `IonSnapService` (`1.145`): snap-to-geometry picking (preferring edges from `EXT_mesh_primitive_edge_visibility`).
- **glTF Extensions & Edge Rendering**:
  - `EdgeDisplayMode` (`SURFACES_ONLY`, `SURFACES_AND_EDGES`, `EDGES_ONLY`) on `Model` and `Cesium3DTileset` for `EXT_mesh_primitive_edge_visibility` (`1.142`).
  - Supported recent extensions: `KHR_materials_emissive_strength` (`1.147`), `KHR_meshopt_compression` (`1.143`), `KHR_mesh_primitive_restart` (`1.144`), `EXT_textureInfo_constant_lod` (`1.138`), `BENTLEY_materials_planar_fill` (`1.144`), `BENTLEY_materials_point_style` & `line_style` (`1.137`).

## 4. Custom Shaders & Voxels

- **GLSL 300 Required (`>= 1.102`)**: Default WebGL2 context requires GLSL 300 in custom shaders, materials, and custom primitives.
- **UINT Metadata Signedness (`1.139`)**: `CustomShader` no longer casts `EXT_structural_metadata` unsigned integers to signed `int`. Declare local variables matching the unsigned type (e.g., `uint`), or shader compilation will fail.
- **Voxel `FragmentInput` (`1.130`)**: `fsInput.voxel.positionUv`, `positionShapeUv`, `positionLocal`, and `surfaceNormal` were removed. Use `fsInput.attributes.positionEC` and `fsInput.attributes.normalEC`.
- **Voxel Provider (`1.127`, `1.129`)**: `Cesium3DTilesVoxelProvider` uses `EXT_primitive_voxels` (custom JSON format removed). `VoxelProvider.requestData` returns `Promise<VoxelContent>` via `VoxelContent.fromMetadataArray(...)`. Bounds are in physical space (`1.129`).

## 5. Camera, Picking, Panoramas & Tracking

- **Non-blocking Pick (`1.136`)**: Use `scene.pickAsync` (WebGL2) to avoid GPU stalls.
- **Composable Camera Controllers (`1.144`)**: `Viewer.addController` / `Scene.controllerHost` with `HybridScreenSpacePanCameraController`, `ScreenSpaceElevatorCameraController`, `ScreenSpaceMapCameraController`, `ScreenSpaceTiltOrbitCameraController`.
- **Panoramas (`1.139`)**: `EquirectangularPanorama`, `CubeMapPanorama`, `GoogleStreetViewCubeMapPanoramaProvider`.
- **Entity Tracking (`1.124`)**: Use `Entity.trackingReferenceFrame = TrackingReferenceFrame.ENU` if camera orientation flips abruptly with `AUTODETECT`.
- **Segmented Paths (`1.143`)**: `PathGraphics.materialMode = "PORTIONS"` for time-varying segment materials; `PathGraphics.relativeTo` (`1.140`) for relative reference frames.
