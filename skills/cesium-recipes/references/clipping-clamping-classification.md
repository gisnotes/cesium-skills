# Clipping, Clamping & Classification Recipes

## 1. `ClippingPolygonCollection` on Terrain & 3D Tiles (`clipping-regions`, `aec-clipping`)

> Remember (`>= 1.145`): `ClippingPolygon` positions are frozen (`Object.freeze`). Never mutate positions—remove and re-add a new polygon instead. Holes (islands) are supported.

```js
const polygons = [
  new Cesium.ClippingPolygon({
    positions: Cesium.Cartesian3.fromDegreesArray([
      -105.0077, 39.7519,
      -105.0095, 39.7504,
      -105.0088, 39.7494,
      -105.0071, 39.7513,
    ]),
  }),
];

const clippingPolygons = new Cesium.ClippingPolygonCollection({
  polygons,
  inverse: false, // set true to keep only inside the polygon
});

// Apply to globe terrain and/or a 3D Tileset
viewer.scene.globe.clippingPolygons = clippingPolygons;
tileset.clippingPolygons = new Cesium.ClippingPolygonCollection({ polygons });
```

## 2. Classification (`3d-tiles-photogrammetry-classification`, `3d-tiles-point-cloud-classification`)

```js
const classificationTileset = await Cesium.Cesium3DTileset.fromUrl(
  "/tilesets/classification/tileset.json",
  {
    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE, // or TERRAIN / BOTH
  },
);
classificationTileset.style = new Cesium.Cesium3DTileStyle({
  color: "rgba(255, 0, 0, 0.5)",
});
viewer.scene.primitives.add(classificationTileset);
```

## 3. Clamping (`clamp-entities-to-ground`, `clamp-model-to-ground`, `clamp-to-3d-model`)
- `Cesium.HeightReference.CLAMP_TO_GROUND` / `RELATIVE_TO_GROUND`: Clamps to **Terrain or 3D Tiles** (whichever is higher, `>= 1.114`).
- `Cesium.HeightReference.CLAMP_TO_TERRAIN` / `RELATIVE_TO_TERRAIN`: Clamps strictly to **Terrain** only.
- **Plane clipping**: `3d-tiles-clipping-planes`, `terrain-clipping-planes` (`ClippingPlaneCollection`).
