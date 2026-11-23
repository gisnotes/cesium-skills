# Getting Started, Offline & Performance Recipes

## 1. Minimal `Viewer` vs Lightweight `CesiumWidget` (`hello-world`, `cesium-widget`)

Use `CesiumWidget` instead of `Viewer` when you build your own UI and don't need built-in widgets (Timeline, Animation, BaseLayerPicker, Geocoder) or Knockout:

```js
// Lightweight globe without Viewer UI widgets or Knockout
const widget = new Cesium.CesiumWidget("cesiumContainer", {
  shouldAnimate: true,
});
```

## 2. Offline Mode (`offline`)

Serve Cesium assets from your own local web server with no external network/ion calls:

```js
const viewer = new Cesium.Viewer("cesiumContainer", {
  baseLayer: Cesium.ImageryLayer.fromProviderAsync(
    Cesium.TileMapServiceImageryProvider.fromUrl(
      Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
    ),
  ),
  baseLayerPicker: false,
  geocoder: false,
});
```

## 3. HTML Overlays Anchored to World Coordinates (`html-overlays`)

Reuse a scratch `Cartesian2` in `scene.preRender` to project 3D world positions onto 2D canvas coordinates:

```js
const htmlOverlay = document.getElementById("htmlOverlay");
const scratch = new Cesium.Cartesian2();

viewer.scene.preRender.addEventListener(() => {
  const position = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
  const canvasPos = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
  if (Cesium.defined(canvasPos)) {
    htmlOverlay.style.top = `${canvasPos.y}px`;
    htmlOverlay.style.left = `${canvasPos.x}px`;
  }
});
```

## 4. On-Demand Rendering & Resolution Scaling (`scene-rendering-performance`, `resolution-scaling`)

- **On-demand rendering (`requestRenderMode`)**: Cuts idle CPU/GPU usage to near zero; call `scene.requestRender()` only after manual scene/material/camera mutations that don't automatically trigger a render.
- **Resolution scaling**: Control `viewer.useBrowserRecommendedResolution` (96 dpi CSS vs native HiDPI) and `viewer.resolutionScale` (e.g., `0.5`–`1.0`) to trade sharpness for frame rate on high-DPI displays.

```js
const viewer = new Cesium.Viewer("cesiumContainer", {
  requestRenderMode: true,
  maximumRenderTimeChange: Infinity,
  terrain: Cesium.Terrain.fromWorldTerrain(),
});

// Trigger a frame manually after custom state changes
viewer.scene.requestRender();

// Optional HiDPI / resolution tuning
viewer.useBrowserRecommendedResolution = false;
viewer.resolutionScale = 1.0; // clamp between 0.1 and 2.0
```
