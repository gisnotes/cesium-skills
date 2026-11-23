# 3D Tiles & glTF Model Recipes

## 1. Fixed 3D Tiles Loading Patterns

| Source | Modern Pattern | Reference Example |
| :--- | :--- | :--- |
| **Cesium ion Asset** | `await Cesium.Cesium3DTileset.fromIonAssetId(assetId, options)` | `3d-tiles-feature-picking` |
| **URL / Local `tileset.json`** | `await Cesium.Cesium3DTileset.fromUrl(url, options)` | `3d-tiles-adjust-height` |
| **Cesium OSM Buildings** | `await Cesium.createOsmBuildingsAsync()` | `cesium-osm-buildings` |
| **Google Photorealistic 3D Tiles** | `await Cesium.createGooglePhotorealistic3DTileset({ onlyUsingWithGoogleGeocoder: true })` | `google-photorealistic-3d-tiles` |
| **iTwin Reality / iModel** | `await Cesium.ITwinData.createTilesetFromIModelId(...)` / `createTilesetForRealityDataId(...)` | `imodel-mesh-export-service` |

```js
// Standard 3D Tileset loading with error handling
try {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(75343);
  viewer.scene.primitives.add(tileset);
  await viewer.zoomTo(tileset);
} catch (error) {
  console.error(`Error loading tileset: ${error}`);
}
```

## 2. Offset 3D Tileset Height (`3d-tiles-adjust-height`)

```js
function setTilesetHeightOffset(tileset, heightOffsetMeters) {
  const cartographic = Cesium.Cartographic.fromCartesian(
    tileset.boundingSphere.center,
  );
  const surface = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    0.0,
  );
  const offset = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    heightOffsetMeters,
  );
  const translation = Cesium.Cartesian3.subtract(
    offset,
    surface,
    new Cesium.Cartesian3(),
  );
  tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
}
```

## 3. glTF Model Loading Patterns (`3d-models`, `clamp-model-to-ground`)

- **Entity API** (simple placement, built-in `HeightReference` & animation):
```js
const entity = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 5000),
  orientation: Cesium.Transforms.headingPitchRollQuaternion(
    Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 5000),
    new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(135), 0, 0),
  ),
  model: {
    uri: "/models/Cesium_Air.glb",
    minimumPixelSize: 128,
    maximumScale: 20000,
  },
});
```
- **Primitive API** (`Model.fromGltfAsync`, high control, `readyEvent`):
```js
const model = await Cesium.Model.fromGltfAsync({
  url: "/models/model.glb",
  modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 0),
  ),
});
viewer.scene.primitives.add(model);
model.readyEvent.addEventListener(() => {
  // Model is ready for rendering / node manipulation
});
```

## 4. Other Key 3D Tiles & Model Scenarios (`gallery/<id>`)
- **Edge display (CAD wireframe)**: `3d-tiles-edge-visibility` (`tileset.edgeDisplayMode = Cesium.EdgeDisplayMode.SURFACES_AND_EDGES`)
- **BIM / AEC metadata query & filtering**: `aec-elements-api-query` (`IonAssetElementService`), `aec-isolate-by-category`, `aec-tileset-metadata-filtering`, `aec-architectural-design`
- **Sample height from 3D Tiles**: `sample-height-from-3d-tiles` (`scene.sampleHeightMostDetailed(...)`)
- **Compare two tilesets**: `3d-tiles-compare` (`splitDirection` + `scene.splitPosition`)
- **PBR & Image-Based Lighting**: `physically-based-materials`, `image-based-lighting`, `gltf-pbr-extensions`
