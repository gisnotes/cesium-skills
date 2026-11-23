# Deprecated & Removed APIs Migration Table (1.100 – 1.148)

## 1. Async Loading Pattern (`readyPromise` Removed in `1.107`)

Never use `readyPromise`, `.ready` on providers, or pass `url`/`assetId` directly to provider/tileset constructors.

| Legacy / Removed API | Modern Replacement (`>= 1.107`) |
| :--- | :--- |
| `new Cesium3DTileset({ url })` + `.readyPromise` | `await Cesium3DTileset.fromUrl(url, options)` |
| `createOsmBuildings()` | `await createOsmBuildingsAsync(options)` |
| `createWorldTerrain()` | `await createWorldTerrainAsync(options)` |
| `createWorldImagery()` | `await createWorldImageryAsync(options)` |
| `Model.fromGltf(...)` + `.readyPromise` / `.texturesLoadedPromise` | `await Model.fromGltfAsync(...)` + `model.readyEvent` / `model.errorEvent` / `model.texturesReadyEvent` |
| `new CesiumTerrainProvider({ url })` | `await CesiumTerrainProvider.fromUrl(url)` or `.fromIonAssetId(id)` |
| `new ArcGISTiledElevationTerrainProvider({ url })` | `await ArcGISTiledElevationTerrainProvider.fromUrl(url)` |
| `new VRTheWorldTerrainProvider({ url })` | `await VRTheWorldTerrainProvider.fromUrl(url)` |
| `new GoogleEarthEnterpriseMetadata({ url })` / `TerrainProvider` | `await GoogleEarthEnterpriseMetadata.fromUrl(url)` / `.fromMetadata(...)` |
| `new IonImageryProvider({ assetId })` | `await IonImageryProvider.fromAssetId(assetId, options)` |
| `new ArcGisMapServerImageryProvider({ url })` | `await ArcGisMapServerImageryProvider.fromUrl(url, options)` |
| `new BingMapsImageryProvider({ url })` | `await BingMapsImageryProvider.fromUrl(url, options)` |
| `new TileMapServiceImageryProvider({ url })` | `await TileMapServiceImageryProvider.fromUrl(url, options)` |
| `new SingleTileImageryProvider({ url })` (missing `tileWidth`/`tileHeight`) | `await SingleTileImageryProvider.fromUrl(url, options)` |
| `new GoogleEarthEnterpriseMapsProvider({ url, channel })` | `await GoogleEarthEnterpriseMapsProvider.fromUrl(url, channel, options)` |
| `new I3SDataProvider({ url })` | `await I3SDataProvider.fromUrl(url, options)` |
| `new Cesium3DTilesVoxelProvider({ url })` | `await Cesium3DTilesVoxelProvider.fromUrl(url, options)` |
| `Primitive.readyPromise` / `GroundPrimitive.readyPromise` / `ClassificationPrimitive.readyPromise` / `GroundPolylinePrimitive.readyPromise` | Poll/check `primitive.ready` returning `true` |
| `TimeDynamicPointCloud.readyPromise` | `TimeDynamicPointCloud.frameFailed` event |

## 2. Viewer, Imagery & CreditDisplay (`1.105` – `1.107`)

| Legacy / Removed API | Modern Replacement |
| :--- | :--- |
| `new Viewer(id, { imageryProvider })` / `new CesiumWidget(id, { imageryProvider })` | `new Viewer(id, { baseLayer: ImageryLayer.fromProviderAsync(...) })` or `new ImageryLayer(provider)` |
| `ImageryProvider.defaultAlpha`, `defaultBrightness`, `defaultContrast`, `defaultHue`, `defaultSaturation`, `defaultGamma`, `defaultNightAlpha`, `defaultDayAlpha`, `defaultMinificationFilter`, `defaultMagnificationFilter` | Set on `ImageryLayer` (`alpha`, `brightness`, `contrast`, `hue`, `saturation`, `gamma`, `nightAlpha`, `dayAlpha`, `minificationFilter`, `magnificationFilter`) |
| `ImageryLayer.getViewableRectangle()` | `ImageryLayer.getImageryRectangle()` |
| `CreditDisplay.addCredit` / `addDefaultCredit` / `removeDefaultCredit` | `CreditDisplay.addCreditToNextFrame` / `addStaticCredit` / `removeStaticCredit` |

## 3. General Engine APIs (`1.110` – `1.148`)

| Version | Legacy / Deprecated / Removed | Modern Replacement / Status |
| :--- | :--- | :--- |
| `1.100` | `KmlTour.prototype.play(viewer)` | Pass `CesiumWidget` instead of `Viewer` |
| `1.102` | `ContextOptions.requestWebgl2` | Removed; WebGL2 is default. Use `requestWebgl1: true` only if WebGL1 is needed |
| `1.110` | `Cesium3DTileset.maximumMemoryUsage` | `Cesium3DTileset.cacheBytes` + `Cesium3DTileset.maximumCacheOverflowBytes` |
| `1.114` | `PolygonGeometry.computeRectangle` | `PolygonGeometry.computeRectangleFromPositions` |
| `1.116` | `Cesium3DTileset.disableCollision` | `Cesium3DTileset.enableCollision` |
| `1.116` | `Globe.terrainExaggeration` / `terrainExaggerationRelativeHeight` | `Scene.verticalExaggeration` / `Scene.verticalExaggerationRelativeHeight` |
| `1.121` | `SceneTransforms.wgs84ToWindowCoordinates` / `wgs84ToDrawingBufferCoordinates` | `SceneTransforms.worldToWindowCoordinates` / `worldToDrawingBufferCoordinates` |
| `1.123` | `ImageBasedLighting.luminanceAtZenith` | `DynamicEnvironmentMapManager.atmosphereScatteringIntensity` |
| `1.124` | `Rectangle.validate` | Removed |
| `1.126` | `createGooglePhotorealistic3DTileset(key)` | `createGooglePhotorealistic3DTileset({ key })` (uses Cesium ion by default if no key) |
| `1.133` | `ITwinData.*` positional arguments | Use the `options` object parameter signature |
| `1.134` | `defaultValue(a, b)` & `defaultValue.EMPTY_OBJECT` | Use `a ?? b` and `Frozen.EMPTY_OBJECT` |
| `1.135` | `KHR_spz_gaussian_splats_compression` | Removed; re-tile with `KHR_gaussian_splatting` and `KHR_gaussian_splatting_compression_spz_2` |
| `1.145` | `ClippingPolygonCollection.quality`, `debugShowDistanceTexture`, `destroy()`, `isDestroyed()` | **Deprecated** (no longer needed under new vector-tile-based algorithm) |
| `1.145` | `ClippingPolygon.computeRectangle` | **Deprecated**; use `ClippingPolygon.rectangle` property |
| `1.146` | `Matrix4.fromCamera` | **Deprecated** (removed in `1.151`); use `Camera.prototype.viewMatrix` or `Matrix4.computeView` |
| `1.146` | Importing math/geometry/time/utils from `@cesium/engine` | **Deprecated** (removed in `1.150`); import from `@cesium/core` |
