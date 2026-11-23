# Terrain & Imagery Recipes

## 1. Fixed Terrain Loading Patterns (`terrain`, `arcgis-tiled-elevation-terrain`, `procedural-terrain`)

| Terrain Source | Modern Pattern | Notes |
| :--- | :--- | :--- |
| **Cesium World Terrain** | `Cesium.Terrain.fromWorldTerrain({ requestWaterMask, requestVertexNormals })` | Pass directly to `new Viewer(id, { terrain })` or `scene.setTerrain(...)` |
| **ArcGIS Tiled Elevation** | `new Cesium.Terrain(Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(url))` | Async provider wrapped in `Cesium.Terrain` |
| **VR-The-World Terrain** | `new Cesium.Terrain(Cesium.VRTheWorldTerrainProvider.fromUrl(url, { credit }))` | Async provider wrapped in `Cesium.Terrain` |
| **Custom Heightmap** | `new Cesium.CustomHeightmapTerrainProvider({ width, height, callback })` | Procedural `Float32Array` per tile `(x, y, level)` |
| **Flat Ellipsoid (No Terrain)** | `new Cesium.EllipsoidTerrainProvider()` | Default when no terrain is set |
| **3D Tiles as Terrain** | `Cesium.Cesium3DTilesTerrainProvider` (experimental, `>= 1.135`) | Loads compatible 3D Tiles as terrain |

```js
// 1) Cesium World Terrain with water & lighting normals
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  }),
});
viewer.scene.globe.enableLighting = true;

// 2) Switch terrain at runtime (ArcGIS Elevation)
viewer.scene.setTerrain(
  new Cesium.Terrain(
    Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(
      "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
    ),
  ),
);
```

## 2. Fixed Imagery Loading & Layering Patterns (`imagery-layers`, `web-map-service-wms`, `web-map-tile-service-picking`)

```js
// Set base layer via options.baseLayer (never options.imageryProvider)
const viewer = new Cesium.Viewer("cesiumContainer", {
  baseLayer: Cesium.ImageryLayer.fromProviderAsync(
    Cesium.IonImageryProvider.fromAssetId(3830183),
  ),
  baseLayerPicker: false,
});

// Add overlay layer & adjust visual properties on ImageryLayer
const overlay = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.IonImageryProvider.fromAssetId(3812),
);
overlay.alpha = 0.5;
overlay.brightness = 2.0;
viewer.scene.imageryLayers.add(overlay);

// Single image overlay
const logoLayer = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.SingleTileImageryProvider.fromUrl("/images/overlay.png", {
    rectangle: Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75),
  }),
);
viewer.scene.imageryLayers.add(logoLayer);
```

## 3. Useful Terrain & Imagery Scenarios (`gallery/<id>`)
- **Split-screen comparison**: `imagery-layers-split` (`layer.splitDirection = Cesium.SplitDirection.LEFT / RIGHT` + `scene.splitPosition`)
- **Limit globe extent**: `cartographic-limit-rectangle` (`globe.cartographicLimitRectangle = rect`)
- **Drape imagery onto 3D Tiles**: `drape-imagery-on-3d-tiles` (`>= 1.130`)
- **Terrain exaggeration**: `terrain-exaggeration` (`scene.verticalExaggeration = 2.0`)
- **Elevation band / slope-aspect material**: `elevation-band-material`, `globe-materials`, `globe-materials-water-mask-elevation-map`
- **WMS / WMTS**: `web-map-service-wms`, `web-map-tile-service-picking`, `web-map-tile-service-with-time`
- **Panoramas**: `panorama`, `google-streetview-panorama` (`EquirectangularPanorama`, `CubeMapPanorama`)
