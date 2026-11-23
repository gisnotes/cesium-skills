# Entities, Vector & Geometry Recipes

## 1. Choosing the Right Vector Layer

| Use Case | Recommended API | Reference Example |
| :--- | :--- | :--- |
| **Small/medium interactive objects, time-dynamic** | `viewer.entities.add(...)` | `3d-models`, `interpolation` |
| **Standard GeoJSON / TopoJSON (< few thousand features)** | `await Cesium.GeoJsonDataSource.load(url, options)` | `geojson-and-topojson`, `geojson-simplestyle` |
| **Large static GeoJSON / high performance** | `GeoJsonPrimitive` (`>= 1.142`) | `3d-tiles-3d-native-vector` |
| **Large dynamic/animated points, lines, polygons** | `BufferPointCollection` / `BufferPolylineCollection` / `BufferPolygonCollection` (`>= 1.140`) | `3d-tiles-3d-native-vector` |
| **Mapbox Vector Tiles (MVT)** | `await Cesium.MVTDataProvider.fromUrl(url, options)` (`>= 1.142`) | `vector-3d-tiles`, `3d-tiles-property-lod-river` |

## 2. GeoJSON Loading & Custom Styling (`geojson-and-topojson`)

```js
const dataSource = await Cesium.GeoJsonDataSource.load("/data/states.topojson", {
  stroke: Cesium.Color.HOTPINK,
  fill: Cesium.Color.PINK.withAlpha(0.5),
  strokeWidth: 3,
  clampToGround: true,
});
viewer.dataSources.add(dataSource);

// Post-process entities (e.g., extrude by property)
for (const entity of dataSource.entities.values) {
  if (entity.polygon) {
    entity.polygon.outline = false;
    entity.polygon.extrudedHeight = entity.properties.Population.getValue() / 50.0;
  }
}
```

## 3. Vector 3D Tiles Styling (`3d-tiles-3d-native-vector`)

```js
const tilesetVector = await Cesium.Cesium3DTileset.fromIonAssetId(5135764);
viewer.scene.primitives.add(tilesetVector);

tilesetVector.style = new Cesium.Cesium3DTileStyle({
  color: "color('cyan')",
  lineWidth: 3,
});
```

## 4. Other Useful Geometry & Label Scenarios (`gallery/<id>`)
- **Primitives & Appearances (low-level batching)**: `geometry-and-appearances` (`GeometryInstance` + `Primitive` + `PerInstanceColorAppearance`)
- **Distance-based visibility**: `distance-display-conditions` (`new Cesium.DistanceDisplayCondition(near, far)`)
- **Map pins**: `map-pins` (`new Cesium.PinBuilder().fromColor(...)`)
- **Polylines on 3D Tiles**: `polylines-on-3d-tiles`
- **Drawing on terrain**: `drawing-on-terrain`
- **KML / GPX**: `kml`, `gpx` (`KmlDataSource.load`, `GpxDataSource.load`)
