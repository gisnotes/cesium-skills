# Camera, Picking & Snapping Recipes

## 1. Camera Positioning & Modular Controllers (`3d-tiles-feature-picking`, `camera-controllers`)

```js
// Instant view
viewer.scene.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(-74.0188, 40.6911, 753),
  orientation: Cesium.HeadingPitchRoll.fromDegrees(21.28, -21.34, 0.07),
});

// Orbit / lookAt a target (remember to reset transform if unlocking)
viewer.camera.lookAt(targetCartesian, new Cesium.Cartesian3(-6857, 412, 2147));
viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

// Modular asset-inspection controllers (>= 1.144)
const scene = viewer.scene;
scene.screenSpaceCameraController.enableInputs = false;
scene.screenSpaceCameraController.enableCollisionDetection = false;
viewer.addController(new Cesium.HybridScreenSpacePanCameraController());
viewer.addController(new Cesium.ScreenSpaceTiltOrbitCameraController());
viewer.addController(new Cesium.ScreenSpaceZoomCameraController());
```

## 2. 3D Tiles Feature Picking & Hover Highlight (`3d-tiles-feature-picking`, `3d-tiles-terrain-classification`)

```js
const highlighted = {
  feature: undefined,
  originalColor: new Cesium.Color(),
};

viewer.screenSpaceEventHandler.setInputAction((movement) => {
  if (Cesium.defined(highlighted.feature)) {
    highlighted.feature.color = highlighted.originalColor;
    highlighted.feature = undefined;
  }

  const picked = viewer.scene.pick(movement.endPosition);
  if (!Cesium.defined(picked) || !(picked instanceof Cesium.Cesium3DTileFeature)) {
    return;
  }

  highlighted.feature = picked;
  Cesium.Color.clone(picked.color, highlighted.originalColor);
  picked.color = Cesium.Color.YELLOW;
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
```

## 3. Non-Blocking Picking & Geometry Snapping (`>= 1.136`, `>= 1.144`)
- **Non-blocking WebGL2 pick**: `const picked = await viewer.scene.pickAsync(windowPosition);`
- **Multi-layer pick (BFS in `>= 1.135`)**: `viewer.scene.drillPick(windowPosition, limit, width, height)`
- **Edge/Surface Snapping**: `aec-snapping` (`Scene.snap` / `IonSnapService`)
- **More camera scenarios**: `camera`, `camera-tutorial`, `multi-part-aircraft-camera`
