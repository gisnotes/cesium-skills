# Point Clouds, Voxels & Gaussian Splats Recipes

## 1. Gaussian Splats 3D Tiles (`3d-tiles-gaussian-splatting`, `3d-tiles-gaussian-splats-with-lod`, `itwin-gaussian-splats`)

> Requires `KHR_gaussian_splatting` / `KHR_gaussian_splatting_compression_spz_2` (`>= 1.135`). Supports `CustomShader` (`>= 1.148`).

```js
try {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(3667783);
  viewer.scene.primitives.add(tileset);
  await viewer.zoomTo(
    tileset,
    new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-15.0), 200.0),
  );
} catch (error) {
  console.error(`Error loading Gaussian Splat tileset: ${error}`);
}
```

## 2. Point Clouds (`3d-tiles-point-cloud`, `3d-tiles-point-cloud-shading`, `3d-tiles-point-cloud-styling`)

```js
const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(16421);
tileset.pointCloudShading.attenuation = true;
tileset.pointCloudShading.eyeDomeLighting = true;
tileset.pointCloudShading.backFaceCulling = true;
viewer.scene.primitives.add(tileset);
```

## 3. Voxels (`voxels`, `voxels-in-3d-tiles`, `voxel-picking`)
- Requires **WebGL2** (`>= 1.134`).
- `Cesium3DTilesVoxelProvider.fromUrl(url)` loads `EXT_primitive_voxels` (`>= 1.127`).
- In `CustomShader` for `VoxelPrimitive` (`>= 1.130`), use `fsInput.attributes.positionEC` and `fsInput.attributes.normalEC`.
- **Time-dynamic point cloud**: `time-dynamic-point-cloud` (`TimeDynamicPointCloud` + `frameFailed` event).
